![YouSing](https://raw.githubusercontent.com/rafaelff/YouSing/master/Source/img/ys_logo.png)

## About
YouSing is a karaoke program for parties built on `Node.js`. It searches YouTube for karaoke version of songs and plays it on the server's screen. Multiple users can connect to it with their phones without need to install anything on the mobile device. The songs added are put in a list and played in order.

## Features
- Huge and constantly growing catalog of songs: Plays any song available as a karaoke version on YouTube
- Control the songs flow with your mobile device
  - Search and add songs to the queue
  - Play/pause execution
  - Skip to the next song in line
  - View what's next for playing and what have been played before
- Multiple simultaneous users
- No need to install anything on client devices: Just access the server with your mobile browser
- Localization: support for multiple languages

## How to use
#### Installation
##### Windows 64 bits
If you're running Windows 64bits, then all you need to do is download [this installer](https://github.com/rafaelff/YouSing/raw/master/YouSing-x64.exe) and run it!
Unfortunatelly, no installer is provided yet for 32bits version of Windows due to some issues with the packager. If that's your case, please read the next session on how to run it by source.
##### Running from source
- Install Node.js if you don't have it yet
- Extract the files
- Run by command line `npm install` on the folder where the files were extracted 
#### Preparation
- Start the server on a computer (a Raspberry Pi with Raspbian is suggested for portability)
- Connect the computer in a big screen `optional`
- Make sure the computer is connected to the internet
- Set up an amplifier with a couple of microphones `optional`
- Connect the sound from the computer on the amplifier also `optional`
- Connect the singers mobile phone's to the same local network as the server **
- Access on the mobile's browser the IP address provided on the screen of the server **
- Search for songs, add them to the playlist and enjoy singing together with your friends!

** the program works without client controllers, but it's recommended for a better experience

## Dependencies
- Node.js
  - opener
  - quick-local-ip
  - sqlite3
  - ws
  - youtube-node

## To-do list
- [ ] Make an English help file and make the link point to the correct language file depending on the host settings
- [ ] Find a way to avoid showing unavailable videos on the search results
- [ ] Pack the application for easy to install
- [ ] Improve the quality of the icon
- [ ] Add a "personal list" feature, where the users can rate the song they just sang and later check the "better" songs for them to sing
- [x] Add a "loading" when sending files to the list to avoid multiple sendings when the server takes long to reply
