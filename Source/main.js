const url = require('url');
const ip = require('quick-local-ip');
const http = require('http');
const fs = require('fs');
const YouTube = require('youtube-node');
const opener = require('opener');
const WebSocket = require('ws');
const wss = new WebSocket.Server({port: 8080});
const sqlite3 = require('sqlite3');
var db = new sqlite3.Database('db.db');
var lang;

// get language file
fs.readFile('lang/en.json', function(err, data) {
	lang = JSON.parse(data);
});

// build the string from the template on the language file
function build(data,template) {
	if(!template) {template = lang[data.message];}
	var a = template.match(/\{.+?\}/g);
	for(k in a) {
		var v = data[a[k].substring(1,a[k].length-1)];
		if(/\$\{.+?\}/g.test(v)) {v = eval(v);}
		template = template.replace(a[k],v);
	}
	return template;
}

// Start WebSocket server
wss.on('connection', function(ws) {
  ws.on('message', function(event) {
	  wss.broadcast(event);
  });
  ws.on('error', function(err) {});
});

// Broadcast
wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
  msg = JSON.parse(data);
  console.log(build(msg));
};

// Find current IP
var curr_ip = ip.getLocalIP4();

// Start controllers server
http.createServer(function (req, res) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	var q = url.parse(req.url, true);
	switch(q.pathname) {
		case '/':
			// redirect to index if localhost or to controllers if from another device
			var main = '/login.html?ip=';
			if(req.headers.host == 'localhost') main = '/index.html?ip=';
			main += curr_ip;
			if(q.query.lang) {main += '&lang=' + q.query.lang;}
			res.writeHead(200, {'Content-Type': 'text/html'});
			res.write('<script>window.location="' + main + '";</script>');
			res.end();
			break;
		case '/search':
			// search for youtube for songs with "karaoke" on the title
			var youTube = new YouTube();
			var options = {type: 'video', videoEmbeddable: 'true', videoSyndicated: 'true'};
			if(q.query.token) {options.pageToken = q.query.token;}
			youTube.setKey('AIzaSyBWWNdb8IiG7qUCFdMF-97jmXR472gLMdQ');
			youTube.search(q.query.data, 10, options, function(error, result) {
				if (error) {
					res.writeHead(200, {'Content-Type': 'text/plain'});
					res.write(error);
				} else {
					res.writeHead(200, {'Content-Type': 'text/plain'});
					for(var i = 0; i < result.items.length; i++) {
						if(result.items[i]['id']['kind'] == 'youtube#video') {
							res.write('<div class="result" vid="');
							res.write(result.items[i]['id']['videoId']);
							res.write('"><img src="');
							res.write(result.items[i]['snippet']['thumbnails']['high']['url']);
							res.write('" /><p class="title">');
							res.write(result.items[i]['snippet']['title'].replace(/\"/g,''));
							res.write('</p></div>');
						}
					}
					res.write('<div id="loadmore" lastsearch="'+q.query.data+'" nextpage="'+result.nextPageToken+'"><img src="img/loading.gif" /></div>');
				}
				res.end();
			});
			break;
		case '/add_song':
			var song_data = JSON.parse(q.query.data);
			var query = `SELECT COUNT(*) AS num FROM songs WHERE video_id = '${song_data["video_id"]}' AND played = '0'`;
			db.get(query,function(err,row) {
				if(row.num) {
					res.writeHead(200);
					res.write('MSG_ADD_EXISTS');
					return res.end();
				} else {
					var cols = '';
					var values = '';
					var priority = '';
					for(field in song_data) {
						cols += `, ${field}`;
						values += `, '${song_data[field].replace(/\'/g,'&#39;')}'`;
					}
					cols = cols.substr(2);
					values = values.substr(2);
					var query = `INSERT INTO songs (${cols}) VALUES (${values})`;
					if(db.run(query)) {
						msg = {
							type: 'add_song',
							message: 'MSG_ADD',
							user: q.query.user,
							title: song_data.title,
							priority: ''
						};
						if(q.query.priority) {
							msg.priority = '`${lang.MSG_PRIORITY}`';
						}
						wss.broadcast(JSON.stringify(msg));
						res.writeHead(200);
					} else {
						res.writeHead(500);
					}
					return res.end();
				}
			});
			break;
		case '/next_video':
			query = "SELECT id FROM songs WHERE played = '2' ORDER BY priority DESC, add_on ASC";
			db.all(query,function(err,rows){
				if(err) {console.log(err);}
				rows.forEach(function(row) {
					var q = `UPDATE songs SET played = '1' WHERE id = '${row.id}'`;
					db.run(q);
				});
				query = "SELECT id, video_id, title FROM songs WHERE played = '0' ORDER BY priority DESC, add_on ASC LIMIT 1";
				db.get(query,function(err,row){
					if(err) {
						res.writeHead(500);
						res.write(JSON.stringify(err));
						return res.end();
					} else if(!row) {
						res.writeHead(500);
						res.write('Song queue empty.');
					} else {
						var v_data = {
							id: row.id,
							video_id: row.video_id,
							title: row.title
						}
						res.writeHead(200);
						res.write(JSON.stringify(v_data));
						var query = `UPDATE songs SET played = '2', played_on = datetime('now', 'localtime') WHERE id = '${row.id}'`;
						db.run(query);
					}
					return res.end();
				});
			});
			break;
		case '/view_playlist':
			// The queries are nested because they are made assincronously,
			// so if they are not nested the result is displayed before the queries return a result
			// Played field -> 0: in the playlist, 1: played, 2: playing
			var result = '<p class="subtitle">{TITLE_CURRENT}</p>';
			var query = "SELECT * FROM songs WHERE played = '2' ORDER BY add_on DESC LIMIT 1";
			db.all(query,function(err,rows){
				if(err) {
					console.log(query);
					console.log(err);
				}
				if(rows.length) {
					var row = rows[0];
					result += `<div class="result" vid="${row.video_id}" played="${row.played}" db_id="${row.id}">`;
					result += `<img src="${row.thumbnail}" />`;
					if(row.duration) {result += `<p class="duration">${row.duration}</p>`;}
					result += `<p class="title">${row.title}</p>`;
					result += '</div>';
				} else {
					result += '<p class="empty_message">{MSG_PLAYLIST_NOCURRENT}</p>';
				}

				var i = 1;
				result += '<p class="subtitle">{TITLE_PLAYLIST}</p>';
				var query = "SELECT * FROM songs WHERE played = '0' ORDER BY priority DESC, add_on ASC";
				db.all(query,function(err,rows){
					if(err) {
						console.log(query);
						console.log(err);
					}
					if(rows.length) {
						rows.forEach(function(row) {
							result += `<div class="result" vid="${row.video_id}" played="${row.played}" db_id="${row.id}">`;
							result += `<img src="${row.thumbnail}" />`;
							result += `<p class="duration">${i}</p>`;
							result += `<p class="title">${row.title}</p>`;
							result += '</div>';
							i++;
						});
					} else {
						result += '<p class="empty_message">{MSG_PLAYLIST_NOQUEUED}</p>';
					}

					result += '<p class="subtitle">{TITLE_HISTORY}</p>';
					var query = "SELECT * FROM songs WHERE played = '1' ORDER BY played_on DESC LIMIT 10";
					if(q.query.page > 0) {query += " OFFSET " + (q.query.page * 10);}
					db.all(query,function(err,rows){
						if(err) {
							console.log(query);
							console.log(err);
						}
						if(rows.length) {
							rows.forEach(function(row) {
								result += `<div class="result" vid="${row.video_id}" played="${row.played}" db_id="${row.id}">`;
								result += `<img src="${row.thumbnail}" />`;
								if(row.duration) {result += `<p class="duration">${row.duration}</p>`;}
								result += `<p class="title">${row.title}</p>`;
								result += '</div>';
							});
						} else {
							result += '<p class="empty_message">{MSG_PLAYLIST_NOHISTORY}</p>';
						}

						res.writeHead(200);
						res.write(result);
						res.end();
					});
				});
			});
			break;
		case '/update_duration':
			var query = `UPDATE songs SET duration='${q.query.duration}' WHERE id='${q.query.vid}'`;
			db.run(query);
			res.writeHead(200);
			res.end();
			break;
		case '/remove_song':
			var song_data = JSON.parse(q.query.data);
			var query = `UPDATE songs SET played='1' WHERE id='${song_data.db_id}'`;
			if(db.run(query)) {
				msg = {
					type: 'remove_song',
					message: 'MSG_REMOVE',
					user: song_data.user,
					title: song_data.title
				};
				wss.broadcast(JSON.stringify(msg));
				res.writeHead(200);
			} else {
				res.writeHead(500);
			}
			res.end();
			break;
		case '/get_languages':
			fs.readdir('lang', function(err, files) {
			  var result = '';
			  for(i in files) {
				file = fs.readFileSync('lang/' + files[i],{encoding: 'UTF-8'});
				var val = files[i].split('.')[0];
				var lan = JSON.parse(file)['LANGUAGE'];
				result += `<div class="form-check">
				  <input class="form-check-input" type="radio" name="lang" id="lang${i}" value="${val}">
				  <label class="form-check-label" for="lang${i}">${lan}</label>
				</div>`;
			  }
			  res.writeHead(200, {'Content-Type': 'text/html'});
			  res.write(result);
			  return res.end();
			});
			break;
		default:
			var filename = "." + q.pathname;
			fs.readFile(filename, function(err, data) {
				if (err) {
					res.writeHead(404, {'Content-Type': 'text/html'});
					return res.end("404 Not Found");
				}
				res.writeHead(200, {'Content-Type': 'text/html'});
				res.write(data);
				return res.end();
			});
			break;
	}
}).listen(80);

opener('http://localhost');

console.log("---------- Server initiated. ----------");
console.log("");
console.log("If a window didn't open automatically, please access http://localhost on your web browser.");
console.log("The address for accessing the controllers through other devices is http://%s", curr_ip);
console.log("Please make sure all the devices are connected on the same local network as this server.");
console.log("For a more detailed explanation refer to http://localhost/help");
console.log("");