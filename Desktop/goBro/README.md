# goBro
real time multiplayer game

**Only supports NodeJS versions 12 or 14 and above!**

Be sure to have [NodeJS](https://nodejs.org/en/) and [NPM](https://www.npmjs.com/) installed.
`git pull` to copy of the repository and run `npm install` to install dev dependencies.
`npm start` to start a dev server on port 3000 (open [http://localhost:3000/] in your browser)

## Game overview

When the first player creates a new game, the game room will be randomly assigned an ID. Other players can join the game room with this ID.
The timer starts when the second player joins the room, represented by the sun on the canvas. The game terminates when the sun goes down. No one wins in this case. Otherwise the one who attacks their opponent's health down to zero, wins.

## Key Intro
 - Key ArrowLeft: Move left
 - Key ArrowRight: Move right
 - Key ArrowUp: Jump
 - Key S: land on the platform
 - Key D/F: Attack
