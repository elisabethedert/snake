import k from "../kaboom";
import Config from "../config/config.json";

/**
 * contains sprite animations of interaction objects (non playable characters)
 */
export default class InteractionObjects {
  /**
   * constructor of the interactionObjects class
   */
  constructor() {
    this.fieldsize = Config.fieldsize;
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
  }

  /**
   * load fruit and obstacle sprites
   * @param {string} name name of file
   */
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

  /**
   * add fruits to game
   */
  showFruit() {
    k.loadSound("fruit", "sound/fruit.mp3");

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

    //load random fruit and add to game
    this.loadSprite(randFruit);
    this.fruit = add([
      k.pos(fruitPosition.x, fruitPosition.y),
      k.sprite("fruitSprite"),
      k.area(),
      fruitType,
    ]);
    this.fruit.play("anim");
    k.play("fruit");

    // avoid that obstacles and food can have the same positions
    this.fruitPositionAllX = this.fruit.pos.x;
    this.fruitPositionAllY = this.fruit.pos.y;
  }

  /**
   * generates a random fruit of the fruitList
   * @param {string[]} fruitList array with all kind of fruits
   * @returns one fruitList element
   */
  randomFruit(fruitList) {
    return fruitList[Math.floor(Math.random() * fruitList.length)];
  }

  /**
   * adds obstacles to game "mole" or "bush"
   * @param {string} obstacleSprite obstacle sprite name
   */
  showObstacles(obstacleSprite) {
    k.loadSound("bush", "sound/bush.mp3");
    k.loadSound("mole", "sound/mole.mp3");

    // never show two of the same kind of obstacle at the same time
    if (obstacleSprite == "bush") {
      k.destroyAll("bush");
    } else if (obstacleSprite == "mole") {
      k.destroyAll("mole");
    }

    // generate a random obstace position
    var obstaclePosition = k.rand(vec2(1, 2), vec2(15, 11));
    obstaclePosition.x = Math.floor(obstaclePosition.x);
    obstaclePosition.y = Math.floor(obstaclePosition.y);
    obstaclePosition = obstaclePosition.scale(this.fieldsize);

    // avoid that obstacles and food can have the same positions
    let obstacle;
    if (
      this.fruitPositionAllX != obstaclePosition.x &&
      this.fruitPositionAllY != obstaclePosition.y
    ) {
      this.loadSprite(obstacleSprite);
      // wait 1 second before add to game and play sound to give the player a chance for orientation
      k.wait(1, function () {
        obstacle = add([
          k.pos(obstaclePosition.x, obstaclePosition.y),
          k.sprite("oSprite"),
          k.area(),
          obstacleSprite,
        ]);
        obstacle.play("anim");
        if (obstacleSprite == "bush") {
          k.play("bush");
        } else if (obstacleSprite == "mole") {
          k.play("mole");
        }
      });
    } else {
      this.showObstacles(obstacleSprite);
    }
  }

  /**
   * shows dust sprite where the snake collides and the game ends
   * @param {number} snakePosX snakes x-pos
   * @param {number} snakePosY snakes y-pos
   * @param {string} direction snakes current direction
   */
  showDust(snakePosX, snakePosY, direction) {
    k.loadSprite("dust", "sprites/dust.png", {
      sliceX: 6,
      sliceY: 1,
      anims: {
        anim: {
          from: 0,
          to: 5,
        },
      },
    });

    let dustPosX;
    let dustPosY;

    // get a good sposition for the dust
    if (direction == "left") {
      dustPosX = snakePosX + 0.25 * this.fieldsize;
      dustPosY = snakePosY - 0.5 * this.fieldsize;
    } else if (direction == "right") {
      dustPosX = snakePosX - this.fieldsize;
      dustPosY = snakePosY - 0.5 * this.fieldsize;
    } else if (direction == "up") {
      dustPosX = snakePosX - 0.25 * this.fieldsize;
      dustPosY = snakePosY + 0.25 * this.fieldsize;
    } else if (direction == "down") {
      dustPosX = snakePosX - 0.25 * this.fieldsize;
      dustPosY = snakePosY - this.fieldsize;
    }

    let dust = add([
      k.pos(dustPosX, dustPosY),
      k.sprite("dust"),
      k.area(),
      "dust",
    ]);
    dust.play("anim");
  }
}
