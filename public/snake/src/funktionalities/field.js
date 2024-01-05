import k from "../kaboom";

export default class Field {

    constructor (fieldSize) {
        this.fieldSize = fieldSize;
        this.scoreLabel = null;
    }

     buildPlayground() {
        k.loadSprite("bg", "sprites/bg.png");
      
        k.add([sprite("bg")]);
        //add tilemap 30x 20 Fields inside of Bricks
        k.addLevel(
          [
            "=================",
            "=               =",
            "=               =",
            "=               =",
            "=               =",
            "=               =",
            "=               =",
            "=               =",
            "=               =",
            "=               =",
            "=               =",
            "=================",
          ],
          {
            // define the size of tile block
            tileWidth: this.fieldSize,
            tileHeight: this.fieldSize,
            // define what each symbol means, by a function returning a component list (what will be passed to add())
            tiles: {
              "=": () => [
                k.rect(this.fieldSize - 2, this.fieldSize - 2),
                k.pos(1, 1),
                k.color(156, 72, 44),
                k.opacity(0),
                k.area(),
                "brick",
              ],
            },
          }
        );
    }
}


