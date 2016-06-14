var app = app || {};

var FoodItems = Backbone.Collection.extend({
  model: app.FoodItem,
  // localStorage: new Backbone.LocalStorage('foodItem-backbone'),
  url: "/model/info",


  nextId: function() {
    if ( !this.length ) {
      return 1;
    }
    var id = this.last().get(id);
    // var id = this.length;
    console.log(typeof id);
    console.log(id);
    return id+=1;
  },


})

app.FoodItems = new FoodItems();


// .get(ID NUMBER HERE) to retrive specific models. To remove; foo = collection.get(ID NUMBER), foo.destroy();
