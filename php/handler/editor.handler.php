<?php
include("php/template-engine/template.class.php");

$tpl = new Template();
$tpl->load("editor.tpl");
$tpl->display();
?>