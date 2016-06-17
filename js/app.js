var app = app || {};
var ENTER_KEY = 13;

$(function() {
  new app.AppView();

  // Turn ul into options
  $(".new-option").mouseenter(function() {
    $(this).addClass("new-selected")
  }).mouseleave(function() {
    $(this).removeClass('new-selected')
  }).click(function() {
    console.log($(this).attr("id"))
  })


});

// Move app.FoodItems to localstorage so that this function will not nuke other users's models

// window.onbeforeunload = function(e) {
//   app.FoodItems.reset();
// };
