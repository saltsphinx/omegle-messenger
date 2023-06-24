# omegle-messenger
A tool that makes interacting with Omegle web chat easy. It allows for sending of messages through code, and processing of user and stranger's messages.

# Installation
Install omegle-messenger using npm:
```
  npm i omegle-messenger
```


## Current Features
- Piping of user and stranger messages through custom event
- Sending of messages
- Quitting the current chat

## Plans
- Allow for processing of status messages
- Options parameter that enables or disables events
- Add new events for entering and ending chats and when the user sends a message
- Allow for processing of user's message before it's sent
- Allow for adding and removing of messages on user's client

# API
## Messenger
Messenger()
- A module that that ruturns the main interface, and has several methods

init()
- Starts mutation observer for body element
- The body observer starts and stops the observer for the chatlog when the user enters or leaves a chat

stop()
- Disconnects any mutation observers that are active

send(msg)
- Sends a message to the stranger

endChat()
- Ends the current chat if one is active

msgEvent(...args)
- msgEvent is an Event object from [simply-pub-sub](https://github.com/saltsphinx/simply-pub-sub). It isn't meant to be called, but instead has methods for subscribing other functions to be called when it's triggered.
- Is triggered whenever the user.
- It has a subscribe function that accepts a name and a function.
- The event passes a message object with information about the message. 
  - elem, a reference paragraph element. Note, it's a reference to the element contains both the element with the message and the one that contains the 'You:' or 'Stranger' also.
  - class, the class of elem. Either 'youmsg' or 'strangermsg'
  - msg, reference to the message text
- It has an unsubscribe function that takes a string as a parameter, and removes the function stored under that name
- Check out simply-pub-subs repo for more information about it's API.

## Disclaimer
- This package has no testing, so apologizies if there are any bugs present.
- Read Omegle's terms of service before use of this tool