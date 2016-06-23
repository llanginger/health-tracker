var app = app || {};

// FoodItem's "view"
app.FoodItemView = Backbone.View.extend({

  // Specify the type of element this view will create
  tagName: "div",

  // Specify a class to be added to elements this view creates
  className: "select-food-option",

  // Hook it all up to the Underscore.js templating engine
  template: _.template( $("#food-select-template").html() ),

  // initialize a number of events and the functions they call
  events: {
    "click         option"      :      "selectFoodToLog",
    "mouseenter   .new-option"  :      "addSelected",
    "click        .destroy"     :      "clear",
    "click"                     :      "selected",
  },

  // Init function that gets called immediately on new view creation
  initialize: function() {
    _.bindAll(this,"render");

    // Set up some listeners
    // this.$select = $("#select-food-item");
    this.listenTo( this.model, "change",  this.render );
    this.listenTo( this.model, "destroy", this.remove );
  },

  // Main render function
  render: function() {

    this.delegateEvents();

    // Render a new item to the template using the attributes of this view's model
    this.$el.html( this.template( this.model.attributes ) );

    // Breaks without this!
    return this;
  },


  // Function to toggle which model in the collection has the property "Selected: true"
  selected: function() {
    app.FoodItems.each(function(model){
      model.set({selected: false})
    })
    this.model.selected();
    $("#select-food-item").children().removeClass("leo-selected");
    this.$el.addClass("leo-selected");
  },


  addSelected: function() {
    this.$newItem.addClass("new-selected");
  },



  // --==Currently disabled in UI==-- Destroy functionality for FoodItem views
  clear: function() {
    this.model.destroy();
    this.$el.remove();
  },
})
