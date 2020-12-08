import allTiles_sheet from "../assets/allTiles_sheet.png";
import background_music from '../assets/background_music.mp3';
import pop from '../assets/pop.ogg';
import blue from '../assets/blue.png';

import {OutlinePipeline,OutlinePipeline_KEY} from '../pipelines/outline'
import {GameSceneKey} from './game_scene';

export const BootSceneKey = 'bootscene';
export class BootScene extends Phaser.Scene
{
    constructor ()
    {
        super({key:BootSceneKey});
        this.percentage =0;
    }

    preload ()
    {
        this.graphics = this.add.graphics();
		this.newGraphics = this.add.graphics();
		var progressBar = new Phaser.Geom.Rectangle(200, 200, 400, 50);
		var progressBarFill = new Phaser.Geom.Rectangle(205, 205, 290, 40);

		this.graphics.fillStyle(0xffffff, 1);
		this.graphics.fillRectShape(progressBar);

		this.newGraphics.fillStyle(0x3587e2, 1);
        this.newGraphics.fillRectShape(progressBarFill);
        var loadingText = this.add.text(250,260,"Loading: ", { fontSize: '32px', fill: '#FFF' });

        if (this.game.renderer instanceof Phaser.Renderer.WebGL.WebGLRenderer) {
            this.game.renderer.addPipeline(
                OutlinePipeline_KEY,
                new OutlinePipeline(this.game)
            );
        }        
        this.load.spritesheet('isoblocks2', allTiles_sheet, { frameWidth: 112, frameHeight: 129 });
        this.load.audio('backgroundmusic',background_music);
        this.load.audio('pop_sound',pop);
        this.load.image('blue_particle',blue);
        
        console.log(this);

        this.load.on('progress', this.updateBar, {newGraphics:this.newGraphics,loadingText:loadingText});
        this.load.on('complete', this.complete, {scene:this.scene});
    }

    updateBar(percentage) {
        this.newGraphics.clear();
        this.newGraphics.fillStyle(0x3587e2, 1);
        this.newGraphics.fillRectShape(new Phaser.Geom.Rectangle(205, 205, percentage*390, 40));
                
        percentage = percentage * 100;
        this.loadingText.setText("Loading: " + percentage.toFixed(2) + "%");
        console.log("P:" + percentage);
        
    }
    
	complete() {
		console.log("COMPLETE!");
		this.scene.start(GameSceneKey);
	}
    

   
}