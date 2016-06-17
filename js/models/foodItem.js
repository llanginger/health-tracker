var app = app || {};

app.FoodItem = Backbone.Model.extend({
  defaults: {
    title: "",
    calories: 0,
    selected: false,
  },

  selected: function(){
    this.save({
      selected: !this.get("selected")
    })
  }
})
