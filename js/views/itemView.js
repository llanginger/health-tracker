var app = app || {};
console.log("foodItemView here")

app.FoodItemView = Backbone.View.extend({

  el: "#food-items",

  // template: _.template( $("#food-items").html() ),

  events: {
    "click" : "addFoodToLog"

  },

  initialize: function() {
    _.bindAll(this,"render");
    console.log(this.model.attributes)
    this.render;
    this.listenTo( this.model, "change", this.render );
    this.listenTo( this.model, "destroy", this.remove );
  },

  render: function() {
    console.log(this.el)
    console.log(this.model.attributes)
    // this.$el.html( this.template( this.model.attributes ) );
    // this.paintFoodItem();
    return this;
  },


  addFoodToLog: function( e ) {
    console.log("add food call triggered");
    console.log( e.target )
    console.log( this.$el )
  },


})

console.log("after food item view")
