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
    k.onCollide("snake", "fruit", (s, f) => {
      // snake_length++;
      this.score++;
      this.addCollisionObjectandSpeed();
      this.sprites.showFruit();
      this.showScoreLabel();
    });

    k.onCollide("snake", "brick", (s, b) => {
      k.go("Lose", this.score);
    });
    k.onCollide("snake", "obstacle", (s, m) => {
      k.go("Lose", this.score);
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
