import k from "../kaboom";
import Config from "../config/config.json";

// contains sprite animations
export default class Sprites {
  constructor() {
    this.fieldsize = Config.fieldsize;
    this.width = Config.width;
    this.fruitArr = [
      "strawberry",
      "apple",
      "pineapple",
      "orange",
      "superfruits",
    ];
    this.fruitPositionAllX = null;
    this.fruitPositionAllY = null;
    this.fruit = null;
    this.obstacle = null;
  }

  //TODO: animation where the snake is shaking because of collision with obstacle
  //TODO: animation where the snake opens mouth to eat fruit

  loadSpriteSnakeHead() {
    k.loadSprite("snakeTung", "sprites/snakeTung.png", {
      sliceX: 14,
      sliceY: 1,
      anims: {
        tung: {
          from: 0,
          to: 13,
        },
      },
    });

    k.add([
      k.sprite("snakeTung", { anim: "tung" }),
      k.pos(this.width / 2, 70),
      rotate(90),
      k.anchor("center"),
    ]);
  }

  loadSprite(name) {
    if (this.fruitArr.includes(name)) {
      // if the spriteName name is a fruit
      k.loadSprite("fruitSprite", "sprites/" + name + ".png", {
        sliceX: 6,
        sliceY: 1,
        anims: {
          anim: {
            from: 0,
            to: 5,
          },
        },
      });
    } else {
      // if the spriteName is not a fruit
      k.loadSprite("oSprite", "sprites/" + name + ".png", {
        sliceX: 6,
        sliceY: 1,
        anims: {
          anim: {
            from: 0,
            to: 5,
          },
        },
      });
    }
  }

  // generates a random fruit of the fruitList
  randomFruit(fruitList) {
    return fruitList[Math.floor(Math.random() * fruitList.length)];
  }

  // add fruits to game
  showFruit() {
    k.loadSound("fruit", "sound/fruit.mp3")
    // if a fruit already exists, it should be destroyed to build a new fruit
    if (this.fruit) {
      destroy(this.fruit);
    }

    // generate a random fruit position
    var fruitPosition = k.rand(vec2(2, 2), vec2(15, 11));

    fruitPosition.x = Math.floor(fruitPosition.x);
    fruitPosition.y = Math.floor(fruitPosition.y);
    fruitPosition = fruitPosition.scale(this.fieldsize);

    // get a random fruit and name the object by its type (superfruit or normal fruit)
    let randFruit = this.randomFruit(this.fruitArr);
    let fruitType;

    if (randFruit == "superfruits") {
      fruitType = "superfruit";
    } else {
      fruitType = "fruit";
    }

    this.loadSprite(randFruit);
    this.fruit = add([
      k.pos(fruitPosition.x + 0.1, fruitPosition.y + 0.1),
      k.sprite("fruitSprite"),
      k.area(),
      fruitType,
    ]);

    this.fruit.play("anim");
    k.play("fruit")

    // avoid that obstacles and food can have the same positions
    this.fruitPositionAllX = this.fruit.pos.x;
    this.fruitPositionAllY = this.fruit.pos.y;
  }

  // adds obstacles to game
  showObstacles(obstacleSprite) {
    k.loadSound("bush", "sound/bush.mp3")
    k.loadSound("mole", "sound/mole.mp3")

    // if a obstacle already exists, it should be destroyed to build a new obstacle
    if (this.obstacle) {
      k.destroy(this.obstacle);
    }

    // generate a random obstace position
    var obstaclePosition = k.rand(vec2(1, 2), vec2(15, 11));
    obstaclePosition.x = Math.floor(obstaclePosition.x);
    obstaclePosition.y = Math.floor(obstaclePosition.y);
    obstaclePosition = obstaclePosition.scale(this.fieldsize);

    // avoid that obstacles and food can have the same positions
    let obstacle = this.obstacle;
    if (
      this.fruitPositionAllX !== obstaclePosition.x + 0.1 &&
      this.fruitPositionAllY !== obstaclePosition.y + 0.1
    ) {
      this.loadSprite(obstacleSprite);
      k.wait(1, function () {
        obstacle = add([
          k.pos(obstaclePosition.x + 0.1, obstaclePosition.y + 0.1),
          k.sprite("oSprite"),
          k.area(),
          "obstacle",
        ]);
        obstacle.play("anim");
        if(obstacleSprite == "bush") {
          k.play("bush")
        } else if(obstacleSprite == "mole"){
          k.play("mole")
        }
      });
    } else {
      this.showObstacles(obstacleSprite);
    }
  }
}
