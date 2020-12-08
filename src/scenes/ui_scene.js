import Phaser from "phaser";
import {EventObserver} from '../events/event_observer';
import {GameEvents,GameEventNames} from '../logic/game_manager'
import {TextButton} from '../shared/text_button';

export const UiSceneKey = 'UIScene'
export const UiEventsNames={
    OpenMenu :"OpenMenu",
    CloseMenu:"CloseMenu",
    ScoreChanged:"ScoreChanged"
};
export const UiEvents = new Phaser.Events.EventEmitter();

export class UIScene extends Phaser.Scene
{
    constructor ()
    {
        super({key:UiSceneKey});
        this.textGameObject = null;
    }

    create(){
        UiEvents.on(UiEventsNames.OpenMenu,this.openNemuHandler);
        UiEvents.on(UiEventsNames.ScoreChanged,this.onScoreChangedHanler,this);
        this.textGameObject = this.make.text({
            x: 100,
            y: 20,
            text: "Score: 0",
            origin: { x: 0.5, y: 0.5 },
            align:'center',
            color: '#fff',
            stroke: '#004AFF',
            strokeThickness: 3,
            shadow: {
                offsetX: 2,
                offsetY: 2,
                color: '#2E85FF',
                blur: 2,
                stroke: true,
                fill: true
            },
            style: {
                font: 'bold 25px Arial',
                fill: '#2E85FF',
                wordWrap: { width: 300 },
        
            }
        });
        //this.restart = new TextButton(this,this.game.)
    }
    openNemuHandler(params){

    }
    onScoreChangedHanler(score){
        this.textGameObject.text = "Score: "+score;
    }
}