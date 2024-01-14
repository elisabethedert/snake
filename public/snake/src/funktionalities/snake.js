import k from "../kaboom";
import Config from "../config/config.json";

//Snake Tutorial by Ritza
export default class Snake {
  constructor() {
    this.fieldsize = Config.fieldsize;

    this.current_direction = "right";
    this.run_action = false;
    this.snake_length = 3;
    this.snakeBody = [];
    this.isSupersnake = false;
    this.spriteName = "snake";

    this.speed = Config.speed;
  }

  addSpeed(faster) {
    this.speed = this.speed - faster;
  }

  // snakeSprite() {
  //   k.loadSprite(this.spriteName, "sprites/snakeSpriteBody.png", {
  //     sliceX: 7,
  //     sliceY: 1,
  //     anims: {
  //       snakeHeadTopAnim: { from: 0, to: 0 },
  //       snakeHeadRightAnim: { from: 1, to: 1 },
  //       snakeHeadBottomAnim: { from: 2, to: 2 },
  //       snakeHeadLeftAnim: { from: 3, to: 3 },
  //       snakeTailTopAnim: { from: 4, to: 4 },
  //       snakeTailRightAnim: { from: 5, to: 5 },
  //       snakeTailBottomAnim: { from: 6, to: 6 },
  //       snakeTailLeftAnim: { from: 7, to: 7 },
  //       snakeBodyVerticalAnim: { from: 8, to: 8 },
  //       snakeBodyHorizontalAnim: { from: 9, to: 9 },
  //       snakeCornerRightBotAnim: { from: 10, to: 10 },
  //       snakeCornerLefttopAnim: { from: 11, to: 11 },
  //       snakeCornerLeftBotAnim: { from: 12, to: 12 },
  //       snakeCornerRightTopAnim: { from: 13, to: 13 },
  //     },
  //   });
  // }

  respawn_snake() {
    k.loadSprite(this.spriteName, "sprites/snakeSpriteBody.png", {
      sliceX: 14,
      sliceY: 1,
      anims: {
        snakeHeadTopAnim: { from: 0, to: 0 },
        snakeHeadRightAnim: { from: 1, to: 1 },
        snakeHeadBottomAnim: { from: 2, to: 2 },
        snakeHeadLeftAnim: { from: 3, to: 3 },
        snakeTailTopAnim: { from: 4, to: 4 },
        snakeTailRightAnim: { from: 5, to: 5 },
        snakeTailBottomAnim: { from: 6, to: 6 },
        snakeTailLeftAnim: { from: 7, to: 7 },
        snakeBodyVerticalAnim: { from: 8, to: 8 },
        snakeBodyHorizontalAnim: { from: 9, to: 9 },
        snakeCornerRightBotAnim: { from: 10, to: 10 },
        snakeCornerLefttopAnim: { from: 11, to: 11 },
        snakeCornerLeftBotAnim: { from: 12, to: 12 },
        snakeCornerRightTopAnim: { from: 13, to: 13 },
      },
    });

    this.snakeBody.forEach((segment) => {
      destroy(segment);
    });
    this.snakeBody = [];
    this.snake_length = 3;

    let head = k.add([
      k.sprite(this.spriteName, { anim: "snakeHeadBottomAnim" }),
      k.pos(2 * this.fieldsize, this.fieldsize * 3),
      k.area(),
      this.spriteName,
    ]);
    this.snakeBody.push(head);

    let body = k.add([
      k.sprite(this.spriteName, { anim: "snakeBodyHorizontalAnim" }),
      k.pos(2 * this.fieldsize, this.fieldsize * 2),
      k.area(),
      this.spriteName,
    ]);
    this.snakeBody.push(body);

    let tail = k.add([
      k.sprite(this.spriteName, { anim: "snakeTailTopAnim" }),
      k.pos(2 * this.fieldsize, this.fieldsize * 1),
      k.area(),
      this.spriteName,
    ]);
    this.snakeBody.push(tail);
    this.current_direction = "down";
  }

