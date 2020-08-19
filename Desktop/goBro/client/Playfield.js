var images;
var image;
import { AssetLoader } from "./AssetLoader.js";
import { drawMap } from "./map.js";

const imageSun = new Image();
imageSun.src = "ui/pics/sun.jpg";

new AssetLoader()
  .loadAssets([
    { name: "imageWalk", url: "GraveRobber/GraveRobber_walk.png" },
    { name: "imageWalk2", url: "GraveRobber/GraveRobber_walk2.png" },
    { name: "imageAttack1", url: "GraveRobber/GraveRobber_attack1.png" },
    { name: "imageAttack2", url: "GraveRobber/GraveRobber_attack2.png" },
    { name: "imageW_walk", url: "GraveRobber/Woodcutter_walk.png" },
    { name: "imageW_walk2", url: "GraveRobber/Woodcutter_walk2.png" },
    { name: "imageW_attack1", url: "GraveRobber/Woodcutter_attack1.png" },
    { name: "imageW_attack2", url: "GraveRobber/Woodcutter_attack2.png" },
  ])
  .then((assets) => {
    images = assets;
  });

export class Playfield {
  constructor(canvas, context, extent) {
    this.canvas = canvas;
    this.context = context;
    this.extent = extent;
    this.cellSize = this.canvas.width / this.extent;
    //all players in game
    this.players = [];
    //animation
    this.frameCount = 0; //current frame
    this.spriteX = 0;
    this.cols = 6;
    this.spriteWidth = 48;
    this.animationSpeed = 10;
    this.frameCounter = 0; //adjust frame update speed
    this.sunX = 0;
    this.sunY = 30;
  }

  updateFrame() {
    if (this.frameCounter % this.animationSpeed === 0) {
      this.frameCount = (this.frameCount + 1) % this.cols;
      this.spriteX = this.frameCount * this.spriteWidth;
    }
    this.frameCounter += 1;
  }

  drawTimer(){
    let x = 0.1;
    this.sunX += x;
    this.sunY += 0.1 * Math.sqrt(x);
    if(this.sunX+100 > this.canvas.width){
      document.getElementById('timeout').style.display = "block"
    }
    else{
      this.context.drawImage(imageSun, 200, 100, 1200,900,this.sunX,this.sunY,200,150);
    }
    window.requestAnimationFrame(this.drawTimer.bind(this));
    
  } 

  newDrawPlayer() {
    this.updateFrame();
    this.players.forEach((player, index, array) => {
      player.movePlayer();
      player.attack();
      if (index === 0) {
        if (player.pressedKey === "ArrowRight") {
          image = images.imageWalk;
        } else if (player.pressedKey === "ArrowLeft") {
          image = images.imageWalk2;
        } else if (player.pressedKey === "KeyF") {
          image = images.imageAttack1;
        } else if (player.pressedKey === "KeyD") {
          image = images.imageAttack2;
        }
        this.context.drawImage(
          image,
          this.spriteX,
          0,
          this.spriteWidth,
          this.spriteWidth,
          player.x,
          player.y,
          this.cellSize * 2,
          this.cellSize * 2
        );
      }
      if (index === 1) {
        if (player.pressedKey === "ArrowRight") {
          image = images.imageW_walk;
        } else if (player.pressedKey === "ArrowLeft") {
          image = images.imageW_walk2;
        } else if (player.pressedKey === "KeyF") {
          image = images.imageW_attack1;
        } else if (player.pressedKey === "KeyD") {
          image = images.imageW_attack2;
        }
        this.context.drawImage(
          image,
          this.spriteX,
          0,
          this.spriteWidth,
          this.spriteWidth,
          player.x,
          player.y,
          this.cellSize * 2,
          this.cellSize * 2
        );
      }

  
    });
  }
  drawAll() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    drawMap();
    this.newDrawPlayer();
    window.requestAnimationFrame(this.drawAll.bind(this));
  }
}
