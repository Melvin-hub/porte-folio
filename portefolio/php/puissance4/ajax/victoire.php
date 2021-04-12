<?php
session_start();
$dbname="../../../base/puissance4/base.db";
$base = new PDO("sqlite:$dbname");
$request = "SELECT * FROM puissance4 WHERE id_game=$_POST['id_game']";
$res = $base->query($request);
$row = $res->fetch(PDO::FETCH_ASSOC);

$nb = 'id_player'.($_POST['round']=="red")?("1"):("2");
$request = "SELECT pseudo FROM players WHERE id_player=$row[$nb]";

$winner = $base->query($request)->fetch(PDO::FETCH_ASSOC)["pseudo"];
echo "$winner";

$request = "INSERT INTO historique VALUES ($row['id_game'], $row['id_player1'], $row['id_player2'], $_POST['round'])";
$base->exec($request);

$request = "DELETE FROM puissance4 WHERE id_game=$_POST['id_game']";
$base->exec($request);
?>
