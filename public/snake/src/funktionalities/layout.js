import k from "../kaboom";
import Config from "../config/config.json";

export default class Layout {
  constructor() {}

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

  addText(txt, posX, posY) {
    k.loadFont("lilitaone", "font/LilitaOne-Regular.ttf");
    k.add([
      k.text(txt, { font: "lilitaone" }),
      k.pos(posX / 2, posY / 2),
      k.color(249, 121, 25),
      k.scale(1.5),
      k.anchor("center"),
    ]);
  }

  addDescription(txt, posX, posY) {
    k.loadFont("lilitaone", "font/LilitaOne-Regular.ttf");
    k.add([
      k.text(txt, { font: "lilitaone" }),
      k.pos(posX / 2, posY / 2),
      k.color(168, 100, 2),
      k.scale(0.6),
      k.anchor("center"),
    ]);
  }

  addEndText(score) {
    let text;
    if (score == 0 || score > 1) {
      if (score == 0) {
        text = "Denk dran Früchte zu fressen um Punkte zu erhalten";
      } else if (score != 1 && score <= 5) {
        text = "Schon ganz okay!";
      } else if (score <= 10) {
        text = "Super Punktzahl!";
      } else if (score >= 11) {
        text = "Wahnsinn, sehr gut gespielt!";
      }
      this.addText(
        "Du hast " + score + " Früchte gefressen",
        Config.width,
        380
      );
      this.addDescription(text, Config.width, 660);
    } else if (score == 1) {
      text = "Nächstes mal wird sicher besser!";
      this.addText(
        "Du hast " + score + " Frucht gefressen",
        Config.width, 
        380
      );
      this.addDescription(text, Config.width, 660);
    }
  }

  addImage(image) {
    k.loadSprite(image, "sprites/" + image + ".png");
    k.add([sprite(image)]);
  }

  buildPlayground() {
    this.addImage("bg");

    // add tilemap 15 x 10 Fields inside of Bricks
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
        // define the size of tile block
        tileWidth: Config.fieldsize,
        tileHeight: Config.fieldsize,
        // define what each symbol means, by a function returning a component list (what will be passed to add())
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
