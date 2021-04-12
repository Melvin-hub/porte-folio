<?php
  $dbname="../../base/puissance4/base.db";
  $base = new PDO("sqlite:$dbname");
  $request = "SELECT * FROM puissance4";
  $res = $base->query($request);

  while ($row = $res->fetch(PDO::FETCH_ASSOC)){
    $color = ($row['round'] == "R")?("red"):("yellow");
    $p1 = $row["id_player1"];
    $p2 = $row["id_player2"];
    $req1 = "SELECT pseudo FROM players WHERE id_player=$p1";
    $req2 = "SELECT pseudo FROM players WHERE id_player=$p2";
    $res1 = $base->query($req1);
    $res2 = $base->query($req2);

    $pseudo1 = ($res1)?($res1->fetch(PDO::FETCH_ASSOC)["pseudo"]):("");
    $pseudo2 = ($res2)?($res2->fetch(PDO::FETCH_ASSOC)["pseudo"]):("");
    echo "<tr><td>".$row['id_game']."</td><td>".$pseudo1."</td><td>".$pseudo2."</td><td class=\"$color\"></td><td><button id=\"".$row['id_game']."\">jouer</button></td></tr>";
  }

?>
