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
