import k from "../kaboom";
import Game from "./game";
import Sprites from "../funktionalities/sprites";
import Layout from "../funktionalities/layout";
import Config from "../config/config.json";


k.scene("Game", Game);

export default function Start(score) {

  let layout = new Layout();
  let sprites = new Sprites(Config.fieldsize);
  
  layout.addBackground();
  sprites.loadSpriteSnakeHead();
  
  if(score == null) {
    layout.addButton(220, 70, "Spielen", 245, 420, () => k.go("Game"));
    layout.addButton(220, 70, "Steuerung", 605, 420, () => k.go("Game"));
  } else {
    layout.addText(score, Config.width, Config.height);
    layout.addButton(220, 70, "Nochmal?", 245, 420, () => k.go("Game"));
    layout.addButton(220, 70, "Steuerung", 605, 420, () => k.go("Game"));

  }}
