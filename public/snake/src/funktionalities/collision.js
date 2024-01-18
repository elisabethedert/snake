import k from "../kaboom";
import Config from "../config/config.json";

export default class Collsion {
  constructor() {
    this.fieldsize = Config.fieldsize;
    this.scoreLabel = null;
    this.score = 0;
  }

  // shows score
  // TODO: move to layout class for consistency
  showScoreLabel() {
    k.loadFont("lilitaone", "font/LilitaOne-Regular.ttf")
    if (this.scoreLabel) {
      k.destroy(this.scoreLabel);
    }
    this.scoreLabel = k.add([
      text(this.score, {font:"lilitaone"}),
      pos(this.fieldsize / 2, this.fieldsize / 2),
      "scoreLabel",
    ]);
  }

  // handels collisions
  collide(snake, sprites) {
    k.loadSound("eat", "sound/eat.mp3");
    k.loadSound("powerup", "sound/powerup.mp3");
    k.loadSound("crash", "sound/crash.mp3");

    k.onCollide(snake.spriteName, "superfruit", (s, f) => {
      snake.isSupersnake = true;
      k.play("powerup");
      sprites.showFruit();
      this.showScoreLabel();
    });

    k.onCollide(snake.spriteName, "fruit", (s, sf) => {
      k.play("eat");
      snake.isSupersnake = false;
      this.score++;
      this.addCollisionObjectandSpeed(snake, sprites);
      snake.addSegment();
      sprites.showFruit();
      this.showScoreLabel();
    });

    k.onCollide(snake.spriteName, "brick", (s, b) => {
      sprites.showDust(
        snake.snakeBody[0].pos.x,
        snake.snakeBody[0].pos.y,
        snake.currentDirection
      );

      k.play("crash");
      snake.snakeBody.forEach((segment) => {
        k.destroy(segment);
      });

      k.wait(1, () => {
        k.go("Start", this.score);
      });
    });

    k.onCollide(snake.spriteName, "obstacle", (s, m) => {
      if (snake.isSupersnake == false) {
        sprites.showDust(
          snake.snakeBody[0].pos.x,
          snake.snakeBody[0].pos.y,
          snake.currentDirection
        );

        k.play("crash");
        snake.snakeBody.forEach((segment) => {
          k.destroy(segment);
        });

        k.wait(1, () => {
          k.go("Start", this.score);
        });
      }
    });

    k.onUpdate(() => {
      if (snake.isSupersnake == false) {
        this.collisionSnakeWithItself(snake);
      }
    });
  }

  addCollisionObjectandSpeed(snake, sprites) {
    if (this.score % 4 === 0 && !(this.score % 36 === 0)) {
      snake.addSpeed(0.05);
      sprites.showObstacles("mole");
    } else if (this.score % 9 === 0) {
      snake.addSpeed(0.075);
      sprites.showObstacles("bush");
    }
  }

  collisionSnakeWithItself(snake) {
    for (
      var collisionIndex = 1;
      collisionIndex < snake.snakeBody.length;
      collisionIndex++
    ) {
      let seg = snake.snakeBody[collisionIndex];
      if (
        snake.snakeBody[0].pos.x == seg.pos.x &&
        snake.snakeBody[0].pos.y == seg.pos.y
      ) {
        k.play("eat");
        snake.reduceSnakeLength(collisionIndex);
        this.score = snake.snakeBody.length - 2;
        if (this.score < 0) {
          this.score = 0;
        }
        this.showScoreLabel();
      }
    }
  }
}
