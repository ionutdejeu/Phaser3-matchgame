import Phaser from "phaser";
import {EventObserver} from '../events/event_observer';

const UiSceneKey = 'UIScene'
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
        this.selectedTiles = [];
        super();
    }
}