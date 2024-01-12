import k from "../kaboom";
import Config from "../config/config.json";

export default class Sprites {
  constructor(fieldSize) {
    this.fieldSize = fieldSize;
    this.width = Config.width
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

  loadSpriteSnakeHead(){
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
      k.scale(1.75),
      k.pos(this.width / 2, 120),
      rotate(90),
      k.anchor("center"),
    ]);
  }

  loadSprite(name) {
    if (this.fruitArr.includes(name)) {
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

  randomFruit(fruitList) {
    return fruitList[Math.floor(Math.random() * fruitList.length)];
  }

  // add fruits to game
  showFruit() {
    var fruitPosition = k.rand(vec2(2, 2), vec2(15, 11));

    fruitPosition.x = Math.floor(fruitPosition.x);
    fruitPosition.y = Math.floor(fruitPosition.y);
    fruitPosition = fruitPosition.scale(this.fieldSize);

    if (this.fruit) {
      destroy(this.fruit);
    }

    let randFruit = this.randomFruit(this.fruitArr);
    if (randFruit == "superfruits") {
      this.loadSprite(randFruit);
      console.log("hier steht superfruit:" + randFruit);

      this.fruit = add([
        k.pos(fruitPosition.x + 0.1, fruitPosition.y + 0.1),
        k.sprite("fruitSprite"),
        k.area(),
        "superfruit",
      ]);
    } else {
      this.loadSprite(randFruit);
      console.log("normale Frucht:" + randFruit);

      this.fruit = add([
        k.pos(fruitPosition.x + 0.1, fruitPosition.y + 0.1),
        k.sprite("fruitSprite"),
        k.area(),
        "fruit",
      ]);
    }

    this.fruit.play("anim");

    // avoid that obstacles and food can have the same positions
    this.fruitPositionAllX = this.fruit.pos.x;
    this.fruitPositionAllY = this.fruit.pos.y;
  }

  showObstacles(obstacleSprite) {
    var obstaclePosition = k.rand(vec2(1, 2), vec2(15, 11));

    obstaclePosition.x = Math.floor(obstaclePosition.x);
    obstaclePosition.y = Math.floor(obstaclePosition.y);
    obstaclePosition = obstaclePosition.scale(this.fieldSize);

    let obstacle = this.obstacle;

    if (this.obstacle) {
      k.destroy(this.obstacle);
    }

    this.loadSprite(obstacleSprite);

    if (
      this.fruitPositionAllX !== obstaclePosition.x + 0.1 &&
      this.fruitPositionAllY !== obstaclePosition.y + 0.1
    ) {
      k.wait(1, function () {
        obstacle = add([
          k.pos(obstaclePosition.x + 0.1, obstaclePosition.y + 0.1),
          k.sprite("oSprite"),
          k.area(),
          "obstacle",
        ]);
        obstacle.play("anim");
      });
    } else {
      this.showObstacles(obstacleSprite);
    }
  }
}
