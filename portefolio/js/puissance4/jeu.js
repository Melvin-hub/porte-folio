$(document).ready(function(){
    let post = $.post("ajax/chargement.php");
    post.done(function(data){
        startGame(data);
    });

    function startGame(play){
      if (play=="error"){
        document.location.href = "gestionPartie.php";
      }
      play = JSON.parse(play);
      var game = play["game"];
      var player1 = play["id_player1"];
      var player2 = play["id_player2"];
      var round = play["round"];
      round = (round=="Y")?("yellow"):("red");

      var player = play["player"];
      var plateau = document.getElementById("plateau");
      var id = play["id_game"];
      var turn=false;
      checkRound();
      createBtnsBoard(plateau);
      createBlockBoard(plateau);

      function createBlockBoard(plateau){
        let k = 0;
        for (let i=0; i<6; i++){
            let div = document.createElement("div");
            for (let j=0; j<7; j++){
                let bouton = document.createElement("button");
                bouton.setAttribute("id", i+""+j+"");
                bouton.setAttribute("class", "block");
                if (game[k] == "Y"){
                    bouton.style.backgroundColor = "yellow";
                }
                else if (game[k] == "R"){
                    bouton.style.backgroundColor = "red";
                }
                else{
                    bouton.style.backgroundColor = "lightgray";
                }
                k+=1;
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
            if (!turn)
              bouton.style.backgroundColor = round;
          };

          bouton.onclick = function(){
              if (!turn){
                  throwToken(j, round);
                  saveMap();
              }
              if (checkVictory(round)){
                  let post = $.post("ajax/victoire.php", {id_game: id, round: round});
                  post.done(function(data){
                      let comment = document.getElementById("commentaires");
                      let p = document.createElement("p");
                      p.innerHTML = "la partie est terminée, victoire des "+data;
                      comment.appendChild(p);
                      let btns = document.getElementsByClassName("case");
                      for (let i=0; i<btns.length; i++){
                          btns[i].disabled = true;
                      }

                  });
                  console.log("victoire des : "+round);
              }
          };

          bouton.onmouseleave = function(){
            bouton.style.backgroundColor = "white";
          }
          div.appendChild(bouton);
        }
        plateau.appendChild(div);
      }

      function checkRound(){
          if ((player1 == player && round == "yellow")||(player2 == player && round == "red")){
              turn = true;
              let comment = document.getElementById("commentaires");
              let p = document.createElement("p");
              p.innerHTML = "C'est au tour de l'adversaire de jouer (couleur : " + round + ")";
              comment.appendChild(p);
          }
      }
      function changeRound(){
        if (round == "red")
            round = "yellow";
        else
          round = "red";
      }

      function getRoundLetter(){
        if (round == "red")
            return "R";
        else
            return "Y";
      }

      function saveMap(){
          let buttons = document.getElementsByClassName("block");
          let newGame = "";
          for (let i=0; i<6; i++){
              for (let j=0; j<7; j++){
                  if (getColor(i, j) == "red"){
                      newGame += "R";
                  }
                  else if (getColor(i, j) == "yellow"){
                      newGame += "Y";
                  }
                  else{
                    newGame += "_";
                  }
              }
          }
          changeRound();
          let r = getRoundLetter();

          let post = $.post("ajax/traitementJeu.php", {id_game : JSON.stringify(id), colors : JSON.stringify(newGame), round:JSON.stringify(r)});
          post.done(function(data){
            console.log("done");
            console.log(data);
          });

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
    }


});
