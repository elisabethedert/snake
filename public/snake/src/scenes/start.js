import k from "../kaboom";
import Game from "./game";
import Navigation from "./navigation";
import Layout from "../funktionalities/layout";
import Config from "../config/config.json";

k.scene("Game", Game);
k.scene("Navigation", Navigation);

// start scene, from where the game can be started
export default function Start(score) {
  let layout = new Layout();

  layout.addImage("bg-start");
  layout.loadSpriteSnakeHead();

  if (score == null) {
    // show start scene with welcome-text and game-description
    layout.addGameDescription()
    layout.addButton(220, 70, "Spielen", 245, 480, "Game");
    layout.addButton(220, 70, "Steuerung", 605, 480, "Navigation");
  } else {
    // show start scene with score
    layout.addEndText(score)
    layout.addButton(220, 70, "Nochmal?", 245, 480, "Game");
    layout.addButton(220, 70, "Steuerung", 605, 480, "Navigation");
  }
}
