$(document).ready(function(){$("body").removeClass("loading"),$.get("./img/spritemap.svg",function(e){var n=document.createElement("div");n.innerHTML=(new XMLSerializer).serializeToString(e.documentElement),n.style.display="none",document.body.insertBefore(n,document.body.childNodes[0])})});
//# sourceMappingURL=maps/scripts-min.js.map
