import k from "../kaboom";

//Snake Tutorial by Ritza
export default class Snake {
  constructor(fieldSize) {
    this.fieldSize = fieldSize;
  }

  //   const directions = {
  //     UP: "up",
  //     DOWN: "down",
  //     LEFT: "left",
  //     RIGHT: "right",
  //   };

  //   let current_direction = directions.RIGHT;
  //   let run_action = false;
  //   let snake_length = 3;
  //   let snakeBody = [];

  //   k.loadSpriteAtlas("sprites/snake.png", {
  //     snakeSprite: {
  //       x: 0,
  //       y: 0,
  //       width: 882,
  //       height: 49,
  //       sliceX: 18,
  //       anims: {
  //         snakeTungAnim: { from: 0, to: 5, speed: 15 },
  //         snakeMouthOpenAnim: { from: 6, to: 11, speed: 15 },
  //         snakeHeadAnim: { from: 0, to: 0 },
  //         snakeBodyAnim: { from: 15, to: 15 },
  //         snakeTailAnim: { from: 14, to: 14 },
  //         snakeCornerRightTopAnim: { from: 17, to: 17 },
  //         snakeCornerRightBotAnim: { from: 12, to: 12 },
  //         snakeCornerLefttopAnim: { from: 13, to: 13 },
  //         snakeCornerLeftBotAnim: { from: 16, to: 16 },
  //       },
  //     },
  //   });

  //   respawn_snake() {
  //     k.destroyAll("snake");

  //     snakeBody = [];
  //     snake_length = 3;

  //     for (let i = 1; i <= snake_length; i++) {
  //       let segment = k.add([
  //         k.rect(FIELDSIZE, FIELDSIZE),
  //         // sprite("snakeSprite"),
  //         k.pos(2 * FIELDSIZE, FIELDSIZE * i),
  //         k.color(0, 220, 255),
  //         k.area(),
  //         "snake",
  //       ]);
  //       snakeBody.push(segment);
  //     }
  //     current_direction = directions.RIGHT;
  //   }

  //   respawn_all() {
  //     run_action = false;
  //     k.wait(0.75, function () {
  //       respawn_snake();
  //       run_action = true;
  //     });
  //   }

  //   respawn_all();

  //   k.onKeyPress("up", () => {
  //     if (current_direction != directions.DOWN) {
  //       current_direction = directions.UP;
  //     }
  //   });

  //   k.onKeyPress("down", () => {
  //     if (current_direction != directions.UP) {
  //       current_direction = directions.DOWN;
  //     }
  //   });

  //   k.onKeyPress("left", () => {
  //     if (current_direction != directions.RIGHT) {
  //       current_direction = directions.LEFT;
  //     }
  //   });

  //   k.onKeyPress("right", () => {
  //     if (current_direction != directions.LEFT) {
  //       current_direction = directions.RIGHT;
  //     }
  //   });

  //   let timer = 0;
  //   k.onUpdate(() => {
  //     if (!run_action) return;
  //     timer += dt();
  //     if (timer < speed) return;
  //     timer = 0;

  //     let move_x = 0;
  //     let move_y = 0;

  //     switch (current_direction) {
  //       case directions.DOWN:
  //         move_x = 0;
  //         move_y = FIELDSIZE;
  //         break;
  //       case directions.UP:
  //         move_x = 0;
  //         move_y = -1 * FIELDSIZE;
  //         break;
  //       case directions.LEFT:
  //         move_x = -1 * FIELDSIZE;
  //         move_y = 0;
  //         break;
  //       case directions.RIGHT:
  //         move_x = FIELDSIZE;
  //         move_y = 0;
  //         break;
  //     }

  //     // Get the last element (the snake head)
  //     let snake_head = snakeBody[snakeBody.length - 1];

  //     snakeBody.push(
  //       k.add([
  //         k.rect(FIELDSIZE, FIELDSIZE),
  //         k.pos(snake_head.pos.x + move_x, snake_head.pos.y + move_y),
  //         k.color(0, 0, 255),
  //         k.area(),
  //         "snake",
  //       ])
  //     );

  //     if (snakeBody.length > snake_length) {
  //       let tail = snakeBody.shift(); // Remove the last of the tail
  //       k.destroy(tail);
  //     }
  //   });

  //todo: snake collision
}
