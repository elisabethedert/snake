import k from "../kaboom";
import Game from "./game";

k.scene("Game", Game);

export default function Lose(score) {
  const WIDTH = 850;
  const HEIGHT = 600;
  const FIELD = 50;
  k.loadSprite("bg", "sprites/bg.png");

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

  k.add([sprite("bg")]);

  let addSnake;
  addSnake = add([
    k.sprite("snakeTung", { anim: "tung" }),
    k.pos(WIDTH / 2, HEIGHT / 2 - 178),
    rotate(90),
    k.anchor("center"),
  ]);

  // display score
  k.add([
    k.text(score),
    k.pos(WIDTH / 2, HEIGHT / 2),
    k.color(249, 121, 25),
    k.scale(2),
    k.anchor("center"),
  ]);

  k.add([
    k.text("Play again? Press Space-Key"),
    k.color(108, 65, 34),
    k.pos(WIDTH / 2, HEIGHT / 2 + 80),
    k.scale(0.75),
    k.anchor("center"),
  ]);

  // go back to game with space is pressed
  k.onKeyPress("space", () => k.go("Game"));
}
