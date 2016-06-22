var app = app || {};

// FoodItem model and some default settings
app.FoodItem = Backbone.Model.extend({
  defaults: {
    title: "",
    calories: 0,
    selected: false,
  },

  // Function for easy selection of a specific model
  selected: function(){
    this.save({
      selected: !this.get("selected")
    })
  }
})
