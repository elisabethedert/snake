import k from "../kaboom";
import Layout from "../funktionalities/layout";
import Snake from "../funktionalities/snake";
import Sprites from "../funktionalities/sprites";
import Collision from "../funktionalities/collision";

export default function Game() {

  let layout = new Layout();
  let snake = new Snake();
  let sprites = new Sprites();
  let collision = new Collision();

  layout.buildPlayground();
  
  sprites.showFruit();

  collision.showScoreLabel();
  collision.collide(snake, sprites);

  snake.respawn_all();
  snake.movement();
}
