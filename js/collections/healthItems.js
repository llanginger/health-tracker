var app = app || {};

var FoodItems = Backbone.Firebase.Collection.extend({
  model: app.FoodItem,
  url: "https://glowing-inferno-6853.firebaseIO.com",

})

app.FoodItems = new FoodItems();
