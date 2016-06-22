var app = app || {};

// Collection of FoodItem models, saved to localStorage
var FoodItems = Backbone.Collection.extend({
  model: app.FoodItem,
  localStorage: new Backbone.LocalStorage("food-items-local"),
  // url: "https://glowing-inferno-6853.firebaseIO.com/tempList",
})

app.FoodItems = new FoodItems();

// Convenience collection to make it easier to bulk-empty firebase data when I need to
var MasterCollection = Backbone.Firebase.Collection.extend({
  url: "https://glowing-inferno-6853.firebaseIO.com",
})

app.MasterCollection = new MasterCollection();
