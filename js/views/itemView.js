var app = app || {};
console.log("foodItemView here")

app.FoodItemView = Backbone.View.extend({

  el: "#item-div",

  // template: _.template( $("#temp-template").html() ),

  events: {
    "click option" : "selectFoodToLog",

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






})

console.log("after food item view")
