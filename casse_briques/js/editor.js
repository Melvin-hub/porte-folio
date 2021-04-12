function arroundPosition(x, y){
    return [x-x%48, y-y%16];
}

function checkCoords(x, y){
    return x>=0 && x<(12*48) && y>=0 && y<(16*20);
}

function inBoard(x, y){
    return x>=0 && x<10*48 && y>=(608-32) && y<608;
}

function isNone(last){
  return last[0] == -1  && last[1] == -1;
}

function inPrevious(x, y){
  return x>=(10*48) && x <(10*48+40) && y >= (608-32) && y<608;
}

function inNext(x, y){
  return x>=(576-40) && x<576 && y >= (608-32) && y<608;
}

$(document).ready(function(){
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");//, {alpha:false});

    var indexMap = 0;
    var map = new Array();

    var boardMap = [];
    var selected = [];

    var last = [-1,-1];
    var lastSelected = [];

    var img = new Image();

    function initEditor(){
      map[indexMap] = new Array();
      for (let i=0; i<20; i++){
        map[indexMap].push([]);
        for (let j=0; j<12; j++){
          let currentImg = new Image();
          currentImg.src = img.src;
          map[indexMap][i].push(currentImg);
          ctx.drawImage(img, j*48, i*16);
        }
      }
      let p = document.getElementById("pages");
      p.innerHTML = (indexMap+1)+" / "+map.length;
    }

    img.src = "../images/PNG/00-Empty-Tiles.png";
    img.onload = function(){
          initEditor();
    };

    drawBricksOption();
    var img2 = new Image();
    img2.src = "../images/PNG/00-Empty-Tiles.png";

    function refresh(){
        for (let i=0; i<20; i++){
          for (let j=0; j<12; j++){
              ctx.drawImage(map[indexMap][i][j], j*48, i*16, 48, 16);
          }
        }
        let p = document.getElementById("pages");
        p.innerHTML = (indexMap+1)+" / "+map.length;
    }

    function drawBricksOption(){
        for (let i=1; i<=20; i++){
          let image = new Image();
          let begin = "../images/PNG/"+((i<10)?("0"+i):(i));
          image.src = begin+"-Breakout-Tiles.png";

          boardMap.push(image);
          let click = new Image();
          click.src = begin+"-White-Tiles.png";
          selected.push(click);

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

    $("#canvas").click(function(event){
        let x, y;
        x = event.offsetX;
        y = event.offsetY;
        let coords = arroundPosition(x, y);
        if (inBoard(x, y)){
            if (lastSelected.length == 3){
                ctx.drawImage(lastSelected[0], lastSelected[1], lastSelected[2], 48, 16);
            }
            if (coords[0] == lastSelected[1] && coords[1] == lastSelected[2]){
                ctx.drawImage(lastSelected[0], lastSelected[1], lastSelected[2], 48, 16);
                lastSelected = [];
                img2.src = "../images/PNG/00-Empty-Tiles.png";
            }else{
              let a;
              a = Math.trunc(x/48);

              if (coords[1] == 608-32){
                img2.src = boardMap[a].src;
                ctx.drawImage(selected[a], coords[0], coords[1], 48, 16);
                lastSelected = [boardMap[a], coords[0],coords[1]];
              }
              else{
                img2.src = boardMap[a+10].src;
                ctx.drawImage(selected[a+10], coords[0], coords[1], 48, 16);
                lastSelected = [boardMap[a+10], coords[0],coords[1]];
              }
            }
        }
        else if (checkCoords(x, y)){
            let c, d;
            c = Math.trunc(coords[0]/48)
            d = Math.trunc(coords[1]/16);
            if (map[indexMap][d][c].src == img2.src){
                map[indexMap][d][c].src = "../images/PNG/00-Empty-Tiles.png";
            }
            else {
              map[indexMap][d][c].src = img2.src;
            }
        }
        else if (inPrevious(x, y)){
            indexMap--;
            if (indexMap<0){
              if (map.length < 20){
                indexMap = 0;
                map.unshift(new Array());
                initEditor();
              }
              else{
                indexMap++;
              }
            }
        }
        else if (inNext(x, y)){
          indexMap++;
          if (indexMap == map.length){
            if (map.length < 20){
              map.push(new Array());
              initEditor();
            }
            else{
              indexMap--;
            }
          }
        }
        refresh();
    });

    function toSrcArray(currentMap){
        let tab = new Array();
        for (let i=0; i<20; i++){
          tab.push(new Array());
          for (let j=0; j<12; j++){
              tab[i].push(currentMap[i][j].src);
          }
        }
        return tab;
    }

    function toSrcBigArray(bigMap){
        let tab = new Array();
        for (let i=0; i<bigMap.length; i++){
              tab.push(toSrcArray(bigMap[i]));
        }
        return tab;
    }

    function downloadMap(){
        let url = "downloadMap.php";
        let name = "map"+indexMap;
        let currentMap = JSON.stringify(toSrcArray(map[indexMap]));
        let post = $.post(url, {name: name, map: currentMap});
        post.done(function(data){
            let link = "../php/"+data;
            window.location = link;
            setTimeout(function(){
              let request = $.post(url, {destroy: "true", name: link});
            }, 500);
        });
    }

    function downloadCampaign(){
        let url = "downloadCampaign.php";
        let name = "campaign";
        let bigMap = JSON.stringify(toSrcBigArray(map));
        let post = $.post(url, {name: name, map: bigMap});
        post.done(function(data){
            let link = "../php/"+data;
            window.location = link;


            setTimeout(function(){
              let request = $.post(url, {destroy: "true", name: link});
            }, 500);
        });
    }

    function destroyMap(){
        if (indexMap==0){
            map.shift();
        }
        else{
            map.splice(indexMap, indexMap+1);
        }
    }

    $("#downloadMap").click(function(){
        downloadMap();
    });

    $("#downloadCampaign").click(function(){
        downloadCampaign();
    });
}
);
