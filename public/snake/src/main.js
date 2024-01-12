import k from "./kaboom"
import Start from "./scenes/start"

k.scene("Start", Start)

k.scene("Main", () => {
  k.go("Start", null)
});

k.go("Main");
