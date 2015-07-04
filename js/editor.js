var editors = new Array(0);
var activeEditor = 0;
var $tabHead;
var $editorSection;

$(function (){
	$tabHead = $("#tabHead");
	$editorSection = $("#editor_section");

	newTab("test.js", "javascript", "function test(){test++;}");
});

function newTab(fileName, language, content){
	var id = editors.length;
	var newEditor = new Object();
	newEditor.name = fileName;
	newEditor.language = language;
	newEditor.content = content;

	$tabHead.append('<div class="tab" data-editor-id="'+id+'" onClick="setActiveEditor($(this).attr(\'data-editor-id\'))"></div>');
	$tabHead.find( "> div[data-editor-id="+id+"]" ).html(fileName + '<button class="tab_close" onClick="closeTab(this)">x</button>')

	$editorSection.append('<div data-editor-id="'+id+'" id="editor_'+id+'" class="editor"></div>');

	setActiveEditor(id);

	newEditor.editor = CodeMirror(document.getElementById("editor_" + id), {
	    lineNumbers: true,
	    extraKeys: {"Ctrl-Space": "autocomplete"},
	    mode: language,
	    theme: "ambiance"
    });

	editors[id] = newEditor;
}

function setActiveEditor(id){
	$("#tabHead div.tab[data-editor-id='"+activeEditor+"']").removeClass("active");
	$("#editor_section div.editor[data-editor-id='"+activeEditor+"']").removeClass("active");
	
	activeEditor = id;

	$("#tabHead div.tab[data-editor-id='"+activeEditor+"']").addClass("active");
	$("#editor_section div.editor[data-editor-id='"+activeEditor+"']").addClass("active");
}


function closeTab(tab){
	var id = $(tab).parent().attr("data-editor-id");
	alert(id);
}