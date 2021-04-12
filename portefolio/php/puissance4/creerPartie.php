<?php
    session_start();
    $dbname="../../base/puissance4/base.db";
    $base = new PDO("sqlite:$dbname");
    $nb = rand(0,1);
    $tab = array("R", "Y");
    $c = $tab[rand(0,1)];
    $request = "SELECT * FROM players WHERE pseudo = '".$_SESSION['pseudo']."'";
    $res = $base->query($request);
    $id = $res->fetch(PDO::FETCH_ASSOC)["id_player"];

    $empty = "";
    for ($i=0; $i<42; $i++){
      $empty .= "_";
    }
    $request = "INSERT INTO puissance4(id_player".($nb+1).", round, colors) VALUES (".$id.", '".$c."', '".$empty."')";
    $res = $base->exec($request);
    header("Location:gestionPartie.php");
?>
