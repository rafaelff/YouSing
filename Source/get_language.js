// function to create cookies
function setCookie(cname, cvalue, exdays) {
	var d = new Date();
	d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
	var expires = "expires="+d.toUTCString();
	document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

// function to return the value of cookies
function getCookie(cname) {
	var name = cname + "=";
	var ca = document.cookie.split(';');
	for(var i = 0; i < ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0) == ' ') {
			c = c.substring(1);
		}
		if (c.indexOf(name) == 0) {
			return c.substring(name.length, c.length);
		}
	}
	return "";
}

// default language
var language = "en";

var url_string = window.location.href;
var url = new URL(url_string);
var lang;

// check if the language was passed on the address
// if not, check if there is a cookie with the language
if(url.searchParams.get("lang")) {
	language = url.searchParams.get("lang");
	setCookie("language", language, 365);
} else if(getCookie("language")) {
	language = getCookie("language");
}

// get language file
function get_langfile() {
	jQuery.ajax({
		url: `lang/${language}.json`,
		success: function(data) {
			lang = JSON.parse(data);
		},
		async: false
	});
}
get_langfile();

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

// update page with selected language
function update() {
	$('[text]').each(function() {
		$(this).html(lang[$(this).attr('text')]);
	});
}