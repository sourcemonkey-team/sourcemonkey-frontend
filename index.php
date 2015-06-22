<!DOCTYPE HTML>
<html>
 <head>
   <title>SourceMonkey</title>
   <link rel="stylesheet" href="bower_components/codemirror/lib/codemirror.css"/>
   <link rel="stylesheet" href="css/base.css"/>
   <link rel="stylesheet" href="bower_components/codemirror/addon/hint/show-hint.css">


 </head>
 <body>
   <?php
    include("partials/nav.php");
         include("partials/projectExplorer.php");
         include("partials/editor.php");
  ?>
  <script src="bower_components/jquery/dist/jquery.min.js"></script>
  <script src="bower_components/codemirror/lib/codemirror.js"></script>
<script src="bower_components/codemirror/addon/hint/show-hint.js"></script>
<script src="bower_components/codemirror/addon/hint/javascript-hint.js"></script>
<script src="bower_components/codemirror/mode/javascript/javascript.js"></script>
<script>
  var editor = CodeMirror.fromTextArea(document.getElementById("code"), {
    lineNumbers: true,
    extraKeys: {"Ctrl-Space": "autocomplete"},
    mode: {name: "javascript", globalVars: true}
  });
</script>
 </body>
</html>
