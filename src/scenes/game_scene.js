import Phaser from "phaser";
import allTiles_sheet from "../assets/allTiles_sheet.png";
import {OutlinePipeline,OutlinePipeline_KEY} from '../pipelines/outline'


export class GameScene extends Phaser.Scene
{
    constructor ()
    {
        this.selectedTiles = [];
        super();
    }

    preload ()
    {
        if (this.game.renderer instanceof Phaser.Renderer.WebGL.WebGLRenderer) {
            this.game.renderer.addPipeline(
                OutlinePipeline_KEY,
                new OutlinePipeline(this.game)
            );
        }        
        this.load.spritesheet('isoblocks2', allTiles_sheet, { frameWidth: 112, frameHeight: 129 });
    }


    tileMouseDownHandler(pointer,gameObject){
        console.log(this);
        this.setTint(0xff0000);
    }
    tileMouseUpHandler(pointer,gameObject){
        console.log(this);
        this.clearTint();
    }
    
    create(){

        var mapWidth = 4;
        var mapHeight = 4; 

        var tileWidthHalf = 56;
        var tileHeightHalf = 64;

        var centerX = (mapWidth / 2) * tileWidthHalf;
        var centerY = -100;

        var blocks = [];

        for (var y = 0; y < mapHeight; y++)
        {
            for (var x = 0; x < mapWidth; x++)
            {
                var tx = (x - y) * tileWidthHalf;
                var ty = (x + y) * tileHeightHalf;
                
                var block = Math.floor(Math.random() * 136);
                
                
                 
                

                var tile = this.add.image(centerX + tx, centerY + ty, 'isoblocks2', block);
               
                tile.setData('row', x);
                tile.setData('col', y);
                tile.setData('type',block);
                tile.setDepth(centerY + ty);
                tile.setInteractive();
                tile.on('pointerdown',this.tileMouseDownHandler);
                tile.on('pointerup',this.tileMouseUpHandler);
                
                blocks.push(tile);
            }
        }

        const cursors = this.input.keyboard.createCursorKeys();

        const controlConfig = {
            camera: this.cameras.main,
            left: cursors.left,
            right: cursors.right,
            zoomIn: cursors.up,
            zoomOut: cursors.down,
            acceleration: 0.04,
            drag: 0.0005,
            maxSpeed: 0.7
        };

        this.controls = new Phaser.Cameras.Controls.SmoothedKeyControl(controlConfig);

        this.cameras.main.zoom = 0.62;
        this.cameras.main.scrollX = -110;
    }
    create2 ()
    {
        var frames = this.textures.get('isoblocks2').getFrameNames();
        console.log(frames)
        //  blocks are 50x50

        var mapWidth = 40;
        var mapHeight = 40;

        var tileWidthHalf = 20;
        var tileHeightHalf = 12;

        var centerX = (mapWidth / 2) * tileWidthHalf;
        var centerY = -100;

        var blocks = [];

        

        for (var y = 0; y < mapHeight; y++)
        {
            for (var x = 0; x < mapWidth; x++)
            {
                var tx = (x - y) * tileWidthHalf;
                var ty = (x + y) * tileHeightHalf;

                var block = (x % 2 === 0) ? 'block-123' : 'block-132';

                var tile = this.add.image(centerX + tx, centerY + ty, 'isoblocks', block);

                tile.setData('row', x);
                tile.setData('col', y);

                tile.setDepth(centerY + ty);

                blocks.push(tile);
            }
        }
        var demoImage = this.add.image(100,100, 'isoblocks2', 32);
        demoImage.setDepth(1000);
        //demoImage.setTint(0xff0000);
        demoImage.setPipeline(OutlinePipeline_KEY);
        demoImage.pipeline.setFloat2(
            "uTextureSize",
            demoImage.texture.getSourceImage().width,
            demoImage.texture.getSourceImage().height
        );


        this.tweens.add({

            targets: blocks,

            x: function (target, key, value) {
                return (value - (30 - (target.getData('col')) * 4));
            },

            y: function (target, key, value) {
                return (value - (target.getData('row') * 5));
            },

            yoyo: true,
            ease: 'Sine.easeInOut',
            repeat: -1,
            duration: 700,
            delay: function (target, key, value, targetIndex, totalTargets, tween) {
                return (target.getData('row') * 60) + (target.getData('col') * 60);
            }
        });

        const cursors = this.input.keyboard.createCursorKeys();

        const controlConfig = {
            camera: this.cameras.main,
            left: cursors.left,
            right: cursors.right,
            zoomIn: cursors.up,
            zoomOut: cursors.down,
            acceleration: 0.04,
            drag: 0.0005,
            maxSpeed: 0.7
        };

        this.controls = new Phaser.Cameras.Controls.SmoothedKeyControl(controlConfig);

        this.cameras.main.zoom = 0.62;
        this.cameras.main.scrollX = -110;
    }

    update (time, delta)
    {
        this.controls.update(delta);
    }
}
