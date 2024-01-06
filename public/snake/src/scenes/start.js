import k from "../kaboom";
import Game from "./game";

k.scene("Game", Game);

export default function Start() {
  const WIDTH = 850;
  const HEIGHT = 600;

  k.loadSprite("bg", "sprites/bg.png");

  k.add([sprite("bg")]);

  k.add([
    k.text("Play? Press Space-Key"),
    k.pos(WIDTH / 2, HEIGHT / 2 + 140),
    k.scale(0.75),
    k.anchor("center"),
  ]);

  // go to game with space is pressed
  k.onKeyPress("space", () => k.go("Game"));

  // buttons to start game and show control keys
  // TODO:
  let addbutton;
  addbutton = add([
    k.rect(40, 40),
    k.color(234, 23, 4),
    k.pos(WIDTH / 2, HEIGHT / 2 - 178),
    k.anchor("center"),
    k.area(),
    "button"
  ]);
  onClick("button", () => go("Game"))

}
