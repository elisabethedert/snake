import k from "./kaboom"
import Start from "./scenes/start"

k.scene("Start", Start)

// main scene opens start scene from where the game can be started
k.scene("Main", () => {
  k.go("Start", null)
});

k.go("Main");
