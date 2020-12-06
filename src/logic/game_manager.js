

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

    onCreateMap(){
        // create the map 
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
        var match = this.checkMatch(arr[0],arr[1]);
            // increase score 

        for(let i = 0;i <=arr.length;i++){
            let tile = arr.pop();
            console.log(tile);
            if(match){
                tile.setVisible(false);
                tile.disableInteractive();
            }else{
                tile.clearTint();
            }
           
        }
        
    }

    checkMatch(tile1,tile2){
        return tile1.getData('type') === tile2.getData('type')
    }
}
const GameManagerInstance = new GameStateManger();
export {GameManagerInstance};