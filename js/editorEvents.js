var isStrg = false;
var isAlt = false;
var isShift = false;
var isTab = false;

var justTab = true;

$(".maincontent").keydown(function(e) {
	if(!isShift)
	    if(e.keyCode == 16) 
	    	isShift = true;
	if(!isStrg)
	    if(e.keyCode == 17) 
	    	isStrg = true;
	if(!isAlt)
	    if(e.keyCode == 18) 
	    	isAlt = true;
	if(!isTab)
	    if(e.keyCode == 9) 
	    	isTab = true;
}).keyup(function(e) {
	if(isShift)
    	if(e.keyCode == 16) 
    		isShift = false;
  	if(isStrg)
    	if(e.keyCode == 17) 
    		isStrg = false;
  	if(isAlt)
    	if(e.keyCode == 18) 
    		isAlt= false;
   	if(isTab)
    	if(e.keyCode == 9) {
    		isTab= false;
    		justTab = true;
    	}
}); 

$(document).keydown(function(e) {
	if(isShift && isTab){
		if (justTab) rightTab();
		justTab = false;
		
		if(e.keyCode == 39){
			rightTab();
		} 
		else if(e.keyCode == 37){
			leftTab();
		}
	}
	if(isAlt && !isTab){
		if(e.keyCode == 83) saveTab(activeEditor);
		else if(e.keyCode == 84) newTab(guid(), "style.css","");
	}
});



