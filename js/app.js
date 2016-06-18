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




});

(function( win ){
	var doc = win.document;

	// If there's a hash, or addEventListener is undefined, stop here
	if(!win.navigator.standalone && !location.hash && win.addEventListener ){

		//scroll to 1
		win.scrollTo( 0, 1 );
		var scrollTop = 1,
			getScrollTop = function(){
				return win.pageYOffset || doc.compatMode === "CSS1Compat" && doc.documentElement.scrollTop || doc.body.scrollTop || 0;
			},

			//reset to 0 on bodyready, if needed
			bodycheck = setInterval(function(){
				if( doc.body ){
					clearInterval( bodycheck );
					scrollTop = getScrollTop();
					win.scrollTo( 0, scrollTop === 1 ? 0 : 1 );
				}
			}, 15 );

		win.addEventListener( "load", function(){
			setTimeout(function(){
				//at load, if user hasn't scrolled more than 20 or so...
				if( getScrollTop() < 20 ){
					//reset to hide addr bar at onload
					win.scrollTo( 0, scrollTop === 1 ? 0 : 1 );
				}
			}, 0);
		}, false );
	}
})( this );
