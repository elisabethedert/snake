import k from "../kaboom";

export default class Sprites {
  constructor(fieldSize) {
    this.fieldSize = fieldSize;
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

  loadSprite(name) {
    if(this.fruitArr.includes(name)) {
      k.loadSpriteAtlas("sprites/" + name + ".png", {
        fruitName: {
          x: 0,
          y: 0,
          width: 294,
          height: 49,
          sliceX: 6,
          anims: {
            anim: { from: 0, to: 5, speed: 15 },
          },
        },
      });
    } else {
      k.loadSpriteAtlas("sprites/" + name + ".png", {
        obstacleName: {
          x: 0,
          y: 0,
          width: 294,
          height: 49,
          sliceX: 6,
          anims: {
            anim: { from: 0, to: 5, speed: 15 },
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
    this.loadSprite(randFruit);

    this.fruit = add([
      k.pos(fruitPosition.x + 0.1, fruitPosition.y + 0.1),
      k.sprite("fruitName"),
      k.area(),
      "fruit",
    ]);

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

    let obst = this.obstacle;

    if (this.obstacle) {
      k.destroy(this.obstacle);
    }

    this.loadSprite(obstacleSprite);

    if (
      this.fruitPositionAllX != obstaclePosition.x &&
      this.fruitPositionAllY != obstaclePosition.y
    ) {
      k.wait(1, function () {
        obst = add([
          k.pos(obstaclePosition.x + 0.1, obstaclePosition.y + 0.1),
          k.sprite("obstacleName"),
          k.area(),
          "obstacle",
        ]);
        obst.play("anim");
      });
    }
  }
}
