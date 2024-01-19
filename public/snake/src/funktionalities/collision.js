import k from "../kaboom";
import Config from "../config/config.json";

/**
 * collisions that could happen in the game
 */
export default class Collsion {
  /**
   * constructor of the collision class
   */
  constructor() {
    this.fieldsize = Config.fieldsize;
    this.scoreLabel = null;
    this.score = 0;
  }

  /**
   * handels collisions between snake and collision objects
   * @param {object} snake the snake object
   * @param {object} interactionObjects the interaction object
   */
  collide(snake, interactionObjects) {
    k.loadSound("eat", "sound/eat.mp3");
    k.loadSound("powerup", "sound/powerup.mp3");
    k.loadSound("crash", "sound/crash.mp3");

    // snake - superfruit
    k.onCollide(snake.spriteName, "superfruit", (s, sf) => {
      k.play("powerup");
      snake.isSupersnake = true;
      interactionObjects.showFruit();
      this.showScoreLabel();
    });

    // snake - fruit
    k.onCollide(snake.spriteName, "fruit", (s, f) => {
      k.play("eat");
      snake.isSupersnake = false;
      this.score++;
      this.addCollisionObjectandSpeed(snake, interactionObjects);
      snake.addSegment();
      interactionObjects.showFruit();
      this.showScoreLabel();
    });

    // snake - mole / bush / brick
    this.collissionWithObstacle("brick", snake, interactionObjects);
    this.collissionWithObstacle("mole", snake, interactionObjects);
    this.collissionWithObstacle("bush", snake, interactionObjects);

    //snake - snake
    k.onUpdate(() => {
      if (snake.isSupersnake == false) {
        this.collisionSnakeWithItself(snake);
      }
    });
  }

  /**
   * handels collisions ith obstacles
   * @param {string} obstacleType type of the obstacle
   * @param {object} snake the snake object
   * @param {object} interactionObjects the interaction object
   */
  collissionWithObstacle(obstacleType, snake, interactionObjects) {
    k.onCollide(snake.spriteName, obstacleType, (s, o) => {
      if (snake.isSupersnake == false || obstacleType == "brick") {
        interactionObjects.showDust(
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
  }

  /**
   * decides which obstacle should be played and increases speed parameter
   * @param {object} snake the snake object
   * @param {object} interactionObjects the interaction object
   */
  addCollisionObjectandSpeed(snake, interactionObjects) {
    // if (this.score % 4 === 0 && !(this.score % 36 === 0)) {
    //   snake.addSpeed(0.05);
    interactionObjects.showObstacles("mole");
    // } else if (this.score % 9 === 0) {
    //   snake.addSpeed(0.075);
    //   interactionObjects.showObstacles("bush");
    // }
  }

  /**
   * handles collisions of the snake with itself
   * @param {object} snake the snake object
   */
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

  /**
   * shows score
   */
  showScoreLabel() {
    k.loadFont("lilitaone", "font/LilitaOne-Regular.ttf");
    if (this.scoreLabel) {
      k.destroy(this.scoreLabel);
    }
    this.scoreLabel = k.add([
      text(this.score, { font: "lilitaone" }),
      pos(this.fieldsize / 2, this.fieldsize / 2),
      "scoreLabel",
    ]);
  }
}
