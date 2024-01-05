import k from "../kaboom";
import Game from "./game"

k.scene("Game", Game)

export default function Lose(score) {
  const WIDTH = 850;
  const HEIGHT = 600;
  const FIELD = 50;
  k.loadSprite("bg", "sprites/bg.png");

  k.add([sprite("bg")]);

  k.add([
    k.rect(FIELD, FIELD),
    k.color(255, 20, 20),
    k.pos(WIDTH / 2, HEIGHT / 2 - 80),
    k.scale(2),
    k.anchor("center"),
  ]);

  // display score
  k.add([
    k.text(score),
    k.pos(WIDTH / 2, HEIGHT / 2 + 80),
    k.scale(2),
    k.anchor("center"),
  ]);

  k.add([
    k.text("Play again? Press Space-Key"),
    k.pos(WIDTH / 2, HEIGHT / 2 + 140),
    k.scale(0.75),
    k.anchor("center"),
  ]);

  // go back to game with space is pressed
  k.onKeyPress("space", () => k.go("Game"));
}
