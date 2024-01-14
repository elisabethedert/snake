import k from "../kaboom";

import Sprites from "./sprites";
import Config from "../config/config.json";

export default class Collsion {
  constructor() {
    this.fieldsize = Config.fieldsize;
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

  collide(snake, sprites) {
    k.onCollide(snake.spriteName, "superfruit", (s, f) => {
      snake.isSupersnake = true;
      sprites.showFruit();
      this.showScoreLabel();
      // setTimeout(function () {
      //   this.isSupersnake = false;
      //   console.log(this.isSupersnake);
      //   console.log("snake ist wieder false");
      // }, 3000);
    });

    k.onCollide(snake.spriteName, "fruit", (s, sf) => {
      snake.isSupersnake = false;
      this.score++;
      this.addCollisionObjectandSpeed(snake, sprites);
      snake.addSegment();
      sprites.showFruit();
      this.showScoreLabel();
    });

    k.onCollide(snake.spriteName, "brick", (s, b) => {
      k.go("Start", this.score);
    });

    k.onCollide(snake.spriteName, "obstacle", (s, m) => {
      if (snake.isSupersnake == false) {
        k.go("Start", this.score);
      }
    });
  }

  addCollisionObjectandSpeed(snake, sprites) {
    if (this.score % 4 === 0 && !(this.score % 36 === 0)) {
      snake.addSpeed(0.05);
      sprites.showObstacles("mole");
    } else if (this.score % 9 === 0) {
      snake.addSpeed(0.1);
      sprites.showObstacles("bush");
    }
  }
}
