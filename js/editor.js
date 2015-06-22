function initEditor(textarea){
    var editor = CodeMirror.fromTextArea(document.getElementById(textarea), {
        lineNumbers: true,
        extraKeys: {"Ctrl-Space": "autocomplete"},
        mode: {name: "javascript", globalVars: true},
        theme: "ambiance" 
      });
}