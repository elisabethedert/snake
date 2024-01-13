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
    this.spriteName = "snake"

    this.speed = Config.speed;
  }

  addSpeed(faster) {
    this.speed = this.speed - faster;
  }

  snakeSprite() {
    k.loadSpriteAtlas("sprites/snake.png", {
      snakeSprite: {
        x: 0,
        y: 0,
        width: 882,
        height: 49,
        sliceX: 18,
        anims: {
          snakeTungAnim: { from: 0, to: 5, speed: 15 },
          snakeMouthOpenAnim: { from: 6, to: 11, speed: 15 },
          snakeHeadAnim: { from: 0, to: 0 },
          snakeBodyAnim: { from: 15, to: 15 },
          snakeTailAnim: { from: 14, to: 14 },
          snakeCornerRightTopAnim: { from: 17, to: 17 },
          snakeCornerRightBotAnim: { from: 12, to: 12 },
          snakeCornerLefttopAnim: { from: 13, to: 13 },
          snakeCornerLeftBotAnim: { from: 16, to: 16 },
        },
      },
    });
  }

  respawn_snake() {
    k.destroyAll(this.spriteName);

    this.snakeBody = [];
    this.snake_length = 3;

    for (let i = 1; i <= this.snake_length; i++) {
      let segment = k.add([
        k.rect(this.fieldsize, this.fieldsize),
        // sprite("snakeSprite"),
        k.pos(2 * this.fieldsize, this.fieldsize * i),
        k.color(0, 220, 255),
        k.area(),
        this.spriteName,
      ]);
      this.snakeBody.push(segment);
    }
    this.current_direction = "right";
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

      switch (this.current_direction) {
        case "down":
          move_x = 0;
          move_y = this.fieldsize;
          break;
        case "up":
          move_x = 0;
          move_y = -1 * this.fieldsize;
          break;
        case "left":
          move_x = -1 * this.fieldsize;
          move_y = 0;
          break;
        case "right":
          move_x = this.fieldsize;
          move_y = 0;
          break;
      }

      // Get the last element (the snake head)

      let snake_head = this.snakeBody[this.snakeBody.length - 1];

      this.snakeBody.push(
        k.add([
          k.rect(this.fieldsize, this.fieldsize),
          k.pos(snake_head.pos.x + move_x, snake_head.pos.y + move_y),
          k.color(0, 0, 255),
          k.area(),
          this.spriteName,
        ])
      );

      if (this.snakeBody.length > this.snake_length) {
        let tail = this.snakeBody.shift(); // Remove the last of the tail
        k.destroy(tail);
      }
    });
  }


  // Copyright (c) 2015 Rembound.com
  // not working yet:
  drawSnake(){
     // Loop over every snake segment
     for (var i=0; i<snake.segments.length; i++) {
      var segment = snake.segments[i];
      var segx = segment.x;
      var segy = segment.y;
      var tilex = segx*level.tilewidth;
      var tiley = segy*level.tileheight;

      // Sprite column and row that gets calculated
      var tx = 0;
      var ty = 0;

      if (i == 0) {
          // Head; Determine the correct image
          var nseg = snake.segments[i+1]; // Next segment
          if (segy < nseg.y) {
              // Up
              tx = 3; ty = 0;
          } else if (segx > nseg.x) {
              // Right
              tx = 4; ty = 0;
          } else if (segy > nseg.y) {
              // Down
              tx = 4; ty = 1;
          } else if (segx < nseg.x) {
              // Left
              tx = 3; ty = 1;
          }
      } else if (i == snake.segments.length-1) {
          // Tail; Determine the correct image
          var pseg = snake.segments[i-1]; // Prev segment
          if (pseg.y < segy) {
              // Up
              tx = 3; ty = 2;
          } else if (pseg.x > segx) {
              // Right
              tx = 4; ty = 2;
          } else if (pseg.y > segy) {
              // Down
              tx = 4; ty = 3;
          } else if (pseg.x < segx) {
              // Left
              tx = 3; ty = 3;
          }
      } else {
          // Body; Determine the correct image
          var pseg = snake.segments[i-1]; // Previous segment
          var nseg = snake.segments[i+1]; // Next segment
          if (pseg.x < segx && nseg.x > segx || nseg.x < segx && pseg.x > segx) {
              // Horizontal Left-Right
              tx = 1; ty = 0;
          } else if (pseg.x < segx && nseg.y > segy || nseg.x < segx && pseg.y > segy) {
              // Angle Left-Down
              tx = 2; ty = 0;
          } else if (pseg.y < segy && nseg.y > segy || nseg.y < segy && pseg.y > segy) {
              // Vertical Up-Down
              tx = 2; ty = 1;
          } else if (pseg.y < segy && nseg.x < segx || nseg.y < segy && pseg.x < segx) {
              // Angle Top-Left
              tx = 2; ty = 2;
          } else if (pseg.x > segx && nseg.y < segy || nseg.x > segx && pseg.y < segy) {
              // Angle Right-Up
              tx = 0; ty = 1;
          } else if (pseg.y > segy && nseg.x > segx || nseg.y > segy && pseg.x > segx) {
              // Angle Down-Right
              tx = 0; ty = 0;
          }
      }

      // Draw the image of the snake part
      context.drawImage(tileimage, tx*64, ty*64, 64, 64, tilex, tiley,
                        level.tilewidth, level.tileheight);
  }
  }
}
