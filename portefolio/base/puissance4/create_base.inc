<?php
$dbname="../../base/puissance4/base.db";
$base = new PDO("sqlite:$dbname");
$query =
"
CREATE TABLE IF NOT EXISTS admins(
    id_admin INTEGER PRIMARY KEY AUTOINCREMENT,
    pseudo VARCHAR(50),
    password VARCHAR(50)
);

CREATE TABLE IF NOT EXISTS adminAccounts(
    id_account INTEGER PRIMARY KEY AUTOINCREMENT,
    id_player INTEGER REFERENCES players(id_player),
    id_admin INTEGER REFERENCES admins(id_admin)
);

CREATE TABLE IF NOT EXISTS players(
    id_player INTEGER PRIMARY KEY AUTOINCREMENT,
    pseudo VARCHAR(50),
    password  VARCHAR(50)
);

CREATE TABLE IF NOT EXISTS puissance4(
    id_game INTEGER PRIMARY KEY AUTOINCREMENT,
    /*penser à mettre la date de la game*/
    id_player1 INTEGER REFERENCES players(id_player), /*1 = Rouge, 2=Jaune*/
    id_player2 INTEGER REFERENCES players(id_player),
    round CHAR(1),
    colors CHAR(42) /*R pour rouge, Y pour jaune, _ pour rien*/

);

CREATE TABLE IF NOT EXISTS historique(
    id_game INTEGER,
    id_player1 INTEGER REFERENCES players(id_player),
    id_player2 INTEGER REFERENCES players(id_player),
    winner VARCHAR(6) /*on stocke la couleur*/
);
";
$res = $base->exec($query);
?>
