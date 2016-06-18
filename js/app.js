var app = app || {};
var ENTER_KEY = 13;


// Check to see if user has visited site before - if not, display tutorial
var Store = window.Locally.Store,
    store = new Store();

if (!store.get("wasHere")) {
  $("#overlay").removeClass("hidden");
  $("#overlay-info").removeClass("hidden");
  store.set("wasHere", true)
}

// Instantiate APP!

$(function() {
  new app.AppView();

  window.addEventListener("load",function() {
	// Set a timeout...
	setTimeout(function(){
		// Hide the address bar!
		window.scrollTo(0, 1);
	}, 0);
});


});
