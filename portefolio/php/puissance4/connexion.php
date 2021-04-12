<?php
session_start();
include("../../base/puissance4/create_base.inc");
if (isset($_POST["pseudo"]) && isset($_POST["password"])){
  $dbname="../../base/puissance4/base.db";
  $base = new PDO("sqlite:$dbname");
  $request = "SELECT pseudo, password FROM players where pseudo=:entry_pseudo";
  $res = $base->prepare($request);
  $succes = $res->execute(array(
      ":entry_pseudo" => $_POST["pseudo"]
  ));

  if (!$succes){
      $_SESSION["error"] = true;
      $res->closeCursor();
  }
  else{
      $user = $res->fetch(PDO::FETCH_ASSOC);
      $res->closeCursor();
      if (password_verify($_POST["password"], $user["password"])){
          $_SESSION["pseudo"] = htmlentities($_POST["pseudo"]);

          if (isset($_SESSION["previousSite"])){
              $previous = $_SESSION["previousSite"];
              unset($_SESSION["previousSite"]);
              header("Location:$previous");
          }
          else {
              header("Location:index.php");
          }
      }
      else{
          $_SESSION["error"] = true;
      }

  }
}
?>

<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8" />
        <link rel="stylesheet" href="../../css/puissance4/connexion.css"/>
        <title>Apprentissage</title>
    </head>

    <body>
        <form method="post" action="connexion.php">
            <legend class="form">Connexion</legend>
            <input id="pseudo" name="pseudo" type="text" maxlength="50" placeholder="pseudo" required/><br/>
            <input type="password" name="password" maxlength="50" placeholder="mot de passe" required/><br/>
            <input type="submit" value="valider">
            <?php if (isset($_SESSION["error"])){
                unset($_SESSION["error"]);
                echo "<p>Le pseudo ou le mot de passe est incorrect</p>";
            }?>
            <p> Si vous n'êtes encore pas inscrit, <a href="inscription.php">inscrivez-vous ici</a><p>

        </form>
    </body>
</html>
