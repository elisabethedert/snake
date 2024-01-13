import k from "../kaboom";

import Sprites from "./sprites";
import Config from "../config/config.json";

export default class Collsion {
  constructor(snake, sprites) {
    this.fieldsize = Config.fieldsize;
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
      pos(this.fieldsize / 2, this.fieldsize / 2),
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
