var app = app || {};

var FoodLog = Backbone.Firebase.Collection.extend({
  model: app.FoodItem,
  url: "https://glowing-inferno-6853.firebaseIO.com",


});

app.FoodLog = new FoodLog();
