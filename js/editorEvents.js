var isMetaKey1 = false;
var isMetaKey1Code = 16;

var isMetaKey2 = false;
var isMetaKey2Code = 18;

$(".maincontent").keydown(function(e) {
	if(!isMetaKey1)
	    if(e.keyCode == isMetaKey1Code) 
	    	isMetaKey1 = true;
}).keyup(function(e) {
    console.log("key up with keyCode:" + e.keyCode);
	if(isMetaKey1)
    	if(e.keyCode == isMetaKey1Code) 
    		isMetaKey1 = false;
}); 

$(".maincontent").keydown(function(e) {
	if(!isMetaKey2)
	    if(e.keyCode == isMetaKey2Code) 
	    	isMetaKey2 = true;
}).keyup(function(e) {
	if(isMetaKey2)
    	if(e.keyCode == isMetaKey2Code) 
    		isMetaKey2 = false;
}); 


$(document).keydown(function(e) {
	if(isMetaKey1){
		if(e.keyCode == 9 || e.keyCode == 39) rightTab();
		else if(e.keyCode == 37) leftTab();	
	}
});

$( "#tabHead > button.tab_new" ).click(function() {
	newTab(guid(), "test.js","function test(){test++;}", "javascript");
});