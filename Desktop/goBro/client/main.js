import { Playfield } from "./Playfield.js";
import { Player } from "./Player.js";
import { Visual } from "./ui/ui.js";

export const gameID = [];
export var currentID;
export const socket = io();
export { myPlayer };

const vCtrl = new Visual();
const canvas = document.getElementById("myCanvas");
const context = canvas.getContext("2d");
var myPlayfield = new Playfield(canvas, context, 20);
var myPlayer;


vCtrl.initBtns.join.addEventListener("click", function () {
  vCtrl.show("join");

  vCtrl.joinConfirm.onclick = function () {
    let id2check= vCtrl.idInput.value;

    if (id2check < 101 && id2check > 0) { 
      socket.emit("sendGameID", id2check);   
  }
  else{
    console.log('oo')
    throw new Error("your ID is out of range");
  }
    vCtrl.hide("join");
  };
});
vCtrl.initBtns.new.addEventListener("click", () => {
  socket.on("theGameID", (data) => {
    gameID.push(parseInt(data));
    document.getElementById("id2share").innerHTML =
      "you are the host of Game: " + gameID + " share it with your bro!!";
  });
  socket.emit("createID", "weNeedAnID");
});
myPlayfield.drawAll();

socket.on("gotaHealthbar", (data) => {
  myPlayfield.players.forEach((player) => {
    if (data.playerId == player.socketId) {
      player.healthbar = data.healthbar.toString()
    }
  });
});

socket.on("rightID", (data) => {
  gameID.push(parseInt(data));
});
socket.on("falseID", () => {
  alert('this id does not exist')
});


//players basic info
socket.on("currentPlayers", (players) => {
   Object.keys(players).forEach((id) => {
    if (players[id].playerId === socket.id && players[id].roomID == gameID) {
      console.log(`Matched Player: ${socket.id}`);
      myPlayer = playerFactory(players[socket.id],1)
      console.log(myPlayer);
      myPlayfield.players.push(myPlayer);
      console.log(myPlayfield.players);
    } else if (
      players[id].playerId !== socket.id &&
      players[id].roomID == gameID
    ) {
      myPlayfield.drawTimer();
      console.log(
        `Another Player already in the Game: ${players[id].playerId}`
      );

      let exPlayer = playerFactory(players[id],2)
      console.log(exPlayer);
      myPlayfield.players.pop();
      myPlayfield.players.push(exPlayer);
      console.log(myPlayfield.players);
    }
  });
});
socket.on("newPlayer", (p2) => {
  if (p2.playerId !== socket.id && gameID.includes(parseInt(p2.roomID))) {
    console.log(`Find a new Player ${p2.playerId}`);
    myPlayfield.players.push(playerFactory(p2,2));
    myPlayfield.drawTimer();
    console.log(myPlayfield.players);
  }
});
//players updates
socket.on("playerUpdate", (msg) => {
  myPlayfield.players.forEach((player) => {
    if (player.socketId === msg.id) {
      player.x = msg.x;
      player.y = msg.y;
      player.pressedKey = msg.key;
    
    }
  });
});

socket.on("healthReduction", (hurted) => {
  let index=0;
  if (hurted !== myPlayfield.players[0].socketId) {
      index = 1;
  } 
  document.getElementById(myPlayfield.players[index].healthbar).value -= 2;
});


socket.on("noHP", (died) => {
  if (died == socket.id) {
    vCtrl.show("Lose");
  } else {
    vCtrl.show("Win");
  }
});

socket.on("remove", (out) => {
  myPlayfield.players = myPlayfield.players.filter((e) => e.socketId !== out);
  vCtrl.show("Left");
});


function playerFactory(p,hbIndex){
  let index="health2"
  if(hbIndex ===1){
    index="health1"
  }
  let newPlayer = new Player(
    p.x,
    p.y,
    100,
    p.playerId,
    p.roomID,
    (p.healthbar = index)
  );
  return newPlayer;
}



