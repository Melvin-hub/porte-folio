class Map{
    constructor(ctx, map, indexMap){
      if (map === undefined){
        this.map = new Array();
        this.indexMap = 0;
        this.initEmptyMap(ctx);
      }
      else{
        this.map = map;
        if (indexMap === undefined){
          this.indexMap = 0;
        }
        else{
          this.indexMap = indexMap;
        }
      }
    }

    inEditorMode(){
      return this.boardMap !== undefined;
    }

    setEditor(){
      this.boardMap = new Array();
      this.selected = new Array();
      this.lastSelected = new Array();
      this.current = new Image();
      this.current.src = "../images/PNG/00-Empty-Tiles.png";
    }

    clickOnBoard(x, y, coords, ctx){
      if (!this.inEditorMode()) return;
      if (this.lastSelected.length == 3){
          ctx.drawImage(this.lastSelected[0], this.lastSelected[1], this.lastSelected[2], 48, 16);
      }
      if (coords[0] == this.lastSelected[1] && coords[1] == this.lastSelected[2]){
          ctx.drawImage(this.lastSelected[0], this.lastSelected[1], this.lastSelected[2], 48, 16);
          this.lastSelected = [];
          this.current.src = "../images/PNG/00-Empty-Tiles.png";
      }else{
        let a;
        a = Math.trunc(x/48);

        if (coords[1] == 608-32){
          this.current.src = this.boardMap[a].src;
          ctx.drawImage(this.selected[a], coords[0], coords[1], 48, 16);
          this.lastSelected = [this.boardMap[a], coords[0],coords[1]];
        }
        else{
          this.current.src = this.boardMap[a+10].src;
          ctx.drawImage(this.selected[a+10], coords[0], coords[1], 48, 16);
          this.lastSelected = [this.boardMap[a+10], coords[0], coords[1]];
        }
      }
    }

    clickOnBlocks(coords){
      if (!this.inEditorMode()) return;
      let c, d;
      c = Math.trunc(coords[0]/48)
      d = Math.trunc(coords[1]/16);
      if (this.map[this.indexMap][d][c].src == this.current.src){
          this.map[this.indexMap][d][c].src = "../images/PNG/00-Empty-Tiles.png";
      }
      else {
        this.map[this.indexMap][d][c].src = this.current.src;
      }
    }

    drawBricksOption(ctx){
        for (let i=1; i<=20; i++){
          let image = new Image();
          let begin = "../images/PNG/"+((i<10)?("0"+i):(i));
          image.src = begin+"-Breakout-Tiles.png";

          this.boardMap.push(image);
          let click = new Image();
          click.src = begin+"-White-Tiles.png";
          this.selected.push(click);

          image.onload = function(){
            let x = 48*((i-1)%10);
            let y = 608-((i<=10)?(32):(16));
            ctx.drawImage(image, x, y, 48, 16);
          }
        }

        let previous = new Image();
        let next = new Image();

        previous.src = "../images/previous.png";
        next.src = "../images/next.png";

        previous.onload = function(){
          ctx.drawImage(previous, 576-90, 608-32,40, 32);
        }

        next.onload = function(){
          ctx.drawImage(next, 576-45, 608-32, 40, 32);
        }
    }

    previous(){
      this.indexMap--;
      if (this.indexMap<0){
        if (this.map.length < 20){
          this.indexMap = 0;
          this.map.unshift(new Array());
          this.initEmptyMap();
        }
        else{
          this.indexMap++;
        }
      }
    }

    next(){
      this.indexMap++;
      if (this.indexMap == this.map.length){
        if (this.map.length < 20){
          this.map.push(new Array());
          this.initEmptyMap();
        }
        else{
          this.indexMap--;
        }
      }
    }
    isEmpty(image){
        return image.src == "../images/PNG/00-Empty-Tiles.png";
    }

    isDrawable(image){
        return !this.isEmpty(this.map[this.indexMap][i][j]) || !this.inEditorMode();
    }

    refresh(ctx){
      for (let i=0; i<20; i++){
        for (let j=0; j<12; j++){
            ctx.drawImage(this.map[this.indexMap][i][j], j*48, i*16, 48, 16);
        }
      }
    }

    initEmptyMap(ctx){
      this.map[this.indexMap] = new Array();
      for (let i=0; i<20; i++){
        this.map[this.indexMap].push(new Array());
        for (let j=0; j<12; j++){
          let currentImg = new Image();
          currentImg.src = "../images/PNG/00-Empty-Tiles.png";
          currentImg.onload = function(){
            ctx.drawImage(currentImg, j*48, i*16, 48, 16);
          }
          this.map[this.indexMap][i].push(currentImg);
        }
      }
    }

    destroyMap(){
      if (this.indexMap==0){
          this.map.shift();
      }
      else{
          this.map.splice(this.indexMap, this.indexMap+1);
      }
    }

    toSrcArray(currentMap){
        let tab = new Array();
        for (let i=0; i<20; i++){
          tab.push(new Array());
          for (let j=0; j<12; j++){
              tab[i].push(currentMap[i][j].src);
          }
        }
        return tab;
    }

    toSrcBigArray(bigMap){
        let tab = new Array();
        for (let i=0; i<bigMap.length; i++){
              tab.push(this.toSrcArray(bigMap[i]));
        }
        return tab;
    }

    downloadMap(){
        let url = "downloadMap.php";
        let name = "map"+this.indexMap;
        let currentMap = JSON.stringify(this.toSrcArray(this.map[this.indexMap]));
        let post = $.post(url, {name: name, map: currentMap});
        post.done(function(data){
            let link = "../php/"+data;
            window.location = link;
            setTimeout(function(){
              let request = $.post(url, {destroy: "true", name: link});
            }, 500);
        });
    }

    downloadCampaign(){
        let url = "downloadCampaign.php";
        let name = "campaign";
        let bigMap = JSON.stringify(this.toSrcBigArray(this.map));
        let post = $.post(url, {name: name, map: bigMap});
        post.done(function(data){
            let link = "../php/"+data;
            window.location = link;


            setTimeout(function(){
              let request = $.post(url, {destroy: "true", name: link});
            }, 500);
        });
    }
}
