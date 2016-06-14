var app = app || {};

app.FoodItem = Backbone.Model.extend({
  defaults: {
    title: "",
    calories: 0,
    completed: false,
  },

  toggle: function(){
    this.save({
      completed: !this.get("completed")
    })
  }
})

// var foodItem = new app.FoodItem();

// I don't have to interact with a model anymore. That's what I didn't understand. This sets up the default behaviors of the models so that when I just add something to a collection, it adds an object in the manner that I've set up here
