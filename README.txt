Notes for self.....
-----------------------------------

Client -> Src -> App.js is the main controller for what is currently live. I'm not sure how to create extra pages and have react route the URL to the correct page yet.

Currently I have built out components for each item: Nav, Content, and Footer. I've also pulled styles into each components folder as well as a couple main styles to cover the body like fonts.

The react front-end server is currently talking with the back-end server, which is holding a json list of player profiles that I manually entered on the server.js file. This will have to be changed to a real database like MongoDB. The back-end server is currently firing on port 5000, and the front-end server is firing on port 3000. These have been merged to fire simutaneously with the command:

npm run dev

This was set up in the main package.json file.

A proxy was also set up in this package.json file to direct any API calls to the port 5000 that we assigned the back-end to. Eventually this will probably have to be changed for the site to go live.

Currently the heirarchy for a live page is the Client -> public -> index.html file that houses all of your core imports for fonts and external items. This file has a placeholder in the body which client -> src -> App.js is assigned to be the placeholder. App.js is currently being filled with the components that I created: Nav, Contents, and Footer.



Things to do:
-----------------------------------

1. Figure out how to create link structure in React so I can create more pages and have them link properly to each other.

2. Figure out a database to link to the back-end so we can have a place to store data efficiently and start creating our API for the front-end to interact with.

3. Develop a login/sign up system that will allow player data to be accessed from an SWGoH api and certain data stored on our API.