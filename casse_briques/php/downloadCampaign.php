<?php
  if (isset($_POST["name"]) && !isset($_POST["destroy"])){
    $name = $_POST["name"];
    $zipName = "files/".$name.".zip";
    $map = json_decode($_POST["map"]);

    $zip = new ZipArchive();
    $zip->open($zipName, ZipArchive::CREATE);
    for ($i=0; $i<count($map); $i++){
        $txtName = "files/".$i.".txt";
        $file = fopen($txtName, 'a');
        fputs($file, json_encode($map[$i]));
        fclose($file);
        $zip->addFile($txtName);
    }
    $zip->close();
    echo "$zipName";
    for ($i=0; $i<count($map); $i++){
        unlink("files/".$i.".txt");
    }
  }
  else if (isset($_POST["destroy"])){
      unlink($_POST["name"]));
  }
?>
