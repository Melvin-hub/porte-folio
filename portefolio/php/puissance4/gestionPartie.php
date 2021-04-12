<?php session_start();
if (!isset($_SESSION["pseudo"])){
    $_SESSION["previousSite"] = "gestionPartie.php";
    header("Location:connexion.php");
}
?>

<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8" />
        <link rel="stylesheet" href="../../css/puissance4/gestionPartie.css"/>
        <title>Apprentissage</title>
    </head>

    <body>
        <p><a href="index.php">retour à l'index</a></p>
        <table>
          <th>Partie Numéro</th>
          <th>Joueur Rouge</th>
          <th>Joueur Jaune</th>
          <th>Tour de la couleur</th>
          <?php
            include("parties.php");
          ?>
        </table>
        <p><a href="creerPartie.php">créer une partie</a></p>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.js"></script>
        <script src="../../js/puissance4/entrerPartie.js"></script>
    </body>
</html>
