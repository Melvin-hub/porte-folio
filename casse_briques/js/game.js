class Game{
    constructor(canvas, mode, map){
        this.canvas = canvas;
        this.ctx = this.canvas.getContext("2d");
        this.map = new Map(this.ctx, map);
        if (mode=="editor"){
          this.map.setEditor();
          this.drawBricksOption();
        }
        else if (map===undefined){ //si aucune map n'est affiché, on ne peut pas jouer
          this.map.setEditor();
          this.drawBricksOption();
        }
        else{
          
        }
    }

    refresh(){
        this.map.refresh(this.ctx);
    }

    clickOnBoard(x, y, coords){
      this.map.clickOnBoard(x, y, coords, this.ctx);
    }


    drawBricksOption(){
      this.map.drawBricksOption(this.ctx);
    }


}
