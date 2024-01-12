import k from "../kaboom";
import Game from "./game";
import Navigation from "./navigation";
import Sprites from "../funktionalities/sprites";
import Layout from "../funktionalities/layout";
import Config from "../config/config.json";


k.scene("Game", Game);
k.scene("Navigation", Navigation);


export default function Start(score) {

  let layout = new Layout();
  let sprites = new Sprites(Config.fieldsize);
  
  layout.addImage("bg-start")
  sprites.loadSpriteSnakeHead();
  
  if(score == null) {
    layout.addText("Willkommen zu Snake", Config.width, Config.height+50);
    layout.addButton(220, 70, "Spielen", 245, 480, () => k.go("Game"));
    layout.addButton(220, 70, "Steuerung", 605, 480, () => k.go("Navigation"));
  } else {
    layout.addText("Du hast " + score + " Früchte gefressen", Config.width, Config.height+50);
    layout.addButton(220, 70, "Nochmal?", 245, 480, () => k.go("Game"));
    layout.addButton(220, 70, "Steuerung", 605, 480, () => k.go("Navigation"));

  }}
