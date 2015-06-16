<?php
$requestedTask = $_GET['task'];
if(isset($_GET['task'])){
 $requestedTask = $_GET['task'];
 if(file_exists("php/handler/" . $requestedTask . ".handler.php")){
   include("php/handler/" . $requestedTask) . ".handler.php";

 }else{
   echo "404 Datei existiert nicht";
   echo "Requested:";
   echo "php/handler/" . $requestedTask . ".handler.php";
 }
}else{
 echo "404 Task nicht übergeben";
}
?>
