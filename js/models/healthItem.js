var app = app || {};

app.FoodItem = Backbone.Model.extend({
  defaults: {
    title: "",
    calories: 0,
    time: "",
    url: "",
    completed: false
  },

  toggle: function(){
    this.save({
      completed: !this.get("completed")
    })
  }
})

// var foodItem = new app.FoodItem();
