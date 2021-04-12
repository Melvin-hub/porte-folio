<?php
  session_start();
  include_once("../../base/puissance4/create_base.inc");
  if (isset($_POST["pseudo"]) && isset($_POST["password"])){
    $dbname="../../base/puissance4/base.db";
    $base = new PDO("sqlite:$dbname");
    $request = "SELECT pseudo FROM players where pseudo= :entry_pseudo";
    $res = $base->prepare($request);
    $res->execute(array(
        ":entry_pseudo" => $_POST["pseudo"]
    ));
    if ($user = $res->fetch()){ //si un résultat correspond, alors le pseudo existe
        $_SESSION["error"] = true;
        $res->closeCursor();
    }
    else{
        $request = "INSERT INTO players(pseudo, password) VALUES (:entry_pseudo, :entry_password)";
        $res = $base->prepare($request);
        $res->execute(array(
            ":entry_pseudo" => $_POST["pseudo"],
            ":entry_password" => password_hash($_POST["password"], PASSWORD_DEFAULT)
        ));
        $res->closeCursor();
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
        <form method="post" action="inscription.php">
            <legend class="form">Inscription</legend>
            <input id="pseudo" name="pseudo" type="text" maxlength="50" placeholder="pseudo" required/><br/>
            <input type="password" name="password" maxlength="50" placeholder="mot de passe" required/><br/>
            <input type="submit" value="valider">
            <?php if (isset($_SESSION["error"])){
                unset($_SESSION["error"]);
                echo "<p>Le pseudo est déjà utilisé, si vous souhaitez vous connecter, cliquez sur ce lien :<br/>
                <a href=\"connexion.php\">se connecter</a></p>";
            }
            ?>
        </form>
    </body>
</html>
