import k from "../kaboom";
import Layout from "../funktionalities/layout";
import Snake from "../funktionalities/snake";
import Sprites from "../funktionalities/sprites";
import Collision from "../funktionalities/collision";
import Config from "../config/config.json";

export default function Game() {

  let layout = new Layout();
  let snake = new Snake();
  let sprites = new Sprites();
  let collision = new Collision("snake", sprites);

  layout.buildPlayground(Config.fieldsize);
  
  sprites.showFruit();

  collision.showScoreLabel();
  collision.collide(snake);

  snake.snakeSprite();
  snake.respawn_snake();
  snake.respawn_all();
  snake.movement();
}
