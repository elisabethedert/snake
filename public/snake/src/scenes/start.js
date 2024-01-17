import k from "../kaboom";
import Game from "./game";
import Navigation from "./navigation";
import Sprites from "../funktionalities/sprites";
import Layout from "../funktionalities/layout";
import Config from "../config/config.json";

k.scene("Game", Game);
k.scene("Navigation", Navigation);

// start scene, from where the game can be started
export default function Start(score) {
  let layout = new Layout();
  let sprites = new Sprites(Config.fieldsize);

  layout.addImage("bg-start");
  sprites.loadSpriteSnakeHead();

  if (score == null) {
    // show start scene with welcome-text
    layout.addText("Willkommen zu Snake", Config.width, 480);
    layout.addButton(220, 70, "Spielen", 245, 400, "Game");
    layout.addButton(220, 70, "Steuerung", 605, 400, "Navigation");
    
  } else {
    // show start scene with score
    if (score == 1) {
      layout.addText(
        "Du hast " + score + " Frucht gefressen",
        Config.width,
        480
      );
    } else {
      layout.addText(
        "Du hast " + score + " Früchte gefressen",
        Config.width,
        480
      );
    }
    layout.addButton(220, 70, "Nochmal?", 245, 400,"Game");
    layout.addButton(220, 70, "Steuerung", 605, 400, "Navigation");
  }
}
