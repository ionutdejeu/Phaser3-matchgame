import Phaser from "phaser";
import {EventObserver} from '../events/event_observer';

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
    }

    create(){
        UiEvents.on(UiEventsNames.OpenMenu,this.openNemuHandler);
    }

    openNemuHandler(params){

    }
}