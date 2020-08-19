# SEP project group Q

**Only supports NodeJS versions 12 or 14 and above!**

Be sure to have [NodeJS](https://nodejs.org/en/) and [NPM](https://www.npmjs.com/) installed.
`git pull` to copy of the repository and run `npm install` to install dev dependencies.
`npm start` to start a dev server on port 3000 (open [http://localhost:3000/] in your browser)

## Game overview

You can start the server on port 3000 by running npm start. Open http://localhost:3000/ in your browser to play.

When the first player creates a new game, the game room will be randomly assigned an ID. Other players can join the game room with this ID.

The timer starts when the second player joins the room. Timer is represented by the sun on the canvas. The game ends when the sun moves to the right and reaches the boundary of the canvas. No one wins in timeout case.

If a player's life value turns to zero during the game time, it will fail. The other player wins.

## Key Intro

 - Key S: Fly to the platform in the air
 - Key ArrowUp: Jump on the ground/platform
 - Key ArrowLeft: Move left
 - Key ArrowRight: Move right
 - Key D: Attack
 - Key F: Attack (These two attacks do the same damage, only the animation is different.)

