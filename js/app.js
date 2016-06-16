var app = app || {};
var ENTER_KEY = 13;

$(function() {
  new app.AppView();
});

// Move app.FoodItems to localstorage so that this function will not nuke other users's models

// window.onbeforeunload = function(e) {
//   app.FoodItems.reset();
// };
