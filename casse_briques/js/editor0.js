function arroundPosition(x, y){
    return [x-x%48, y-y%16];
}

function checkCoords(x, y){
    return x>=0 && x<(12*48) && y>=0 && y<(16*20);
}

function inBoard(x, y){
    return x>=0 && x<10*48 && y>=(608-32) && y<608;
}

function inPrevious(x, y){
  return x>=(10*48) && x <(10*48+40) && y >= (608-32) && y<608;
}

function inNext(x, y){
  return x>=(576-40) && x<576 && y >= (608-32) && y<608;
}

$(document).ready(function(){
  
    var game = new Game(document.getElementById("canvas"), "pouet");

    let p = document.getElementById("pages");
    p.innerHTML = (game.map.indexMap+1)+" / "+game.map.map.length;


    $("#canvas").click(function(event){
        let x, y;
        x = event.offsetX;
        y = event.offsetY;
        let coords = arroundPosition(x, y);
        if (inBoard(x, y)){
          game.clickOnBoard(x, y, coords);
        }
        else if (checkCoords(x, y)){
          game.map.clickOnBlocks(coords);
        }
        else if (inPrevious(x, y)){
          game.map.previous();
          p.innerHTML = (game.map.indexMap+1)+" / "+game.map.map.length;
        }
        else if (inNext(x, y)){
          game.map.next();
          p.innerHTML = (game.map.indexMap+1)+" / "+game.map.map.length;
        }
        game.refresh();
    });


    $("#downloadMap").click(function(){
        game.map.downloadMap();
    });

    $("#downloadCampaign").click(function(){
        game.map.downloadCampaign();
    });


}
);
