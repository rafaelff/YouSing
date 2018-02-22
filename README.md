# YouSing

## About
YouSing is a karaoke program for parties built on node. It searches YouTube for karaoke version of songs and plays it on the server's screen. Multiple users can connect to it with their phones without need to install anything on the mobile device. The songs added are put in a list and played in order.

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
- Start the server on a computer (a Raspberry Pi with Raspbian is suggested for portability)
- Connect the computer in a big screen `optional`
- Make sure the computer is connected to the internet
- Set up an amplifier with a couple of microphones `optional`
- Connect the sound from the computer on the amplifier also `optional`
- Connect the singers mobile phone's to the same local network as the server **
- Access on the mobile's browser the IP address provided on the screen of the server **
- Search for songs, add them to the playlist and enjoy singing together with your friends!

** the program works without client controllers, but it's recommended for a better experience

## To-do list
- [ ] Find a way to avoid showing unavailable videos on the search results
- [ ] Pack the application for easy to install
