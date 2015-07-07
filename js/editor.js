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

	newTab(guid(), "test.js","function test(){test++;}", "javascript");
});

function newTab(fileUUID, fileName, content, language){
	//Find next free id
	var tabID = editors.length;
	for (var i = editors.length ; i >= 0; i--)
		if(!editors[i])
			tabID = i;

	//Create the HTML elements
	$tabHead.append('<div class="tab active" data-editor-id="'+tabID+'" onClick="setActiveEditor($(this).attr(\'data-editor-id\'))"></div>');
	$tabHead.find( "> div[data-editor-id="+tabID+"]" ).html(fileName + '<button class="tab_close" onClick="closeTab($(this).parent().attr(\'data-editor-id\'))"></button>')

	$editorSection.append('<div data-editor-id="'+tabID+'" id="editor_'+tabID+'" class="editor active"></div>');

	//Create CodeMirror
	var newEditor = CodeMirror(document.getElementById("editor_" + tabID), {
	    lineNumbers: true,
	    extraKeys: editorOptions.extraKeys,
	    mode: language,
	    theme: editorOptions.theme
    });

	//Push additionally var in the CodeMirror instance
	newEditor.name = fileName;
	newEditor.language = language;
    newEditor.isSaved = true;
    newEditor.fileUUID = fileUUID;
    newEditor.tabID = tabID;

    //CodeMirror events
	newEditor.on("change", function(cm, change) {
		if(cm.isSaved){
			cm.isSaved = false;
			$("#tabHead div.tab[data-editor-id='"+cm.tabID+"']").addClass("unsaved");
		}
	});

	editors[tabID] = newEditor;
	
	setActiveEditor(tabID);
	
}

function setActiveEditor(tabID){
	if(!editors[tabID])
		for (var i = 0 ; i < editors.length; i++)
			if(editors[i])
				tabID = i;

	if (activeEditor != tabID && editors[tabID]){
		$("#tabHead div.tab[data-editor-id='"+activeEditor+"']").removeClass("active");
		$("#editor_section div.editor[data-editor-id='"+activeEditor+"']").removeClass("active");
		
		lastActiveEditor = activeEditor;
		activeEditor = tabID;

		$("#tabHead div.tab[data-editor-id='"+activeEditor+"']").addClass("active");
		$("#editor_section div.editor[data-editor-id='"+activeEditor+"']").addClass("active");
	}
}


function closeTab(tabID){
	editors[tabID] = null;
	$("#tabHead div.tab[data-editor-id='"+tabID+"']").remove();
	$("#editor_section div.editor[data-editor-id='"+tabID+"']").remove();
	
	if(activeEditor == tabID)
		setActiveEditor(lastActiveEditor);
}

function changeTabName(fileUUID){

}

function getContentFormTab(fileUUID){

}

function saveTab(tabID){

}

function leftTab(){
	var $prevTab = $("#tabHead div.tab[data-editor-id='"+activeEditor+"']").prev();
	if(!$prevTab.hasClass("tab"))
		$prevTab = $("#tabHead div.tab:last-of-type");

	setActiveEditor($prevTab.attr('data-editor-id'));
}

function rightTab(){
	var $nextTab = $("#tabHead div.tab[data-editor-id='"+activeEditor+"']").next();
	if(!$nextTab.hasClass("tab"))
		$nextTab = $("#tabHead div.tab:first-of-type");
	
	setActiveEditor($nextTab.attr('data-editor-id'));
}

function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}