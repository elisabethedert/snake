import Layout from "../funktionalities/layout";
import Snake from "../funktionalities/snake";
import InteractionObjects from "../funktionalities/interactionObjects";
import Collision from "../funktionalities/collision";

/**
 * game scene
 */
export default function Game() {

  let layout = new Layout();
  let snake = new Snake();
  let interactionObjects = new InteractionObjects();
  let collision = new Collision();

  layout.buildPlayground();
  
  snake.respawn_all();
  snake.movement();
  
  interactionObjects.showFruit();

  collision.showScoreLabel();
  collision.collide(snake, interactionObjects);
}
