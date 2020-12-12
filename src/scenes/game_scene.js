import Phaser, { Game } from "phaser";

import {GameManagerInstance,GameEvents,GameEventNames} from '../logic/game_manager'
import {ScrollingCamera} from '../shared/scrolling_camera';
import {UiEvents, UiEventsNames, UiSceneKey} from './ui_scene';
export const GameSceneKey = 'GameScene';
export class GameScene extends Phaser.Scene
{
    constructor ()
    {
         
        super({key:GameSceneKey});
    }

    tileMouseDownHandler(pointer,gameObject){
        this.selectedTile = this;
    }
    tileMouseUpHandler(pointer,gameObject){
        if(this.selectedTile === this){    
            GameEvents.emit(GameEventNames.TileSelected,[pointer,this]);
        }
    }
    createMap(blocks,width,height){
        var map = []
        //pick random 
        var totalCount = width*height;
        
        if(totalCount%2 == 1){
            totalCount-=1;
        }
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
    animateMatchFound(tilesArr){
        this.emitter1.stop();
        this.emitter2.stop();
        this.emitter2.reserve(50);
        this.emitter1.reserve(50);
        
        this.emitter1.emitParticle(10,tilesArr[0].x,tilesArr[0].y);
        this.emitter2.emitParticle(10,tilesArr[1].x,tilesArr[1].y);
        this.match_pair_sound.play();
        if(this.checkWindGameCondition())
        {
            GameEvents.emit(GameEventNames.WinGame,{});
        }

    }

    checkWindGameCondition(){
        console.log(this.blocks);
        for (var x = 0; x < this.blocks.length; x++)
        {
            if(this.blocks[x].active==true){
                return false;
            }
        }
        return true;
    }
   
    restarGameHandler(){
        console.log("Restart");
        this.stop();
        this.scene.restart();
    }
    create(){
        GameEvents.on(GameEventNames.TilesMatchFound,this.animateMatchFound,this);
        GameEvents.on(GameEventNames.RestartGame,this.restarGameHandler,this);
        this.scene.launch(UiSceneKey);
        this.music = this.sound.add('backgroundmusic',{volume: 0.1});
        this.match_pair_sound = this.sound.add('pop_sound');

        this.music.loop = true; // This is what you are lookig for
        if((!this.music.isPlaying)){
            this.music.play();
        }

        //  First create a particle manager
        //  A single manager can be responsible for multiple emitters
        //  The manager also controls which particle texture is used by _all_ emitter
        this.particles = this.add.particles('blue_particle');
        var emitter_config = {
            alpha: { start: 1, end: 0 },
            scale: { start: 0.5, end: 3.5 },
            speed: 40,
            accelerationY: 300,
            angle: { min: -85, max: -95 },
            rotate: { min: -180, max: 180 },
            lifespan: { min: 500, max: 700 },
            blendMode: 'ADD',
            frequency: 110,
            maxParticles: 4,
            on:false, // initally set to inactive;
        }


        var frames = this.textures.get('isoblocks2').getFrameNames();
        var mapWidth = 10;
        var mapHeight = 10; 

        var tileWidthHalf = 56;
        var tileHeightHalf = 64;

        var centerX = (mapWidth+1) * tileWidthHalf;
        var centerY = tileHeightHalf;

        this.blocks = [];

        this.map = this.createMap(frames,mapWidth,mapHeight);
        for (var y = 0; y < mapHeight; y++)
        {
            for (var x = 0; x < mapWidth; x++)
            {
                var tx = (x - y) * tileWidthHalf;
                var ty = (x + y) * tileHeightHalf;
                
                
                var tile = this.add.image(centerX + tx, centerY + ty, 'isoblocks2', this.map[y][x]);
                
                tile.setData('row', x);
                tile.setData('col', y);
                tile.setData('type',this.map[y][x]);

                tile.setDepth(centerY + ty);
                tile.setInteractive();
                tile.on('pointerup',this.tileMouseUpHandler);
                tile.on('pointerdown',this.tileMouseDownHandler);
                this.blocks.push(tile);
            }
        }

       
        //limit the camera to the size of our map
        //this.cameras.main.setBounds(0, 0, this.map.widthInPixels * 4, this.map.heightInPixels * 4);
        this.cameras.remove(this.cameras.main);
        var camera = new ScrollingCamera(this,{
            x:0,
            y:0,
            bottom:(mapHeight+mapWidth)*tileHeightHalf,
            right:(mapHeight+mapWidth)*tileHeightHalf
        });
        this.particles.setDepth(10000);
        this.emitter1 = this.particles.createEmitter(emitter_config);
        this.emitter2 = this.particles.createEmitter(emitter_config);
        console.log(this.emitter1,this.emitter2);
        
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

    stop(){
        this.music.stop();
         this.music.destroy();
        this.match_pair_sound.stop();
         this.match_pair_sound.destroy(); 
    }
}