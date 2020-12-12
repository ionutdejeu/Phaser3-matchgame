import Phaser from "phaser";
import {EventObserver} from '../events/event_observer';
import {GameEvents,GameEventNames} from '../logic/game_manager'
import TextButton from '../shared/text_button';

export const UiSceneKey = 'UIScene'
export const UiEventsNames={
    OpenMenu :"OpenMenu",
    CloseMenu:"CloseMenu",
    ScoreChanged:"ScoreChanged",
    OnGameWinUIEnable:"OnGameWinUIEnable"
};
export const UiEvents = new Phaser.Events.EventEmitter();

export class UIScene extends Phaser.Scene
{
    constructor ()
    {
        super({key:UiSceneKey});
        this.textGameObject = null;
    }

    createText(x,y,label){
        return this.make.text({
            x: x,
            y: y,
            text: label,
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
                wordWrap: { width: 500 },
            }
        });
    }
    create(){
        UiEvents.on(UiEventsNames.OpenMenu,this.openNemuHandler);
        UiEvents.on(UiEventsNames.ScoreChanged,this.onScoreChangedHanler,this);
        UiEvents.on(UiEventsNames.OnGameWinUIEnable,this.onWinGameHandler,this);
        this.textGameObject = this.createText(100,50,"Score: 0");
        
    
        var w = this.game.canvas.width;
        var h = this.game.canvas.height;
        var x = w*.25;
        var y = h*.25;
        var wpannel = w*0.5;
        var hpannel = h*0.5;

        this.successScreenContainer = this.add.container(x, y);
        
        this.successPannel = {
            backgrounGraphics:  this.add.graphics(),
            txtTitle:this.createText(wpannel/2,hpannel/5,"Congratulations! You win !"),
            txtYourScore:this.createText(wpannel/2,hpannel/5*2,"Your score is:"),
            btnRestart:new TextButton(this,wpannel/2,hpannel/5*4,"Click to restart level ",this.onRetryBtnDownHandler)
        };
        this.successPannel.backgrounGraphics.fillStyle(0xffff00, 1);
        this.successPannel.backgrounGraphics.fillRoundedRect(0,0,wpannel,hpannel);
        this.successPannel.backgrounGraphics.fillStyle(0xff00ff, 1);
        
        for (const [key, value] of Object.entries(this.successPannel)) {
            this.successScreenContainer.add(value);
        }
        
        this.successScreenContainer.setActive(false);
        this.successScreenContainer.setVisible(false); 

    }
    onWinGameHandler(finalScore){
        this.successPannel.txtYourScore.text = "Your final score is: "+finalScore;
        this.successScreenContainer.setActive(true);
        this.successScreenContainer.setVisible(true); 
    }
    openNemuHandler(params){

    }
    onRetryBtnDownHandler(param){
        GameEvents.emit(GameEventNames.RestartGame,param);
    }
    onScoreChangedHanler(score){
        this.textGameObject.text = "Score: "+score;
    }
}