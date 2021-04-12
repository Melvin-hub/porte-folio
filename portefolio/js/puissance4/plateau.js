var turn = false;
var round = "red";
window.onload = function(){
      var plateau = document.getElementById("plateau");
      createBtnsBoard(plateau);
      createBlockBoard(plateau);
      //reste optionnel
      //createAdminButton();
}

function createAdminButton(){
    let btn = document.createElement("button");
    btn.setAttribute("class", "case");
    btn.onclick = function(){
        turn = false;
        if (round=="red"){
          round = "yellow"
          btn.style.backgroundColor = round;
        }
        else {
          round = "red";
          btn.style.backgroundColor = round;
        }
    }
    document.getElementsByTagName("body")[0].appendChild(btn);
}

function createBlockBoard(plateau){
  for (let i=0; i<6; i++){
      let div = document.createElement("div");
      for (let j=0; j<7; j++){
          let bouton = document.createElement("button");
          bouton.setAttribute("id", i+""+j+"");
          bouton.setAttribute("class", "block");
          bouton.style.backgroundColor = "lightgray";
          bouton.disabled = true;
          div.appendChild(bouton);
        }
      plateau.appendChild(div);
    }

}

function createBtnsBoard(plateau){
  let div = document.createElement("div");
  for (let j=0; j<7; j++){

    let bouton = document.createElement("button");
    bouton.setAttribute("class", "case");
    bouton.onmouseover = function(){
      bouton.style.backgroundColor = round;
    };

    bouton.onclick = function(){
        if (!turn)
            throwToken(j, round);
        if (turn){
            if (checkVictory(round)){
                console.log("victoire des : "+round);
            }
        }
    };
    bouton.onmouseleave = function(){
      bouton.style.backgroundColor = "white";
    }
    div.appendChild(bouton);
  }
  plateau.appendChild(div);
}

function setColor(i, j, color){
    document.getElementById(i+""+j+"").style.backgroundColor = color;
}

function getColor(i, j){
    return document.getElementById(i+""+j+"").style.backgroundColor;
}

function isEmpty(i, j){
  return getColor(i, j) != "red" && getColor(i, j) != "yellow";
}

function checkVictory(color){
  return checkAllCols(color)||checkAllRows(color)||checkDiag(color);
}
function throwToken(j, color){
    let i=5;
    while (i>=0 && (!isEmpty(i, j))){
        i--;
    }
    if (i>=0){
        setColor(i, j, color);
        turn = true;
    }
}

function checkRowRange(i, j, color){
    for (let x=0; x<4; x++){
        if (getColor(i, j+x) != color)
            return false;
    }
    return true;
}

function checkRow(i, color){
    for (let j=0; j<4; j++){
        if (checkRowRange(i, j, color))
          return true;
    }
    return false;
}

function checkAllRows(color){
    for (let i=0; i<6; i++){
        if (checkRow(i, color)){
          return true;
        }
    }
    return false;
}

function checkColRange(i, j, color){
    for (let x=0; x<4; x++){
        if (getColor(i+x, j) != color)
            return false;
    }
    return true;
}

function checkCol(j, color){
    for (let i=0; i<3; i++){
        if (checkColRange(i, j, color))
          return true;
    }
    return false;
}

function checkAllCols(color){
    for (let j=0; j<7; j++){
        if (checkCol(j, color)){
            return true;
        }
    }
    return false;
}

function checkDiagDownRange(i, j, color){
    for (let x=0; x<4; x++){
        if (getColor(i+x, j+x, color) != color){
            return false;
        }
    }
    return true;
}

function allowParam(i, j){
  return 0<= i && i<6 && 0<= j && j<7;
}

function checkDiagUp(i, j, color){
    for (let x=0; x<4; x++){
        if (!allowParam(i+x,j-x) || getColor(i+x, j-x, color) != color){
            return false;
        }
    }
    return true;
}

function checkDiagDown(i, j, color){
    for (x=0; x<4; x++){
        if (!allowParam(i+x,j+x) || getColor(i+x, j+x, color) != color){
            return false;
        }
    }
    return true;
}

function checkDiag(color){
    for (let i=0; i<6; i++){
      for (let j=0; j<7; j++){
          if (checkDiagDown(i, j, color) || checkDiagUp(i, j, color)){
              return true;
          }
      }
    }
    return false;
}
