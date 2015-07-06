var editors = new Array(0);

var activeEditor;
var lastActiveEditor = 0;

//Configuration
var editorOptions = {
	theme : "ambiance",
	extraKeys: {"Ctrl-Space": "autocomplete"}
}

//Static DOM elements
var $tabHead;
var $editorSection;

$(function (){
	$tabHead = $("#tabHead");
	$editorSection = $("#editor_section");

	newTab("test.js", "javascript", "function test(){test++;}");
});

function newTab(fileName, language, content){
	//Find next free id
	var id = editors.length;
	for (var i = editors.length ; i >= 0; i--)
		if(!editors[i])
			id = i;

	//Create the HTML elements
	$tabHead.append('<div class="tab active" data-editor-id="'+id+'" onClick="setActiveEditor($(this).attr(\'data-editor-id\'))"></div>');
	$tabHead.find( "> div[data-editor-id="+id+"]" ).html(fileName + '<button class="tab_close" onClick="closeTab(this)">x</button>')

	$editorSection.append('<div data-editor-id="'+id+'" id="editor_'+id+'" class="editor active"></div>');

	//Create CodeMirror
	var newEditor = CodeMirror(document.getElementById("editor_" + id), {
	    lineNumbers: true,
	    extraKeys: editorOptions.extraKeys,
	    mode: language,
	    theme: editorOptions.theme
    });

	//Push additionally var in the CodeMirror instance
	newEditor.name = fileName;
	newEditor.language = language;
    newEditor.isSaved = true;

    //CodeMirror events
	newEditor.on("change", function(cm, change) {
		cm.isSaved = false;
	});

	editors[id] = newEditor;
	
	setActiveEditor(id);
	
}

function setActiveEditor(id){
	if (activeEditor != id && editors[id]){
		$("#tabHead div.tab[data-editor-id='"+activeEditor+"']").removeClass("active");
		$("#editor_section div.editor[data-editor-id='"+activeEditor+"']").removeClass("active");
		
		lastActiveEditor = activeEditor;
		activeEditor = id;

		$("#tabHead div.tab[data-editor-id='"+activeEditor+"']").addClass("active");
		$("#editor_section div.editor[data-editor-id='"+activeEditor+"']").addClass("active");
	}
}


function closeTab(tab){
	var id = $(tab).parent().attr("data-editor-id");
	editors[id] = null;
	$("#tabHead div.tab[data-editor-id='"+id+"']").remove();
	$("#editor_section div.editor[data-editor-id='"+id+"']").remove();
	
	if(activeEditor != id)
		setActiveEditor(lastActiveEditor != id ? lastActiveEditor : 0);
}