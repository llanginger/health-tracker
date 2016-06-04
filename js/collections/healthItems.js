var app = app || {};

var FoodItems = Backbone.Firebase.Collection.extend({
  model: app.FoodItem,
  url: "https://glowing-inferno-6853.firebaseIO.com",

  nextOrder: function() {
    if ( !this.length ) {
      return 1;
    }
    return this.last().get("id") + 1;
  },

})

app.FoodItems = new FoodItems();


// .get(ID NUMBER HERE) to retrive specific models. To remove; foo = collection.get(ID NUMBER), foo.destroy();
