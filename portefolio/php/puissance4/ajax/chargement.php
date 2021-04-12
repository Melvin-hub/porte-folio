<?php
  session_start();
  $dbname="../../../base/puissance4/base.db";
  $base = new PDO("sqlite:$dbname");
  $request = "SELECT * FROM puissance4 WHERE id_game=:id_game";
  $res = $base->prepare($request);
  $succes = $res->execute(array(
      ":id_game" => $_SESSION["id_game"]
  ));
  if (!$succes){
      header("Location:gestionPartie.php");
  }
  $row = $res->fetch(PDO::FETCH_ASSOC);
  $res->closeCursor();
  $id_game = $_SESSION["id_game"];
  $pseudo = $_SESSION["pseudo"];
  $request = "SELECT id_player FROM players WHERE pseudo='$pseudo'";
  $id_player = $base->query($request)->fetch(PDO::FETCH_ASSOC)["id_player"];
  $fail = false;

  if (($id_player != $row["id_player1"]) && $row["id_player2"]===null){
     $request = "UPDATE puissance4 SET id_player2=$id_player WHERE id_game=$id_game";
     $base->exec($request);
  }

  else if ($row["id_player1"]===null && ($id_player != $row["id_player2"])){
    $request = "UPDATE puissance4 SET id_player1=$id_player WHERE id_game=$id_game";
    $base->exec($request);
  }

  else if (($id_player != $row["id_player1"]) && ($id_player != $row["id_player2"])){
       $fail = true;
  }

  if ($fail){
      echo "error";
  }
  else{
    $request = "SELECT * FROM puissance4 WHERE id_game=$id_game";
    $res = $base->query($request);
    $row = $res->fetch(PDO::FETCH_ASSOC);
    $res->closeCursor();
    $data = array(
        "id_player1" => $row["id_player1"],
        "id_player2" => $row["id_player2"],
        "round" => $row["round"],
        "game" => $row["colors"],
        "pseudo" => $_SESSION["pseudo"],
        "player" => $id_player,
        "id_game" => $id_game
     );

    $data = json_encode($data, JSON_FORCE_OBJECT); //attention renvoie une chaine de caractère au format JSON
    echo $data;
  }
?>
