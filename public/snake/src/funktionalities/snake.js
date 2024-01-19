import k from "../kaboom";
import Config from "../config/config.json";

/**
 * snake (playable character)
 * snake-functions are inspired by "Copyright (c) 2015 Rembound.com" and "Replid Snake Tutorial by Ritza"
 */
export default class Snake {
  /**
   * constructor of the snake class
   */
  constructor() {
    this.fieldsize = Config.fieldsize;
    this.currentDirection = "right";
    this.runAction = false;
    this.snakeBody = [];
    this.isSupersnake = false;
    this.spriteName = "snake";
    this.speed = Config.speed;
  }

  /**
   * loads the snake sprite
   */
  snakeSprite() {
    k.loadSprite(this.spriteName, "sprites/snakeSpriteBody.png", {
      sliceX: 14,
      sliceY: 1,
      anims: {
        headGoDown: { from: 0, to: 0 },
        headGoLeft: { from: 1, to: 1 },
        headGoTop: { from: 2, to: 2 },
        headGoRight: { from: 3, to: 3 },

        tailGoDown: { from: 4, to: 4 },
        tailGoLeft: { from: 5, to: 5 },
        tailGoTop: { from: 6, to: 6 },
        tailGoRight: { from: 7, to: 7 },

        bodyGoVertical: { from: 8, to: 8 },
        bodyGoHorizontal: { from: 9, to: 9 },

        bodyCornerTopRight: { from: 10, to: 10 },
        bodyCornerBottomRight: { from: 11, to: 11 },
        bodyCornerBottomLeft: { from: 12, to: 12 },
        bodyCornerTopLeft: { from: 13, to: 13 },
      },
    });
  }

  /**
   * creates a startsnake from 1 head and 1 tail element
   */
  respawnSnake() {
    this.snakeSprite();

    this.snakeBody.forEach((segment) => {
      destroy(segment);
    });
    this.snakeBody = [];

    let head = k.add([
      k.sprite(this.spriteName, { anim: "headGoDown" }),
      k.pos(2 * this.fieldsize, this.fieldsize * 3),
      k.area(),
      this.spriteName,
    ]);
    this.snakeBody.push(head);

    let tail = k.add([
      k.sprite(this.spriteName, { anim: "tailGoDown" }),
      k.pos(2 * this.fieldsize, this.fieldsize * 2),
      k.area(),
      this.spriteName,
    ]);
    this.snakeBody.push(tail);
    this.currentDirection = "down";
  }

  /**
   * respawns the snake
   */
  respawnAll() {
    this.runAction = false;
    this.respawnSnake();
    this.runAction = true;
  }

  /**
   * adds a segment when a fruit was eaten
   * the old tail segment becomes the body segment and a new tail segment is added
   */
  addSegment() {
    let currentFrame = this.snakeBody[this.snakeBody.length - 1].frame; // last element in array
    let tailSprite = "";
    if (currentFrame == 4) {
      currentFrame = 8; // bodyGoVertical
      tailSprite = "tailGoDown";
    } else if (currentFrame == 6) {
      currentFrame = 8; // bodyGoVertical
      tailSprite = "tailGoTop";
    } else if (currentFrame == 5) {
      currentFrame = 9; // bodyGoHorizontal
      tailSprite = "tailGoLeft";
    } else if (currentFrame == 7) {
      currentFrame = 9; // bodyGoHorizontal
      tailSprite = "tailGoRight";
    }

    let tail = k.add([
      k.sprite(this.spriteName, { anim: tailSprite }),
      k.pos(
        this.snakeBody[this.snakeBody.length - 1].pos.x,
        this.snakeBody[this.snakeBody.length - 1].pos.y
      ),
      k.area(),
      this.spriteName,
    ]);
    this.snakeBody.push(tail);
  }

