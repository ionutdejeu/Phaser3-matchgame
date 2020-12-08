import Phaser, { Game } from "phaser";
import logoImg from "./assets/logo.png";
import {GameScene,GameSceneKey} from "./scenes/game_scene";
import {UIScene,UiSceneKey} from "./scenes/ui_scene";
import {BootScene,BootSceneKey} from  "./scenes/boot";
const config = {
  type: Phaser.AUTO,
  parent: "phaser-example",
  width: 800,
  height: 600,
};

const game = new Phaser.Game(config);
game.scene.add(BootSceneKey,new BootScene());
game.scene.add(GameSceneKey,new GameScene());
game.scene.add(UiSceneKey,new UIScene());

game.scene.start(BootSceneKey);



