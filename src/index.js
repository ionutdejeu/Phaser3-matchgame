import Phaser, { Game } from "phaser";
import logoImg from "./assets/logo.png";
import {GameScene,GameSkeneKey} from "./scenes/game_scene";
import {UIScene} from "./scenes/ui_scene";

const config = {
  type: Phaser.AUTO,
  parent: "phaser-example",
  width: 800,
  height: 600,
  scene: [GameScene,UIScene]
};

const game = new Phaser.Game(config);