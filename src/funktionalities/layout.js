import k from "../kaboom";
import Config from "../config/config.json";

export default class Layout {
  /**
   * constructor of the layoutF class
   */
  constructor() {}

  /**
   * snakes head on start-scenes
   */
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

    let snakeTung = k.add([
      k.sprite("snakeTung"),
      k.pos(Config.width / 2, 70),
      rotate(90),
      k.anchor("center"),
    ]);

    snakeTung.play("tung");
  }

  /**
   * adds button to scenes
   * @param {number} rectX button width
   * @param {number} rectY button height
   * @param {string} txt button text
   * @param {number} posX button position x
   * @param {number} posY button position y
   * @param {string} scene the scene to be changed
   */
  addButton(rectX, rectY, txt, posX, posY, scene) {
    k.loadSound("buttonclick", "sound/button.mp3");
    k.loadFont("lilitaone", "font/LilitaOne-Regular.ttf");

    let text = add([
      k.rect(rectX, rectY),
      k.pos(posX, posY),
      k.anchor("center"),
      k.area({ cursor: "pointer" }),
      "button",
    ]);

    let button = add([
      k.text(txt, { font: "lilitaone" }),
      k.pos(posX, posY),
      k.anchor("center"),
      k.area({ cursor: "pointer" }),
      "button",
    ]);

    button.onClick(() => {
      k.play("buttonclick");
      k.go(scene);
    });

    button.onUpdate(() => {
      if (button.isHovering() || text.isHovering()) {
        button.scale = vec2(1.05);
        button.color = rgb(255, 255, 255);
        text.scale = vec2(1.05);
        text.color = rgb(0, 53, 0);
      } else {
        button.scale = vec2(1);
        button.color = rgb(255, 255, 255);
        text.scale = vec2(1);
        text.color = rgb(0, 53, 0);
      }
    });
  }

  /**
   * adds a headline
   * @param {string} txt headline text
   * @param {number} posY text position y
   */
  addHeadline(txt, posY) {
    k.loadFont("lilitaone", "font/LilitaOne-Regular.ttf");
    k.add([
      k.text(txt, { font: "lilitaone" }),
      k.pos(Config.width / 2, posY / 2),
      k.color(249, 121, 25),
      k.scale(1.5),
      k.anchor("center"),
    ]);
  }

  /**
   *
   * @param {string} txt description text
   * @param {number} posY text position y
   */
  addDescription(txt, posY) {
    k.loadFont("lilitaone", "font/LilitaOne-Regular.ttf");
    k.add([
      k.text(txt, { font: "lilitaone" }),
      k.pos(Config.width / 2, posY / 2),
      k.color(168, 100, 2),
      k.scale(0.6),
      k.anchor("center"),
    ]);
  }

  /**
   * shows welcome and game description
   */
  addStartSceneText() {
    this.addHeadline("Willkommen zu Snake", 380);
    this.addDescription(
      "Versuche so viele Früchte wie möglich zu fressen",
      520
    );
    this.addDescription("aber pass vor den Hindernissen auf,", 580);
    this.addDescription(
      "sobald du mit ihnen kollidierst ist das Spiel vorbei.",
      640
    );
    this.addDescription(
      "Du verlierst Punkte, wenn du die Snake über sich selbst leitest.",
      700
    );
    this.addDescription(
      "Frisst du die Superfrucht, bist du vor Hindernissen und Punkverlust geschützt.",
      760
    );
  }

  /**
   * shows score and game comment
   * @param {number} score number of eaten fruits
   */
  addEndSceneText(score) {
    let text;
    if (score == 0 || score > 1) {
      if (score == 0) {
        text = "Denk dran Früchte zu fressen, um Punkte zu erhalten";
      } else if (score != 1 && score <= 5) {
        text = "Schon ganz okay!";
      } else if (score <= 10) {
        text = "Super Punktzahl!";
      } else if (score >= 11) {
        text = "Wahnsinn, sehr gut gespielt!";
      }
      this.addHeadline("Du hast " + score + " Früchte gefressen", 380);
      this.addDescription(text, 660);
    } else if (score == 1) {
      text = "Nächstes mal wird sicher besser!";
      this.addHeadline("Du hast " + score + " Frucht gefressen", 380);
      this.addDescription(text, 660);
    }
  }

  /**
   * loads and adds an image
   * @param {string} image file name
   */
  addImage(image) {
    k.loadSprite(image, "sprites/" + image + ".png");
    k.add([sprite(image)]);
  }

  /**
   * builds the playground of the game
   */
  buildPlayground() {
    this.addImage("bg");

    // add tilemap 15 x 10 fields inside of fricks
    k.addLevel(
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
        // define the size of tile block and the meaning of the tiles
        tileWidth: Config.fieldsize,
        tileHeight: Config.fieldsize,
        tiles: {
          "=": () => [
            k.rect(Config.fieldsize - 2, Config.fieldsize - 2),
            k.pos(1, 1),
            k.color(156, 72, 44),
            k.opacity(0),
            k.area(),
            "brick",
          ],
        },
      }
    );
  }
}
