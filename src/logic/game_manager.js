

export const GameEventNames={
    OpenMenu :"Win",
    CloseMenu:"TimeUp",
    TileSelected:"TileSelected"
};
export const GameEvents = new Phaser.Events.EventEmitter();
class GameStateManger{

    constructor(){
        this.selecteTiles =[];
        this.score = 0;
        GameEvents.on(GameEventNames.TileSelected,this.onTileSelectedHandler,this);
    }

    onTileSelectedHandler(args){
        var img = args[1];
        this.selecteTiles.push(img);
        img.setTint(0xff0000);
        if(this.selecteTiles.length > 1){
            console.log(this.selecteTiles.length);
            this.onPairSelected(this.selecteTiles)
        }
    }
    onPairSelected(arr){
        for(let i = 0;i <=arr.length;i++){
            let tile = arr.pop();
            console.log(tile);
            tile.setVisible(false);
            tile.disableInteractive();
        }
    }
}
const GameManagerInstance = new GameStateManger();
export {GameManagerInstance};