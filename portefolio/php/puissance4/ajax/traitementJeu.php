<?php
  $dbname="../../../base/puissance4/base.db";
  $base = new PDO("sqlite:$dbname");
  $id = $_POST["id_game"];
  $colors = $_POST["colors"];
  $round = $_POST["round"];
  $request = "UPDATE puissance4 SET colors = $colors, round=$round WHERE id_game=$id";
  $res = $base->exec($request);
  echo $res;
?>
