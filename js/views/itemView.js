var app = app || {};
console.log("foodItemView here")

app.FoodItemView = Backbone.View.extend({

  el: "#item-div",

  // template: _.template( $("#food-items").html() ),

  events: {
    "click .food-item" : "addFoodToLog"

  },

  initialize: function() {
    _.bindAll(this,"render");
    // console.log(this.model.attributes)
    // console.log(this.$el);
    // this.render;
    this.listenTo( this.model, "change", this.render );
    this.listenTo( this.model, "destroy", this.remove );
  },

  render: function() {
    console.log(this.$el)
    // console.log(this.model.attributes)
    // this.$el.html( this.template( this.model.attributes ) );

    this.$el.append("<div class='food-item'><ul>" +
      "<li>" + "Thing you ate: " + this.model.get("title") + "</li>" +
      "<li>" + "The company that made that nonsense: " + this.model.get("brand") + "</li>" +
      "<li>" + "How many calories did that thing have? " + this.model.get("calories") + "</li>" +
      "<li>" + "When did you eat it? " + this.model.get("date") + "</li>" +
      // "<li>" + "No, like, specifically? " + this.model.get("time") + "</li>" + 
      "</ul>" +
      "<button class='ate-this'>I ate this!</button>")
    return this;
  },


  addFoodToLog: function( e ) {
    console.log("add food call triggered");
    console.log( e.target )
    console.log( this.$el )
  },


})

console.log("after food item view")
