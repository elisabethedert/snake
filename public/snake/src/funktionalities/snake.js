import k from "../kaboom";
import Config from "../config/config.json";
export default class Snake {
  // snake-functions are inspired by "Copyright (c) 2015 Rembound.com" and "Replid Snake Tutorial by Ritza"

  constructor() {
    this.fieldsize = Config.fieldsize;
    this.current_direction = "right";
    this.run_action = false;
    this.snake_length = 2;
    this.snakeBody = [];
    this.isSupersnake = false;
    this.spriteName = "snake";
    this.speed = Config.speed;
    this.isCollided = false;
  }

  // makes the snake faster
  addSpeed(faster) {
    this.speed = this.speed - faster;
  }

  // loads the snake sprite
  // TODO: move to sprite class for consistency
  // TODO: close gap between snake segments
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

  // creates a startsnake from 1 head, 1 body and 1 tail element
  respawn_snake() {
    this.snakeSprite();

    this.snakeBody.forEach((segment) => {
      destroy(segment);
    });
    this.snakeBody = [];
    this.snake_length = 2;
    // add startsnake-head
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
    this.current_direction = "down";
  }

  // respawns the snake
  respawn_all() {
    this.run_action = false;
    // k.wait(0.75, function () {
    this.respawn_snake();
    this.run_action = true;
    // });
  }

  // adds a segment when fruit was eaten
  addSegment() {
    let currentFrame = this.snakeBody[this.snakeBody.length - 1].frame; // last Element in array
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

  movement() {
    // move directions
    k.onKeyPress("up", () => {
      if (this.current_direction != "down") {
        this.current_direction = "up";
      }
    });

    k.onKeyPress("down", () => {
      if (this.current_direction != "up") {
        this.current_direction = "down";
      }
    });

    k.onKeyPress("left", () => {
      if (this.current_direction != "right") {
        this.current_direction = "left";
      }
    });

    k.onKeyPress("right", () => {
      if (this.current_direction != "left") {
        this.current_direction = "right";
      }
    });

    // updating the movement every frame
    let timer = 0;
    k.onUpdate(() => {
      if (!this.run_action) return;
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
      switch (this.current_direction) {
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

      // loop to add sprites to body elements and tail elements
      for (var i = 1; i < this.snakeBody.length; i++) {
        this.snakeBody[i].pos.x = positionsX[i - 1];
        this.snakeBody[i].pos.y = positionsY[i - 1];

        let pseg = this.snakeBody[i - 1]; // Prev segment
        let nseg = this.snakeBody[i + 1]; // Next segment
        let seg = this.snakeBody[i];

        // tail sprite:
        if (i == this.snakeBody.length - 1) {
          if (pseg.pos.y > seg.pos.y) {
            seg.frame = 4; //tailGoDown
          } else if (pseg.pos.x < seg.pos.x) {
            seg.frame = 5; //tailGoLeft
          } else if (pseg.pos.y < seg.pos.y) {
            seg.frame = 6; //tailGoTop
          } else if (pseg.pos.x > seg.pos.x) {
            seg.frame = 7; //tailGoRight
          }

          //body sprite
        } else if (i != this.snakeBody.length - 1 || i != 0) {
          if (
            (pseg.pos.x < seg.pos.x && nseg.pos.x > seg.pos.x) ||
            (nseg.pos.x < seg.pos.x && pseg.pos.x > seg.pos.x)
          ) {
            seg.frame = 9; //bodyGoHorizontal
          } else if (
            (pseg.pos.y < seg.pos.y && nseg.pos.y > seg.pos.y) ||
            (nseg.pos.y < seg.pos.y && pseg.pos.y > seg.pos.y)
          ) {
            seg.frame = 8; //bodyGoVertical
          } else if (
            (pseg.pos.x < seg.pos.x && nseg.pos.y > seg.pos.y) ||
            (nseg.pos.x < seg.pos.x && pseg.pos.y > seg.pos.y)
          ) {
            seg.frame = 10; //bodyCornerTopRight
          } else if (
            (pseg.pos.y < seg.pos.y && nseg.pos.x < seg.pos.x) ||
            (nseg.pos.y < seg.pos.y && pseg.pos.x < seg.pos.x)
          ) {
            seg.frame = 11; //bodyCornerBottomRight
          } else if (
            (pseg.pos.x > seg.pos.x && nseg.pos.y < seg.pos.y) ||
            (nseg.pos.x > seg.pos.x && pseg.pos.y < seg.pos.y)
          ) {
            seg.frame = 12; //bodyCornerBottomLeft
          } else if (
            (pseg.pos.y > seg.pos.y && nseg.pos.x > seg.pos.x) ||
            (nseg.pos.y > seg.pos.y && pseg.pos.x > seg.pos.x)
          ) {
            seg.frame = 13; //bodyCornerTopLeft
          }
          //TODO: avoid interruptions when the snake moves in zigzags
        }
      }
    });
  }

  reduceSnakeLength(collisionIndex) {
    this.snakeBody.forEach((segment, segIndex) => {
      if (segIndex >= collisionIndex) {
        k.destroy(segment);
      }
    });
    this.snakeBody.length = collisionIndex;
  }
}
