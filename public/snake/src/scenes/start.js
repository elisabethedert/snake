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
  let sprites = new Sprites(Config.fieldsize);

  layout.addImage("bg-start");
  sprites.loadSpriteSnakeHead();

  if (score == null) {
    // show start scene with welcome-text
    layout.addText("Willkommen zu Snake", Config.width, 380);
    layout.addDescription(
      "Versuche so viele Früchte wie möglich zu fressen",
      Config.width,
      520
    );
    layout.addDescription(
      "aber pass vor den Hindernissen auf,",
      Config.width,
      580
    );
    layout.addDescription(
      "sobald du mit ihnen kollidierst ist das Spiel vorbei.",
      Config.width,
      640
    );
    layout.addDescription(
      "Du verlierst Punkte, wenn du die Snake über sich selbst leitest.",
      Config.width,
      700
    );
    layout.addDescription(
      "Frisst du mehrere Früchte, bist du vor Hindernissen und Punkverlust geschützt.",
      Config.width,
      760
    );
    layout.addButton(220, 70, "Spielen", 245, 480, "Game");
    layout.addButton(220, 70, "Steuerung", 605, 480, "Navigation");
  } else {
    // show start scene with score
    layout.addEndText(score)
   
    layout.addButton(220, 70, "Nochmal?", 245, 480, "Game");
    layout.addButton(220, 70, "Steuerung", 605, 480, "Navigation");
  }
}
