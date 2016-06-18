var app = app || {};

app.LogView = Backbone.View.extend({

  tagName: "div",

  className: "logged-item",

  template: _.template( $("#log-template").html() ),

  events: {
    "click .delete-log-item": "deleteThis"
  },

  initialize: function() {

    this.render();

    this.listenTo( this.model, "change", this.render );
    this.listenTo( this.model, "destroy", this.remove );

  },

  render: function() {

    console.log("logview something happened")

    this.$el.html( this.template( this.model.attributes ) );

    this.calculateCalories();

    return this;
  },

  calculateCalories: function() {
    var calorieArray = app.FoodLog.pluck("calories");
    var totalCalories = 0;
    var addCalories = $.each(calorieArray, function() {
      totalCalories += this;
    })
    $("#total-cals").html("Total calories consumed: <span class='accent-color'>" + Math.round(totalCalories) + "</span>!");
  },

  deleteThis: function() {
    this.model.destroy();
    this.$el.remove();
  }
})
