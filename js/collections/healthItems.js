var app = app || {};

var HealthItems = Backbone.Firebase.Collection.extend({
  model: app.HealthItem,
  url: "https://glowing-inferno-6853.firebaseIO.com",

})
