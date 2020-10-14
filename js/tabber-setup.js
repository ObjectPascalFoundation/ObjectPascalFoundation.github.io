$( document ).ready(function() {

  var tabberArgs = {
	  classMain : "tabber_members",
	  storeSelected : false,
	  classMainLive :"tabber_members_live",
	  classTab : "tabbertab_members",
	  classTabDefault:"tabbertab_membersdefault",
	  activeProperty: "activetab_members",
	  classNav:"tabbernav_members",
	  classNavActive : "tabbermembers_active"
  };

  tempObj = new tabberObj(tabberArgs);

  var divs = document.getElementsByTagName("div");
  var i;
  for (i=0; i < divs.length; i++) {
    
    /* Is this DIV the correct class? */
    if (divs[i].className &&
	divs[i].className.match(tempObj.REclassMain)) {
      
      /* Now tabify the DIV */
      tabberArgs.div = divs[i];
      divs[i].tabber = new tabberObj(tabberArgs);
    }
  }
});