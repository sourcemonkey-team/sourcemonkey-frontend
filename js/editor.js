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

	newTab(guid(), "test.js","function hey(){\n\talert(\"Hallo World\");\n}");
});

function newTab(fileUUID, fileName, content){
	//Find next free id
	var tabID = editors.length;
	for (var i = editors.length ; i >= 0; i--)
		if(!editors[i])
			tabID = i;

	//Create the HTML elements
	$tabHead.append('<div class="tab active" data-editor-id="'+tabID+'" ></div>');
	$tabHead.find( "> div[data-editor-id="+tabID+"]" ).html(fileName + '<button class="tab_close" onClick="closeTab($(this).parent().attr(\'data-editor-id\'))"></button>')

	$editorSection.append('<div data-editor-id="'+tabID+'" id="editor_'+tabID+'" class="editor active"></div>');

	//Create CodeMirror
	var newEditor = CodeMirror(document.getElementById("editor_" + tabID), {
	    lineNumbers: true,
	    extraKeys: editorOptions.extraKeys,
	    mode: typeToMode(fileName.substring(fileName.lastIndexOf(".") + 1, fileName.length)),
	    theme: editorOptions.theme
    });

	//Push additionally var in the CodeMirror instance
	newEditor.name = fileName;
    newEditor.isSaved = true;
    newEditor.fileUUID = fileUUID;
    newEditor.tabID = tabID;

	newEditor.setValue(content);

    //CodeMirror/Tab events
	newEditor.on("change", function(cm, change) {
		if(cm.isSaved){
			cm.isSaved = false;
			$("#tabHead .tab[data-editor-id='"+cm.tabID+"']").addClass("unsaved");
		}
	});
	
	$( "#tabHead > .tab[data-editor-id="+tabID+"]" ).mousedown(function() {
		setActiveEditor($(this).attr('data-editor-id'));

		var $movingTab = $(this);
		var movingDelay = setTimeout(startMoving, 220);
		
		$(this).on("mouseup",function(){
			clearTimeout(movingDelay);
		});

		function startMoving(){
			var isMovingTab = true;
			$movingTab.css("position","absolute");
			var $spacer = $movingTab.after("<div class='spacer' style='display: inline-block; width: "+ $movingTab.width() +"px;'></div>");
			var movingTabOldPos = $movingTab.offset().left;
			var movingTabOffset = 0;
			$movingTab.on( "mousemove", function() {
				if(isMovingTab){
					if (movingTabOffset == 0) movingTabOffset = event.pageX - movingTabOldPos;
					var newXPos = event.pageX - movingTabOffset;
					$movingTab.css("left",newXPos);
					
					if($movingTab.next().length && newXPos > $movingTab.next().offset().left + 15){
						shiftTabRight(tabID);
						$(".spacer").remove();
						$movingTab.before("<div class='spacer' style='display: inline-block; width: "+ $movingTab.width() +"px;'></div>");
					}
					if($movingTab.prev().length && newXPos < $movingTab.prev().offset().left - 15){
						shiftTabLeft(tabID);
						$(".spacer").remove();
						$movingTab.before("<div class='spacer' style='display: inline-block; width: "+ $movingTab.width() +"px;'></div>");
					}
				}
			});

			$movingTab.on( "mouseout", endTabMoving);
			$movingTab.on( "mouseup", endTabMoving);

			function endTabMoving(){
				if(isMovingTab){
					$(".spacer").remove();
					$movingTab.css("position","initial");
					$movingTab.css("left","initial");
					isMovingTab = false;
					$movingTab = null;
				}
			}
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
		$("#tabHead .tab[data-editor-id='"+activeEditor+"']").removeClass("active");
		$("#editor_section div.editor[data-editor-id='"+activeEditor+"']").removeClass("active");
		
		lastActiveEditor = activeEditor;
		activeEditor = tabID;

		$("#tabHead .tab[data-editor-id='"+activeEditor+"']").addClass("active");
		$("#editor_section div.editor[data-editor-id='"+activeEditor+"']").addClass("active");

		editors[activeEditor].focus();
	}
}


function closeTab(tabID){
	editors[tabID] = null;
	$("#tabHead .tab[data-editor-id='"+tabID+"']").remove();
	$("#editor_section div.editor[data-editor-id='"+tabID+"']").remove();
	
	if(activeEditor == tabID)
		setActiveEditor(lastActiveEditor);
}

function changeTabName(tabID, name){
	var oldType = editors[tabID].name.substring(editors[tabID].name.lastIndexOf(".") + 1, editors[tabID].name.length);
	var newType = name.substring(name.lastIndexOf(".") + 1, name.length);
	
	if( oldType == newType){
		//Just change the name
		$("#tabHead .tab[data-editor-id='"+i+"']").text(name);
		editors[tabID].name = name;
	}
	else{ 
		//Reinitialise CodeMirror for changing the mode
		var oldEditor = editors[tabID];
		closeTab(tabID);
		newTab(
			oldEditor.fileUUID,
			name,
			oldEditor.getValue(),
			typeToMode(newType)
		);
	}
}

function saveTab(tabID){
	//Send data to Server
	alert(editors[tabID].getValue());

	editors[tabID].isSaved = true;
	$("#tabHead .tab[data-editor-id='"+tabID+"']").removeClass("unsaved");
}

function leftTab(){
	var $prevTab = $("#tabHead .tab[data-editor-id='"+activeEditor+"']").prev();
	if(!$prevTab.hasClass("tab"))
		$prevTab = $("#tabHead .tab:last-of-type");

	setActiveEditor($prevTab.attr('data-editor-id'));
}

function rightTab(){
	var $nextTab = $("#tabHead .tab[data-editor-id='"+activeEditor+"']").next();
	if(!$nextTab.hasClass("tab"))
		$nextTab = $("#tabHead .tab:first-of-type");
	
	setActiveEditor($nextTab.attr('data-editor-id'));
}

function shiftTabRight(tabID){
	$("#tabHead .tab[data-editor-id='"+tabID+"']").next().after($("#tabHead .tab[data-editor-id='"+tabID+"']"));
	$movingTab = $("#tabHead .tab[data-editor-id='"+tabID+"']");
}

function shiftTabLeft(tabID){
	$("#tabHead .tab[data-editor-id='"+tabID+"']").prev().before($("#tabHead .tab[data-editor-id='"+tabID+"']"));
	$movingTab = $("#tabHead .tab[data-editor-id='"+tabID+"']");
}

function tabByfileUUID (fileUUID){
	for(var i = 0; i < editors.length; i ++){
		if(editors[i] && editors[i].fileUUID == fileUUID){
			return i;
		}
	}
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

function typeToMode(type){
	switch(type) {
	    case "js":
	        return "javascript";

	    case "html":
	        return "html";

	    case "css":
	        return "css";

	    default:
	        return "htmlmixed";
	} 
}