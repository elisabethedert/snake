import k from "../kaboom";

import Sprites from "./sprites";

export default class Collsion {
  constructor(fieldSize, snake, sprites) {
    this.fieldSize = fieldSize;
    this.snake = snake;
    this.sprites = sprites;
    this.scoreLabel = null;
    this.score = 0;
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

  collide(snakeObject) {
    k.onCollide(this.snake, "superfruit", (s, f) => {
      snakeObject.isSupersnake = true;
      this.sprites.showFruit();
      this.showScoreLabel();
      // setTimeout(function () {
      //   this.isSupersnake = false;
      //   console.log(this.isSupersnake);
      //   console.log("snake ist wieder false");
      // }, 3000);
    });

    k.onCollide(this.snake, "fruit", (s, sf) => {
      snakeObject.isSupersnake = false;
      this.score++;
      this.addCollisionObjectandSpeed(snakeObject);
      snakeObject.snake_length++;
      this.sprites.showFruit();
      this.showScoreLabel();
    });

    k.onCollide(this.snake, "brick", (s, b) => {
      k.go("Start", this.score);
    });

    k.onCollide(this.snake, "obstacle", (s, m) => {
      if (snakeObject.isSupersnake == false) {
        k.go("Start", this.score);
      }
    });
  }

  addCollisionObjectandSpeed(snakeObject) {
    if (this.score % 4 === 0 && !(this.score % 36 === 0)) {
      snakeObject.addSpeed(0.05);
      this.sprites.showObstacles("mole");
    } else if (this.score % 9 === 0) {
      snakeObject.addSpeed(0.1);
      this.sprites.showObstacles("bush");
    }
  }
}
