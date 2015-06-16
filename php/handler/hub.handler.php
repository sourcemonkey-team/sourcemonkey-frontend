<?php
include("php/template-engine/template.class.php");

$tpl = new Template();
$tpl->load("hub.tpl");
$tpl->display();
?>