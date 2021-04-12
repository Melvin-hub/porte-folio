<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8" />
        <link rel="stylesheet" href="../css/editor.css"/>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.js"></script>
        <script src="../js/map.js"></script>
        <script src="../js/game.js"></script>
        <script src="../js/editor0.js"></script>
        <title>Casse Briques Ultimate</title>
    </head>
    <body>
      <!--  faire éditeur de niveaux casse brique (joueurs peuvent créer leurs niveaux, en essayer d'autres, stockés dans une bdd
      possibiliter de sauvegarder sur le site, ou de les télécharger, et d'en importer (faire checker de syntaxe de niveaux)) !-->

      <div class="container-canvas">
          <canvas id="canvas" class="canvas" height="608" width="576">

          </canvas>
      </div>
      <p class="pages" id="pages"></p>
      <div class="commands" id="commands">
        <button id="insertMap">insérer une carte</button>
        <button id="destroyMap">supprimer la carte</button>
        <button id="destroyCampaign">supprimer toute la campagne</button>
      </div>
      <div class="buttons" id="buttons">
        <button id="downloadMap">Télécharger la carte</button>
        <button id="downloadCampaign">Télécharger la campagne</button>
      </div>



      <footer>
      </footer>
    </body>
</html>
