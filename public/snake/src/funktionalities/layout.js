import k from "../kaboom";

export default class Layout {
  constructor() {}

  addBackground() {
    k.loadSprite("bg", "sprites/bg.png");
    k.add([k.sprite("bg")]);
  }

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

  addText(txt, width, height) {
    // k.loadFont("lilitaone", "./assets/fonts/LilitaOne-Regular.ttf");

    k.add([
      k.text(
        txt
        //  { font: "lilitaone" }
      ),
      k.pos(width / 2, height / 2),
      k.color(249, 121, 25),
      k.scale(1.5),
      k.anchor("center"),
    ]);
  }
}
