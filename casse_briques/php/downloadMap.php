<?php
  if (isset($_POST["name"]) && !isset($_POST["destroy"])){
      $name = $_POST["name"];
      $txtName = "files/".$name.".txt";
      $zipName = "files/".$name.".zip";

      $map = $_POST["map"]; /*map sous forme de chaîne de caractère*/
      $file = fopen($txtName,'a');
      fputs($file, $map);
      fclose($file);


      $zip = new ZipArchive();
      if ($zip->open($zipName, ZipArchive::CREATE)){
        $zip->addFile($txtName);
        $zip->close();
        unlink($txtName);
        echo "$zipName";
      }
  }
  else if (isset($_POST["destroy"])){
    unlink($_POST["name"]);
  }
?>
