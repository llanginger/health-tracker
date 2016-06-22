var app = app || {};

// Food Log's "view"
app.LogView = Backbone.View.extend({

  // Specify the type of element this view will create
  tagName: "div",

  // Specify a class to be added to elements this view creates
  className: "logged-item",

  // Hook it all up to the Underscore.js templating engine
  template: _.template( $("#log-template").html() ),

  // Initialize a click event and the function it calls
  events: {
    "click .delete-log-item": "deleteThis"
  },

  // Init function that gets called immediately on new view creation
  initialize: function() {

    this.render();

    // Set up some listeners
    this.listenTo( this.model, "change", this.render );
    this.listenTo( this.model, "destroy", this.remove );

  },

  // Main render function
  render: function() {

    // Render a new item to the template using the attributes of this view's model
    this.$el.html( this.template( this.model.attributes ) );

    // Call the calculateCalories function each time a new FoodLog view gets created
    this.calculateCalories();

    // Breaks without this!
    return this;
  },

  // Calculate the total number of calories tracked in the Food Log
  calculateCalories: function() {
    var calorieArray = app.FoodLog.pluck("calories");
    var totalCalories = 0;
    var addCalories = $.each(calorieArray, function() {
      totalCalories += this;
    })
    $("#total-cals").html("Total calories consumed: <span class='accent-color'>" + Math.round(totalCalories) + "</span>!");
  },

  // Destroy function for FoodLog models/views and recalculate calories tracked
  deleteThis: function() {
    this.model.destroy();
    this.$el.remove();
    this.calculateCalories();
  }
})
