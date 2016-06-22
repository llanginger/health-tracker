var app = app || {};

// Food Log's collection, hooked up to Firebase for persistent data
var FoodLog = Backbone.Firebase.Collection.extend({
  model: app.FoodItem,
  url: "https://glowing-inferno-6853.firebaseIO.com/foodLog",
});

app.FoodLog = new FoodLog();
