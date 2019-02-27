$(document).ready(function(){

	// ==============================================================*/
	// Remove loading class to "note" document is ready
	// ==============================================================*/

	$('body').removeClass('loading');

	// ==============================================================*/
	// Create node and insert SVG file after the body
	// ==============================================================*/

	// Remove local file and uncomment below once on the dev server

	$.get("./img/spritemap.svg", function(data) {
	  var spritemapDiv = document.createElement("div");
	  spritemapDiv.innerHTML = new XMLSerializer().serializeToString(data.documentElement);
	  spritemapDiv.style.display = "none";
	  document.body.insertBefore(spritemapDiv, document.body.childNodes[0]);
	});

})
//# sourceMappingURL=maps/scripts.js.map
