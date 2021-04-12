<?php session_start();?>
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8" />
        <link rel="stylesheet" href="../../css/puissance4/index.css"/>
        <title>Apprentissage</title>
    </head>
    <body>
        <nav>
            <?php
            $a = "<a href='../../index.php'>Retour au porte-folio</a>";
            if (isset($_SESSION["pseudo"])){

                echo "<p class=\"navig\"><a href=\"deconnexion.php\">Se déconnecter</a><br/>$a</br></br>Bienvenue ".$_SESSION["pseudo"]." !</p>";

            }else{
              echo "<p class=\"navig\"><a href=\"connexion.php\">Se connecter</a><br/>$a</p>";
            }?>

            <p class="navig"><a href="#regles">règles du jeu</a></br><img class="logo" src="../../images/logo.jpg"/></p>
            <p class="navig"><a href="gestionPartie.php">les parties</a></p>
        </nav>
        <p class="puissance4">PUISSANCE4</p>
        <div class="divRegles">
          <p class="regles" id="regles">Puissance 4 est un jeu de société qui se joue à 2 joueurs. Chacun leur tour, les joueurs font tomber un jeton de leur couleur.<br/>
          Celui qui réussit le premier à aligner 4 jetons de sa couleur à l'horizontal, à la verticale ou bien en diagonale remporte la partie
          </p>
        </div>
    </body>
</html>
