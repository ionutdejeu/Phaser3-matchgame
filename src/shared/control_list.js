import Phaser from "phaser";
import {TextButton} from './text_button';

export default class ControlList extends Phaser.GameObjects.Container{
   
    constructor(scene,posX,posY){
        super(scene,posX,posY);
        this.buttonHeight=100;
        this.buttonWidht=100;
    }
    
    addTextButton(text,callback){
        // calculate next button position based on weidth and height 
        this.add(
            new TextButton(this.scene, 
                this.positionX ,
                this.positionY+ this.buttonHeight*this.length,
                text,callback)
        );
    }
} 