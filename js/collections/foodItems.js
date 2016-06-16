var app = app || {};

var FoodItems = Backbone.Firebase.Collection.extend({
  model: app.FoodItem,
  url: "https://glowing-inferno-6853.firebaseIO.com/tempList",
})

app.FoodItems = new FoodItems();


var MasterCollection = Backbone.Firebase.Collection.extend({
  url: "https://glowing-inferno-6853.firebaseIO.com",
})

app.MasterCollection = new MasterCollection();
