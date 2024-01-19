import k from "../kaboom";
import Layout from "../funktionalities/layout";
import Start from "./start";

k.scene("Start", Start);

/**
 * show how to navigate the snake
 */
export default function Navigation() {
    let layout = new Layout();
    layout.addImage("arrow-keys")
    layout.addButton(220, 70, "Zurück", 425, 480, "Start");
}
