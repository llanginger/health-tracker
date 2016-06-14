var app = app || {};
console.log("foodItemView here")

app.FoodItemView = Backbone.View.extend({

  el: "#item-div",

  // template: _.template( $("#temp-template").html() ),

  events: {
    "click option" : "selectFoodToLog",
    "click .main-ate-that": "addFoodToLog"

  },

  initialize: function() {
    _.bindAll(this,"render");
    // console.log(this.model.attributes)
    // console.log(this.$el);
    // this.render;

    this.$select = $("#select-food-item");
    this.listenTo( this.model, "change", this.render );
    this.listenTo( this.model, "destroy", this.remove );
  },

  remove: function() {

  },

  render: function() {

    this.$select.append("<option id='" +
        this.model.get("id") + "'>" +
        this.model.get("title") + ", by: " +
        this.model.get("brand") + ".  " +
        this.model.get("calories") + " calories!" +
      "</option>");



    return this;
  },



  addFoodToLog: function( e ) {



    console.log($("#select-food-item option:selected").attr("id"))

    console.log("add food call triggered");

    var id = $("#select-food-item option:selected").attr("id");

    console.log(app.FoodItems.get(id).toJSON());

    $("#food-log").append("<div>" + app.FoodItems.get(id).get("calories") + "</div>")
    // console.log( e.target )
    // console.log( this.$el )
  },


})

console.log("after food item view")
