import kaboom from "kaboom";

const WIDTH = 850;
const HEIGHT = 600;
const FIELD = 50;
let speed = 0.4;

var fruit = null;
var mole = null;
var bush = null;
var scoreLabel = null;

// initialize context
kaboom({ width: WIDTH, height: HEIGHT });

// load assets
loadSprite("snake", "sprites/bean.png");
loadSprite("bg", "sprites/bg.png");

//Game Sceme
scene("game", () => {
  add([sprite("bg")]);
  //add tilemap 30x 20 Fields inside of Bricks
  addLevel(
    [
      "=================",
      "=               =",
      "=               =",
      "=               =",
      "=               =",
      "=               =",
      "=               =",
      "=               =",
      "=               =",
      "=               =",
      "=               =",
      "=================",
    ],
    {
      // define the size of tile block
      tileWidth: FIELD,
      tileHeight: FIELD,
      // define what each symbol means, by a function returning a component list (what will be passed to add())
      tiles: {
        "=": () => [
          rect(FIELD - 2, FIELD - 2),
          pos(1, 1),
          color(156, 72, 44),
          opacity(0),
          area(),
          "brick",
        ],
      },
    }
  );

  // keep track of score
  let score = 0;

  //Snake Tutorial by Ritza
  const directions = {
    UP: "up",
    DOWN: "down",
    LEFT: "left",
    RIGHT: "right",
  };

  let current_direction = directions.RIGHT;
  let run_action = false;
  let snake_length = 3;
  let snakeBody = [];

  loadSpriteAtlas("sprites/snake.png", {
    "snakeSprite": {
      x: 0,
      y: 0,
      width: 882,
      height: 49,
      sliceX: 18,
      anims: {
        "snakeTungAnim": { from: 0, to: 5, speed: 15 },
        "snakeMouthOpenAnim": { from: 6, to: 11, speed: 15 },
        "snakeHeadAnim": { from: 0, to: 0 },
        "snakeBodyAnim": { from: 15, to: 15 },
        "snakeTailAnim": { from: 14, to: 14 },
        "snakeCornerRightTopAnim": { from: 17, to: 17},
        "snakeCornerRightBotAnim": { from: 12, to: 12},
        "snakeCornerLefttopAnim": { from: 13, to: 13},
        "snakeCornerLeftBotAnim": { from: 16, to: 16},
      },
    },
  });

  function respawn_snake() {
    destroyAll("snake");

    snakeBody = [];
    snake_length = 3;

    for (let i = 1; i <= snake_length; i++) {
      let segment = add([
        rect(FIELD, FIELD),
        // sprite("snakeSprite"),
        pos(2 * FIELD, FIELD * i),
        color(0, 220, 255),
        area(),
        "snake",
      ]);
      snakeBody.push(segment);
    }
    current_direction = directions.RIGHT;
  }

  function respawn_all() {
    run_action = false;
    wait(0.75, function () {
      respawn_snake();
      run_action = true;
    });
  }

  respawn_all();

  onKeyPress("up", () => {
    if (current_direction != directions.DOWN) {
      current_direction = directions.UP;
    }
  });

  onKeyPress("down", () => {
    if (current_direction != directions.UP) {
      current_direction = directions.DOWN;
    }
  });

  onKeyPress("left", () => {
    if (current_direction != directions.RIGHT) {
      current_direction = directions.LEFT;
    }
  });

  onKeyPress("right", () => {
    if (current_direction != directions.LEFT) {
      current_direction = directions.RIGHT;
    }
  });

  let timer = 0;
  onUpdate(() => {
    if (!run_action) return;
    timer += dt();
    if (timer < speed) return;
    timer = 0;

    let move_x = 0;
    let move_y = 0;

    switch (current_direction) {
      case directions.DOWN:
        move_x = 0;
        move_y = FIELD;
        break;
      case directions.UP:
        move_x = 0;
        move_y = -1 * FIELD;
        break;
      case directions.LEFT:
        move_x = -1 * FIELD;
        move_y = 0;
        break;
      case directions.RIGHT:
        move_x = FIELD;
        move_y = 0;
        break;
    }

    // Get the last element (the snake head)
    let snake_head = snakeBody[snakeBody.length - 1];

    snakeBody.push(
      add([
        rect(FIELD, FIELD),
        pos(snake_head.pos.x + move_x, snake_head.pos.y + move_y),
        color(0, 0, 255),
        area(),
        "snake",
      ])
    );

    if (snakeBody.length > snake_length) {
      let tail = snakeBody.shift(); // Remove the last of the tail
      destroy(tail);
    }
  });

  //todo: snake collision

  loadSpriteAtlas("sprites/strawberry.png", {
    "strawberry": {
      x: 0,
      y: 0,
      width: 294,
      height: 49,
      sliceX: 6,
      anims: {
        "strawberryAnim": { from: 0, to: 5, speed: 15 },
      },
    },
  });
  loadSpriteAtlas("sprites/apple.png", {
    "apple": {
      x: 0,
      y: 0,
      width: 294,
      height: 49,
      sliceX: 6,
      anims: {
        "appleAnim": { from: 0, to: 5, speed: 15 },
      },
    },
  });

  let fruitPositionAllX = null;
  let fruitPositionAllY = null;
  // add fruits to game
  function showFruit() {
    var fruitPosition = rand(vec2(2, 2), vec2(15, 11));
    fruitPosition.x = Math.floor(fruitPosition.x);
    fruitPosition.y = Math.floor(fruitPosition.y);
    fruitPosition = fruitPosition.scale(FIELD);
    if (fruit) {
      destroy(fruit);
    }
    fruit = add([
      pos(fruitPosition.x + 0.1, fruitPosition.y + 0.1),
      sprite("apple"),
      // rect(FIELD - 0.2, FIELD - 0.2),
      area(),
      "fruit",
    ]);
    fruit.play("appleAnim")
    console.log(fruit.pos.x);
    // avoid that obstacles and food can have the same positions
    fruitPositionAllX = fruit.pos.x;
    fruitPositionAllY = fruit.pos.y;
  }

  showFruit();

  loadSpriteAtlas("sprites/obstacles.png", {
    "obstacles": {
      x: 0,
      y: 0,
      width: 588,
      height: 49,
      sliceX: 12,
      anims: {
        "moleAnim": { from: 0, to: 5, speed: 15 },
        "bushAnim": { from: 6, to: 11, speed: 15 },
        "moleIdleAnim": { from: 5, to: 5 },
      },
    },
  });

  // const player = add([sprite("hero")]);

  // player.play("run");

  // add obstacles
  function showMole() {
    var molePosition = rand(vec2(1, 2), vec2(15, 11));
    molePosition.x = Math.floor(molePosition.x);
    molePosition.y = Math.floor(molePosition.y);
    molePosition = molePosition.scale(FIELD);
    if (mole) {
      destroy(mole);
    }
    if (
      fruitPositionAllX != molePosition.x &&
      fruitPositionAllY != molePosition.y
    ) {
      wait(1, function () {
        mole = add([
          pos(molePosition.x + 0.1, molePosition.y + 0.1),
          sprite("obstacles"),
          //rect(FIELD - 0.2, FIELD - 0.2),
          area(),
          "mole",
        ]);
        mole.play("moleAnim");
      });
    }
  }

  function showBush() {
    var bushPosition = rand(vec2(1, 2), vec2(15, 11));
    bushPosition.x = Math.floor(bushPosition.x);
    bushPosition.y = Math.floor(bushPosition.y);
    bushPosition = bushPosition.scale(FIELD);
    if (bush) {
      destroy(bush);
    }
    if (
      fruitPositionAllX != bushPosition.x &&
      fruitPositionAllY != bushPosition.y
    ) {
      wait(1, function () {
        bush = add([
          pos(bushPosition.x + 0.1, bushPosition.y + 0.1),
          sprite("obstacles"),
          //rect(FIELD - 0.2, FIELD - 0.2),
          area(),
          "bush",
        ]);
        bush.play("bushAnim");
      });
    }
  }

  function showScoreLabel() {
    if (scoreLabel) {
      destroy(scoreLabel);
    }
    scoreLabel = add([text(score), pos(FIELD / 2, FIELD / 2), "scoreLabel"]);
  }
  showScoreLabel();
  // ToDo: add new fruit after adding a new obstacle
  // ToDo: improve the three show-functions to reduce duplicate code

  // lose if snake collides with any game obj except for fruits
  onCollide("snake", "fruit", (s, f) => {
    snake_length++;
    score++;
    addCollisionObjectandSpeed();
    showFruit();
    showScoreLabel();
  });

  onCollide("snake", "brick", (s, b) => {
    go("lose", score);
  });
  onCollide("snake", "mole", (s, m) => {
    go("lose", score);
  });
  onCollide("snake", "bush", (s, b) => {
    go("lose", score);
  });

  function addCollisionObjectandSpeed() {
    // if (score % 4 === 0 && !(score % 36 === 0)) {
    //   speed = speed - 0.05;
      showMole();
    // } else if (score % 9 === 0) {
    //   speed = speed - 0.1;
      showBush();
    // }
  }
});

// EndScene with Highscore
scene("lose", (score) => {
  add([sprite("bg")]);

  add([
    rect(FIELD, FIELD),
    color(255, 20, 20),
    pos(WIDTH / 2, HEIGHT / 2 - 80),
    scale(2),
    anchor("center"),
  ]);

  // display score
  add([
    text(score),
    pos(WIDTH / 2, HEIGHT / 2 + 80),
    scale(2),
    anchor("center"),
  ]);

  add([
    text("Play again? Press Space-Key"),
    pos(WIDTH / 2, HEIGHT / 2 + 140),
    scale(0.75),
    anchor("center"),
  ]);

  // go back to game with space is pressed
  onKeyPress("space", () => go("game"));
});

go("game");
