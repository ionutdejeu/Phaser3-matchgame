

export const GameEventNames={
    OpenMenu :"Win",
    CloseMenu:"TimeUp",
    TileSelected:"TileSelected"
};
export const GameEvents = new Phaser.Events.EventEmitter();
class GameStateManger{

    constructor(){
        this.selecteTiles =[];
        GameEvents.on(GameEventNames.TileSelected,this.onTileSelectedHandler);
    }

    onTileSelectedHandler(pointer,gameObject){
        console.log('in manager', pointer,gameObject);
    }
}
const GameManagerInstance = new GameStateManger();
export {GameManagerInstance};