  /**
   * the movement of the snake and the sprite placement
   */
  movement() {
    // move directions
    k.onKeyPress("up", () => {
      if (this.currentDirection != "down") {
        this.currentDirection = "up";
      }
    });

    k.onKeyPress("down", () => {
      if (this.currentDirection != "up") {
        this.currentDirection = "down";
      }
    });

    k.onKeyPress("left", () => {
      if (this.currentDirection != "right") {
        this.currentDirection = "left";
      }
    });

    k.onKeyPress("right", () => {
      if (this.currentDirection != "left") {
        this.currentDirection = "right";
      }
    });

    // updating the movement every frame
    let timer = 0;
    k.onUpdate(() => {
      if (!this.runAction) return;
      timer += dt();
      if (timer < this.speed) return;
      timer = 0;

      let move_x = 0;
      let move_y = 0;

      let positionsX = [];
      let positionsY = [];
      this.snakeBody.forEach((seg) => {
        positionsX.push(seg.pos.x);
        positionsY.push(seg.pos.y);
      });

      // gives the direction of the snake defined by the snakes head
      switch (this.currentDirection) {
        case "down":
          move_x = 0;
          move_y = this.fieldsize;
          this.snakeBody[0].frame = 0;
          this.snakeBody[0].pos.y = this.snakeBody[0].pos.y + move_y;
          break;
        case "left":
          move_x = -1 * this.fieldsize;
          move_y = 0;
          this.snakeBody[0].frame = 1;
          this.snakeBody[0].pos.x = this.snakeBody[0].pos.x + move_x;
          break;
        case "up":
          move_x = 0;
          move_y = -1 * this.fieldsize;
          this.snakeBody[0].frame = 2;
          this.snakeBody[0].pos.y = this.snakeBody[0].pos.y + move_y;
          break;
        case "right":
          move_x = this.fieldsize;
          move_y = 0;
          this.snakeBody[0].frame = 3;
          this.snakeBody[0].pos.x = this.snakeBody[0].pos.x + move_x;
          break;
      }

      // update body and tail positions and add sprites
      for (var i = 1; i < this.snakeBody.length; i++) {
        // update position
        this.snakeBody[i].pos.x = positionsX[i - 1];
        this.snakeBody[i].pos.y = positionsY[i - 1];

        // set new sprite
        let seg = this.snakeBody[i]; // segment

        let psegX = this.snakeBody[i - 1].pos.x; // Prev position X
        let nsegX = positionsX[i]; // Next position X
        let segX = this.snakeBody[i].pos.x; //current position X

        let psegY = this.snakeBody[i - 1].pos.y; // Prev position Y
        let nsegY = positionsY[i]; // Next position Y
        let segY = this.snakeBody[i].pos.y; //current position Y

        // tail sprite
        if (i == this.snakeBody.length - 1) {
          if (psegY > segY) {
            seg.frame = 4; //tailGoDown
          } else if (psegX < segX) {
            seg.frame = 5; //tailGoLeft
          } else if (psegY < segY) {
            seg.frame = 6; //tailGoTop
          } else if (psegX > segX) {
            seg.frame = 7; //tailGoRight
          }

          //body sprite
        } else {
          if (psegY == nsegY) {
            seg.frame = 9; //bodyGoHorizontal
          } else if (psegX == nsegX) {
            seg.frame = 8; //bodyGoVertical
          } else if (
            (psegX < segX && nsegY > segY) ||
            (nsegX < segX && psegY > segY)
          ) {
            seg.frame = 10; //bodyCornerTopRight
          } else if (
            (psegY < segY && nsegX < segX) ||
            (nsegY < segY && psegX < segX)
          ) {
            seg.frame = 11; //bodyCornerBottomRight
          } else if (
            (psegX > segX && nsegY < segY) ||
            (nsegX > segX && psegY < segY)
          ) {
            seg.frame = 12; //bodyCornerBottomLeft
          } else if (
            (psegY > segY && nsegX > segX) ||
            (nsegY > segY && psegX > segX)
          ) {
            seg.frame = 13; //bodyCornerTopLeft
          }
        }
      }
    });
  }
  /**
   * reduce the snake length
   * @param {number} collisionIndex where the snake needs to be shortened
   */
  reduceSnakeLength(collisionIndex) {
    this.snakeBody.forEach((segment, segIndex) => {
      if (segIndex >= collisionIndex) {
        k.destroy(segment);
      }
    });
    this.snakeBody.length = collisionIndex;
  }

  /**
   * makes the snake faster
   * @param {number} faster value by which the snake becomes faster
   */
  addSpeed(faster) {
    this.speed = this.speed - faster;
  }
}
