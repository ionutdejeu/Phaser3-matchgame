import Phaser from "phaser";

import {GameManagerInstance,GameEvents,GameEventNames} from '../logic/game_manager'
import {ScrollingCamera} from '../shared/scrolling_camera';
import {UiSceneKey} from './ui_scene';
export const GameSceneKey = 'GameScene';
export class GameScene extends Phaser.Scene
{
    constructor ()
    {
         
        super({key:GameSceneKey});
    }

    tileMouseDownHandler(pointer,gameObject){
        GameEvents.emit(GameEventNames.TileSelected,[pointer,this]);
    }
    tileMouseUpHandler(pointer,gameObject){
        
        
    }
    createMap(blocks,width,height){
        var map = []
        //pick random 
        var totalCount = width*height;
      
        var chosenFrames = [];
        for(let i = totalCount/2;i>0;i--){
           var randFrame = parseInt(Math.random()*blocks.length);
           // add the random frame twice
           chosenFrames.push(randFrame);
           chosenFrames.push(randFrame);
        }
       for (var y = 0; y < height; y++)
       {
           var row = []
           for (var x = 0; x < width; x++)
           {
               let randChoosenFrameIndex = parseInt(Math.random()*chosenFrames.length);
               let frameNumber = chosenFrames[randChoosenFrameIndex];
               row.push(frameNumber);
               chosenFrames.splice(randChoosenFrameIndex, 1);
           }
           map.push(row);
       }

       return map
    }
    
    create(){
        
        this.scene.launch(UiSceneKey);

        var frames = this.textures.get('isoblocks2').getFrameNames();
        console.log(frames)
        var mapWidth = 10;
        var mapHeight = 10; 

        var tileWidthHalf = 56;
        var tileHeightHalf = 64;

        var centerX = (mapWidth / 2) * tileWidthHalf;
        var centerY = -100;

        var blocks = [];

        var map = this.createMap(frames,mapWidth,mapHeight);
        console.log(map);
        for (var y = 0; y < mapHeight; y++)
        {
            for (var x = 0; x < mapWidth; x++)
            {
                var tx = (x - y) * tileWidthHalf;
                var ty = (x + y) * tileHeightHalf;
                
                
                var tile = this.add.image(centerX + tx, centerY + ty, 'isoblocks2', map[y][x]);
                
                tile.setData('row', x);
                tile.setData('col', y);
                tile.setData('type',map[y][x]);
                
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

        //limit the camera to the size of our map
        //this.cameras.main.setBounds(0, 0, this.map.widthInPixels * 4, this.map.heightInPixels * 4);
        this.cameras.remove(this.cameras.main);
        var camera = new ScrollingCamera(this,{
            x:0,
            y:0,
            bottom:1000,
            right:1000
        });
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
