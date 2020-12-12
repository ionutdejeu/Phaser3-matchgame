import {UiEvents, UiEventsNames, UiSceneKey} from '../scenes/ui_scene';

export const GameEventNames={
    WinGame :"Win",
    CloseMenu:"TimeUp",
    TileSelected:"TileSelected",
    TilesMatchFound:"TilesMatchFound",
    RestartGame:"RestarGameEvent"
};
export const GameEvents = new Phaser.Events.EventEmitter();
class GameStateManger{


    constructor(){
        this.selecteTiles =[];
        this.score = 0;
        GameEvents.on(GameEventNames.TileSelected,this.onTileSelectedHandler,this);
        GameEvents.on(GameEventNames.WinGame,this.onGameWin,this);
    }

    onCreateMap(){
        // create the map 
    }
    onTileSelectedHandler(args){
        var img = args[1];
        this.selecteTiles.push(img);
        img.setTint(0xff0000);
        if(this.selecteTiles.length > 1){
            console.log(this.selecteTiles.length);
            this.onPairSelected(this.selecteTiles);
        }
    }
    increaseScore(add){
        this.score += add;
        UiEvents.emit(UiEventsNames.ScoreChanged,this.score);
    }
    onPairSelected(arr){
        var match = this.checkMatch(arr[0],arr[1]);
        // increase score 
        if(match){
            arr[0].setVisible(false);
            arr[0].disableInteractive();
            arr[0].active = false;
            arr[1].setVisible(false);
            arr[1].disableInteractive();
            arr[1].active = false;
            GameEvents.emit(GameEventNames.TilesMatchFound,arr);
            this.increaseScore(20);
            this.selecteTiles.splice(0,arr.length);
        }
        else{
            arr[0].clearTint();
            arr[1].clearTint();
            this.selecteTiles.splice(0,arr.length);

        }
        
        
    }
    checkMatch(tile1,tile2){
        return tile1.getData('type') === tile2.getData('type') && 
        (tile1.getData('row') != tile2.getData('row') ||
        tile1.getData('col') != tile2.getData('col'))
    }

    onGameWin(params){
        console.log("Win",params);
        UiEvents.emit(UiEventsNames.OnGameWinUIEnable,this.score);
    }
}
const GameManagerInstance = new GameStateManger();
export {GameManagerInstance};