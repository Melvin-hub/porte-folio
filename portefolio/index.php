<?php
session_start();
session_destroy();
?>
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8" />
        <link rel="stylesheet" href="css/slider.css"/>

        <title>Porte-Folio</title>
    </head>

    <body>
    <!-- Commentaire !-->
    <nav>
      <div id="navig_close">
        <div id="navig">
          <ul>
            <li><a href="#presentation">à propos de moi</a></li>
            <li><a id="linkProjets" href="#projets">mes projets</a></li>
            <li><a href="#competences">mes compétences</a></li>
            <li><a href="#contact">me contacter</a></li>
          </ul>
            <a href="#navig" class="ouvrir">Menu</a>
            <a href="#navig_close" class="fermer">Fermer</a>
        </div>
      </div>
    </nav>
    <div class="nom">
        <p><a id="nom" href="#presentation">MELVIN BEAUSSART</a></p>
    </div>

    <div id="presentation">
        <h1>A propos de moi...</h1>
        <p>Je suis <span id="prenom">Melvin Beaussart</span>, étudiant en <span id="formation">master d'informatique</span> à l'université Jean Perrin de Lens.<br/>
          Je cherche à développer mes compétences dans le domaine du <span id="jeux">jeu-vidéo</span> et dans<br/>
          la <span id="web">création de sites Web</span>.</br>
        Je vois dans l'informatique la possibilité de créer ce qu'il me plaît,<br/> tout en repoussant les limites de mes connaissances jour après jour <br/>
        afin d'y parvenir.
      </p>
    </div>


    <div class="projets" id="projets">
      <h1>Mes projets</h1>
      <div class="container">
        <div class="slider">
          <div class="theCube" id="theCube">
            <div class="slide">
              <a href="php/puissance4"><img id="gauche" class="img" src="../images/puissance4.png"/></a>
              <p><a href="php/puissance4"><span id="span1">Projet</span><span id="span2">Puissance 4</span></a></p>
            </div>

            <div class="slide">
              <a href="php/raytracer.php"><img id="devant" class="img" src="../images/raytracer.png"/></a>
              <p><a id="linkRaytracer" href="php/raytracer.php">Raytracer</a></p>
            </div>
            <div class="slide">
              <a href="project4.php"><img id="droite" class="img" src="../images/4.png"/></a>
              <p>projet 4</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!--<div class="competences" id="competences">
        <img src="images/langages/atom.png"/>
        <img src="images/langages/cpp.png"/>
        <img src="images/langages/css.png"/>
        <img src="images/langages/html.png"/>
        <img src="images/langages/java.png"/>
        <img src="images/langages/js.png"/>
        <img src="images/langages/php.png"/>
        <img src="images/langages/powershell.png"/>
        <img src="images/langages/python.png"/>
        <img src="images/langages/shell.png"/>
        <img src="images/langages/sql.png"/>
        </div>
    //-->

    <footer>
        <?php include("php/footer.inc");?>
    </footer>
    </body>
</html>
