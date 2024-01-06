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
    this.collisionArr = [];
    this.lastElement;
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
    let collisionfunktion;
    
    // wird angelegt, damit man bei Spielstart nicht durch Wände gehen kann
    if (this.collisionArr.length == 0) {
      console.log(this.collisionArr.length);
      collisionfunktion = this.collisionWithObstacles();
    }

    k.onCollide("snake", "fruit", (s, f) => {
      // snake_length++;
      this.score++;
      this.addCollisionObjectandSpeed();
      this.sprites.showFruit();
      this.showScoreLabel();
      this.collisionArr.push("fruit");
      this.lastElement = this.collisionArr[this.collisionArr.length - 1];
      if (this.lastElement === "fruit") {
        k.wait(5, function () {
          console.log("frucht gegessen, Specialeffekt vorbei");
          // auf console log wird gewartet
          // auf Funktion wird nicht gewartet und man kann weiterhin mit brick / obstacle collidieren
          collisionfunktion;
        });
      }
    });

    k.onCollide("snake", "superfruit", (s, sf) => {
      this.sprites.showFruit();
      this.showScoreLabel();
      this.collisionArr.push("superfruit");
      this.lastElement = this.collisionArr[this.collisionArr.length - 1];
      console.log(this.lastElement);
    });
  }

  collisionWithObstacles() {
    console.log("Funktion wird aufgerufen");
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
