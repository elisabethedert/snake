import kaboom from "kaboom";

const WIDTH = 850;
const HEIGHT = 600;
const FIELD = 25;
const BRICK_HEIGHT = 2*FIELD;
var speed = 80;

// initialize context
kaboom({ width: WIDTH, height: HEIGHT });

// load assets
loadSprite("snake", "sprites/bean.png");
setBackground([0, 120, 0]);

//Game Sceme
scene("game", () => {

  //add tilemap 30x 20 Fields inside of Bricks
  addLevel(
    [
      "==================================",
      "==================================",
      "==                              ==",
      "==                              ==",
      "==                              ==",
      "==                              ==",
      "==                              ==",
      "==                              ==",
      "==                              ==",
      "==                              ==",
      "==                              ==",
      "==                              ==",
      "==                              ==",
      "==                              ==",
      "==                              ==",
      "==                              ==",
      "==                              ==",
      "==                              ==",
      "==                              ==",
      "==                              ==",
      "==                              ==",
      "==                              ==",
      "==================================",
      "==================================",
    ],
    {
      // define the size of tile block
      tileWidth: FIELD,
      tileHeight: FIELD,
      // define what each symbol means, by a function returning a component list (what will be passed to add())
      tiles: {
        "=": () => [
          rect(FIELD, FIELD),
          color(156, 72, 44),
          area(),
          "brick",
        ]
      },
    }
  );

  // keep track of score
  let score = 0;
  const scoreLabel = add([
    text(score),
    pos(BRICK_HEIGHT / 2, BRICK_HEIGHT / 2),
  ]);

  // add player object to screen
  var player = add([
    // list of components
    sprite("snake"),
    // rect(FIELD, FIELD),
    pos(WIDTH - 400, HEIGHT / 2 - 25),
    area(),
    // color(255, 20, 20),
    // move(RIGHT, speed),
    "snake",
  ]);

  function addTail() {
    //TODO
  }

  //MOVEMENT TESTS
  //   const movementR = onUpdate("snake", (player) => {
  //     player.move(speed, 0);
  // })
  //   const movementL = onUpdate("snake", (player) => {
  //     player.move(-speed, 0);
  // })
  //   const movementU = onUpdate("snake", (player) => {
  //     player.move(1, -speed);
  // })
  //   const movementD = onUpdate("snake", (player) => {
  //     player.move(0, speed);
  // })

  // moves snake by key-press
  onKeyDown("right", () => {
    player.move(speed, 0);
    // movementR();
  });
  onKeyDown("left", () => {
    player.move(-speed, 0);
    // movementL();
  });
  onKeyDown("up", () => {
    player.move(0, -speed);
    // movementU();
  });
  onKeyDown("down", () => {
    player.move(0, speed);
    // movementD();
  });

  // add fruits to game
  function showFruit() {
    add([
      rect(FIELD, FIELD),
      area(),
      // outline(4),
      pos(
        rand(BRICK_HEIGHT, WIDTH - BRICK_HEIGHT - FIELD),
        rand(BRICK_HEIGHT + FIELD, HEIGHT - BRICK_HEIGHT)
      ),

      anchor("botleft"),
      color(255, 180, 255),
      // move(LEFT, speed),
      "fruit",
    ]);
  }

  showFruit();

  // add obstacles
  function showMole() {
    add([
      rect(FIELD, FIELD),
      area(),
      pos(
        rand(BRICK_HEIGHT, WIDTH - BRICK_HEIGHT - FIELD),
        rand(BRICK_HEIGHT + FIELD, HEIGHT - BRICK_HEIGHT)
      ),
      anchor("botleft"),
      color(87, 50, 3),
      "mole",
    ]);
  }

  function showBush() {
    add([
      rect(rand(FIELD, 3 * FIELD), rand(FIELD, 3 * FIELD)),
      area(),
      pos(
        rand(BRICK_HEIGHT, WIDTH - BRICK_HEIGHT - FIELD),
        rand(BRICK_HEIGHT + FIELD, HEIGHT - BRICK_HEIGHT)
      ),
      anchor("botleft"),
      color(39, 125, 60),
      "bush",
    ]);
  }

  // lose if player collides with any game obj except for fruits
  player.onCollide("brick-l", () => {
    // go to "lose" scene and pass the score
    go("lose", score);
    // burp(); //sound
  });
  player.onCollide("brick", () => {
    go("lose", score);
  });
  player.onCollide("mole", () => {
    go("lose", score);
  });
  player.onCollide("bush", () => {
    go("lose", score);
  });

  player.onCollide("fruit", (fruit) => {
    score++;
    scoreLabel.text = score;
    destroy(fruit);
    addCollisionObjectandSpeed();
    showFruit();
  });

  function addCollisionObjectandSpeed() {
    if (score === 3 || score === 4 || score === 6) {
      speed = speed + 30;
      showMole();
    } else if (score === 4 || score === 6 || score === 10) {
      speed = speed + 40;
      showBush();
    }
  }
});

// EndScene with Highscore
scene("lose", (score) => {
  add([
    sprite("snake"),
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
