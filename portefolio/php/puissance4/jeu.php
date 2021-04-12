<?php
  session_start();
  if (!isset($_GET["id_game"])){
    header("Location:gestionPartie.php");
  }else{
    $_SESSION["id_game"] = $_GET["id_game"];
    unset($_GET["id_game"]);
  }
?>
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8" />
        <link rel="stylesheet" href="../../css/puissance4/plateau.css"/>

        <title>Apprentissage</title>
    </head>
    <body>
      <div id="plateau">
      </div>
      <div id="commentaires">
      </div>
      <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.js"></script>
      <script src="../../js/puissance4/jeu.js"></script>
    </body>
</html>
