<?php
?>

<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8" />
        <link rel="stylesheet" href="../css/raytracer.css"/>
        <title>Porte-Folio</title>
    </head>

    <body>
        <nav>
          <div id="navig_close">
            <div id="navig">
              <ul>
                <li><a href="#definition">organisation</a></li>
                <li><a href="#exemples">exemples</a></li>
                <li><a href="#difficultes">difficultés</br>rencontrées</a></li>
                <li><a href="https://gitlab.univ-artois.fr/arthur_marzinkowski/codelanceurrayons" target="_blank">lien du projet</a></li>
                <li><a href="../index.php">Retour à l'index</a></li>
              </ul>
                <a href="#navig" class="ouvrir">Menu</a>
                <a href="#navig_close" class="fermer">Fermer</a>
            </div>
          </div>
        </nav>

        <h1>Raytracer (projet collectif)</h1>
        <div class="contenu">
          <p id="definition"><img class="schema" src="../images/schemaRaytracer.png" alt="schéma explicatif du raytracer"/></p><p class="def-ray">Le raytracing est une technique de création de rendu 3D très utilisée par les cartes graphiques actuelles.
          Elle consiste à simuler une caméra qui correspond à l'oeil de l'observateur ainsi que des lumières (directionnelles ou ponctuelles),
          on y place ensuite des objets (sphères, plan, triangle) et par calcul vectoriel on reproduit une image en pseudo-3D de la scène (avec réflections et ombrages).
          La caméra envoie des rayons qui sont déviés par les objets rencontrées, ce qui permet de savoir la visibilité des objets de la scène.
        </br></br>
          Pour notre projet, nous décrivons les scènes dans des fichiers .test : on y renseigne les différentes positions des objets, lumières (et leur couleur),
          la profondeur maximale de réflexion, l'activation ou non des ombres etc...</br></br>


          Ce projet a été effectué pendant la période de confinement de 2020 avec l'université afin d'optimiser au mieux cette période difficile.</br></br>
          Je l'ai réalisé avec mes amis <span id="a1">Alexis Salvetti</span> et <span id="a2">Arthur Marzinkowski</span>. Alexis s'est principalement occupé du parseur de scènes, de l'ombrage, et des surfaces en damier.</br></br>
          Arthur s'est chargé d'optimiser le code avec divers techniques (bounding-box, multi-threading) afin de diminuer grandement le temps d'execution du programme.</br></br>
          Quant à moi, je me suis occupé de la bibliothèque mathématique, des premiers rendus 3d par le modèle de l'illumination de <a href="https://fr.wikipedia.org/wiki/Jean-Henri_Lambert" target="_blank">Johann Heinrich Lambert</a>
          ainsi que des surfaces réflechissantes par le modèle de <a href="https://en.wikipedia.org/wiki/Blinn%E2%80%93Phong_reflection_model" target="_blank">l'illumination de Blinn-Phong</a>.</br>

          La nouveauté par rapport aux autres projets de l'université est la mise en place de l'intégration continue, nous permettant de vérifier si l'ajout de nouvelles
          fonctionnalités ne provoque pas d'erreurs ailleurs.</br>
          </p>

          <div id="exemples" class="exemples">
            <figure>
              <img src="../images/raytracer1.png"/>
              <img src="../images/raytracer2.png"/>
              <img src="../images/raytracer3.png"/>
            </figure>
            <p>Quelques exemples d'images générées par notre Raytracer</p>
          </div>

          <p id="difficultes" class="difficultes">
          Comme les concepts de la 3D nous étaient nouveau, la principale difficulté était de comprendre tous ces concepts afin de les adapter à notre projet.</br>
          Ce projet nous a demandé pas mal de patience pour trouver les problèmes et les résoudre (surtout lorsque l'image rendue diffère de l'image attendue de quelques pixels !)
          </p>
        </div>
        <footer id="footer">
          <div class="lien-gitlab">
            <a href="https://gitlab.univ-artois.fr/arthur_marzinkowski/codelanceurrayons" target="_blank"><img src="../images/github.png"/></a>
            <p><a href="https://gitlab.univ-artois.fr/arthur_marzinkowski/codelanceurrayons" target="_blank"> Lien du projet </a></p>
          </div>
        </footer>
    </body>

</html>
