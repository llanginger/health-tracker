var app = app || {};

app.LogView = Backbone.View.extend({

  el: "#food-log",

  events: {

  },

  initialize: function() {

    this.render();

    this.listenTo( this.model, "change", this.render );
    this.listenTo( this.model, "destroy", this.remove );

  },

  render: function() {

    console.log("logview something happened")

    this.$el.append("<div class='logged-item'>" +
    this.model.get("title") + ", by: " + this.model.get("brand") + ".  " +
    this.model.get("calories") + " calories on " +
    this.model.get("date") +
    "</div>");

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

  }
})
