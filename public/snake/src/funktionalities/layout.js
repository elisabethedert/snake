import k from "../kaboom";
import Config from "../config/config.json";

export default class Layout {
  constructor() {}

  addButton(rectX, rectY, txt, posX, posY, scene) {
    let text = add([
      k.rect(rectX, rectY),
      k.color(0, 53, 0),
      k.pos(posX, posY),
      k.anchor("center"),
      k.area({ cursor: "pointer" }),
      "button",
    ]);

    let button = add([
      k.text(txt),
      k.color(0, 53, 0),
      k.pos(posX, posY),
      k.anchor("center"),
      k.area({ cursor: "pointer" }),
      "button",
    ]);

    button.onClick(scene);

    button.onUpdate(() => {
      if (button.isHovering() || text.isHovering()) {
        button.scale = vec2(1.05);
        text.scale = vec2(1.05);
      } else {
        button.scale = vec2(1);
        button.color = rgb();
        text.scale = vec2(1);
      }
    });
  }

  addText(txt, posX, posY) {
    // k.loadFont("lilitaone", "./assets/fonts/LilitaOne-Regular.ttf");

    k.add([
      k.text(
        txt
        //  { font: "lilitaone" }
      ),
      k.pos(posX / 2, posY / 2),
      k.color(249, 121, 25),
      k.scale(1.3),
      k.anchor("center"),
    ]);
  }

  addImage(image){
    k.loadSprite(image, "sprites/"+image+".png");
    k.add([sprite(image),      
    ]);
  }

  buildPlayground() {
    this.addImage("bg")

    //add tilemap 30x 20 Fields inside of Bricks
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
