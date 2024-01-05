import k from "./kaboom"
import Game from "./scenes/game"

k.scene("Game", Game)

k.scene("Main", () => {
  k.go("Game")
});

k.go("Main");