  respawn_all() {
    this.run_action = false;
    // k.wait(0.75, function () {
    this.respawn_snake();
    this.run_action = true;
    // });
  }

  movement() {
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
        console.log(seg.pos);
        positionsX.push(seg.pos.x);
        positionsY.push(seg.pos.y);
      });

      console.log(positionsX)
      console.log(positionsY)

      // gives the direction of the snake defined by the snakes head
      switch (this.current_direction) {
        case "up":
          move_x = 0;
          move_y = -1 * this.fieldsize;
          this.snakeBody[0].frame = 0;
          this.snakeBody[0].pos.y = this.snakeBody[0].pos.y + move_y;
          break;
        case "right":
          move_x = this.fieldsize;
          move_y = 0;
          this.snakeBody[0].frame = 1;
          this.snakeBody[0].pos.x = this.snakeBody[0].pos.x + move_x;
          break;
        case "down":
          move_x = 0;
          move_y = this.fieldsize;
          this.snakeBody[0].frame = 2;
          this.snakeBody[0].pos.y = this.snakeBody[0].pos.y + move_y;
          break;
        case "left":
          move_x = -1 * this.fieldsize;
          move_y = 0;
          this.snakeBody[0].frame = 3;
          this.snakeBody[0].pos.x = this.snakeBody[0].pos.x + move_x;
          break;
      }

      for (var i = 1; i < this.snakeBody.length; i++) {
        this.snakeBody[i].pos.x = positionsX[i - 1];
        this.snakeBody[i].pos.y = positionsY[i - 1];
        
      }
      

      // this.snakeBody.forEach((seg, idx) => {
      //   if (idx > 0) {
      //     seg.pos.x = positions[idx - 1].x; // new position to every segment
      //     seg.pos.y = positions[idx - 1].y; // new position to every segment
      //     return seg;
      //   }
      // });

      //add spritesheets to snake
      // let animName;
      // let oldHeadNewBody = this.snakeBody[this.snakeBody.length - 1]; // Get the last element (the snake head)
      // let tail = this.snakeBody[1];

      // for (var i = 0; i < this.snakeBody.length; i++) {
      //   console.log(i);
      //   var segment = this.snakeBody[i];
      //   var segPosX = segment.pos.x;
      //   var segPosY = segment.pos.y;
      //   console.log(segment.pos.x);

      //   let nseg = this.snakeBody[i + 1]; // Next segment
      //   let pseg = this.snakeBody[i - 1]; // Prev segment
      // }
      //HEAD:
      //move right
      //   if (move_x == this.fieldsize && move_y == 0) {
      //     animName = "snakeHeadRightAnim";
      //     oldHeadNewBody.frame = 8; //snakeBodyVerticalAnim
      //     tail.frame = 7; // snakeTailLeftAnim
      //     //move down
      //   } else if (move_x == 0 && move_y == this.fieldsize) {
      //     animName = "snakeHeadBottomAnim";
      //     oldHeadNewBody.frame = 9; // snakeBodyHorizontalAnim
      //     tail.frame = 4; // snakeTailTopAnim
      //     //move left
      //   } else if (move_x == -1 * this.fieldsize && move_y == 0) {
      //     animName = "snakeHeadLeftAnim";
      //     oldHeadNewBody.frame = 8; //snakeBodyVerticalAnim
      //     tail.frame = 5; // snakeTailRightAnim
      //     //move up
      //   } else if (move_x == 0 && move_y == -1 * this.fieldsize) {
      //     animName = "snakeHeadTopAnim";
      //     oldHeadNewBody.frame = 9; //snakeBodyHorizontalAnim
      //     tail.frame = 6; // snakeTailBottomAnim
      //   }

      //   let newHead = k.add([
      //     k.sprite(this.spriteName, { anim: animName }),
      //     k.pos(oldHeadNewBody.pos.x + move_x, oldHeadNewBody.pos.y + move_y),
      //     k.area(),
      //     this.spriteName,
      //   ]);
      //   this.snakeBody.push(newHead);
      //   newHead.pos = vec2(500,200);

      //   if (this.snakeBody.length > this.snake_length) {
      //     let removeTail = this.snakeBody.shift(); // Remove the last of the tail
      //     k.destroy(removeTail);
      //   }
    });
  }

  // Copyright (c) 2015 Rembound.com
  // not working yet:
  drawSnakeSprite() {
    // Loop over every snake segment
    for (var i = 0; i < this.snakeBody.length; i++) {
      var segment = this.snakeBody[i];
      var segx = segment.x;
      var segy = segment.y;
      // var tilex = segx*Config.fieldsize;
      // var tiley = segy*Config.fieldsize;

      // Sprite column and row that gets calculated
      // var tx = 0;
      // var ty = 0;

      if (i == 0) {
        // Head; Determine the correct image
        let nseg = this.snakeBody[i + 1]; // Next segment
        if (segy < nseg.y) {
          // Up
          segment.play("snakeHeadTopAnim");
          // tx = 3; ty = 0;
        } else if (segx > nseg.x) {
          // Right
          segment.play("snakeHeadRightAnim");
          // tx = 4; ty = 0;
        } else if (segy > nseg.y) {
          // Down
          segment.play("snakeHeadBottomAnim");
          // tx = 4; ty = 1;
        } else if (segx < nseg.x) {
          // Left
          segment.play("snakeHeadLeftAnim");
          // tx = 3; ty = 1;
        }
      } else if (i == this.snakeBody.length - 1) {
        // Tail; Determine the correct image
        let pseg = this.snakeBody[i - 1]; // Prev segment
        if (pseg.y < segy) {
          // Up
          segment.play("snakeTailBottomAnim");
          // tx = 3; ty = 2;
        } else if (pseg.x > segx) {
          // Right
          segment.play("snakeTailRightAnim");
          // tx = 4; ty = 2;
        } else if (pseg.y > segy) {
          // Down
          segment.play("snakeTailTopAnim");
          // tx = 4; ty = 3;
        } else if (pseg.x < segx) {
          // Left
          segment.play("snakeTailLeftAnim");
          // tx = 3; ty = 3;
        }
      } else {
        // Body; Determine the correct image
        let pseg = this.snakeBody[i - 1]; // Previous segment
        let nseg = this.snakeBody[i + 1]; // Next segment
        if (
          (pseg.x < segx && nseg.x > segx) ||
          (nseg.x < segx && pseg.x > segx)
        ) {
          // Horizontal Left-Right
          segment.play("snakeTailLeftAnim");
          // tx = 1; ty = 0;
        } else if (
          (pseg.x < segx && nseg.y > segy) ||
          (nseg.x < segx && pseg.y > segy)
        ) {
          // Angle Left-Down
          segment.play("snakeCornerRightTopAnim");
          // tx = 2; ty = 0;
        } else if (
          (pseg.y < segy && nseg.y > segy) ||
          (nseg.y < segy && pseg.y > segy)
        ) {
          // Vertical Up-Down
          segment.play("snakeBodyVerticalAnim");
          // tx = 2; ty = 1;
        } else if (
          (pseg.y < segy && nseg.x < segx) ||
          (nseg.y < segy && pseg.x < segx)
        ) {
          // Angle Top-Left
          segment.play("snakeCornerRightBotAnim");
          // tx = 2; ty = 2;
        } else if (
          (pseg.x > segx && nseg.y < segy) ||
          (nseg.x > segx && pseg.y < segy)
        ) {
          // Angle Right-Up
          segment.play("snakeCornerLefttopAnim");
          // tx = 0; ty = 1;
        } else if (
          (pseg.y > segy && nseg.x > segx) ||
          (nseg.y > segy && pseg.x > segx)
        ) {
          // Angle Down-Right
          segment.play("snakeCornerLeftBotAnim");
          // tx = 0; ty = 0;
        }
      }
    }
  }
}
