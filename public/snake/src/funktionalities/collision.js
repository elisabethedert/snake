import k from "../kaboom";

import Sprites from "./sprites";

export default class Collsion {
  constructor(fieldSize, snake, sprites, speed) {
    this.fieldSize = fieldSize;
    this.snake = snake;
    this.sprites = sprites;
    this.speed = speed;
    this.scoreLabel = null;
    this.score = 0;
    this.isSupersnake = false;
  }

  showScoreLabel() {
    if (this.scoreLabel) {
      k.destroy(this.scoreLabel);
    }
    this.scoreLabel = k.add([
      text(this.score),
      pos(this.fieldSize / 2, this.fieldSize / 2),
      "scoreLabel",
    ]);
  }

  collide() {
    k.onCollide("snake", "superfruit", (s, f) => {
      this.isSupersnake = true;
      this.sprites.showFruit();
      this.showScoreLabel();
      // setTimeout(function () {
      //   this.isSupersnake = false;
      //   console.log(this.isSupersnake);
      //   console.log("snake ist wieder false");
      // }, 3000);
    });

    k.onCollide("snake", "fruit", (s, sf) => {
      this.isSupersnake = false;
      this.score++;
      this.addCollisionObjectandSpeed();
      // snake_length++;
      this.sprites.showFruit();
      this.showScoreLabel();
    });

    k.onCollide("snake", "brick", (s, b) => {
      console.log("Collision Brick " + this.isSupersnake);
      k.go("Start", this.score);
    });

    k.onCollide("snake", "obstacle", (s, m) => {
      if (this.isSupersnake == false) {
        k.go("Start", this.score);
      }
    });
  }

  addCollisionObjectandSpeed() {
    if (this.score % 4 === 0 && !(this.score % 36 === 0)) {
      this.speed = this.speed - 0.05;
      this.sprites.showObstacles("mole");
    } else if (this.score % 9 === 0) {
      this.speed = this.speed - 0.1;
      this.sprites.showObstacles("bush");
    }
  }
}
