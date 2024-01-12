import k from "../kaboom";
import Layout from "../funktionalities/layout";
import Start from "./start";
import Game from "./game";

k.scene("Start", Start);
k.scene("Game", Game);

export default function Navigation() {
    let layout = new Layout();
    layout.addImage("arrow-keys")
    layout.addButton(220, 70, "Zurück", 425, 480, () => k.go("Start"));
}
