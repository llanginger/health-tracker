var app = app || {};

app.FoodItemView = Backbone.View.extend({

  el: ".food-item",

  events: {
    "click" : "addFoodToLog"

  },

  initialize: function() {
    this.listenTo( this.model, "change", this.render );
  },

  render: function() {

    return this;
  },

  addFoodToLog: function( e ) {
    console.log("add food call triggered");
    console.log( e.target )
    console.log( this.$el )
  },





})
