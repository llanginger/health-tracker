var app=app||{},FoodItems=Backbone.Firebase.Collection.extend({model:app.FoodItem,url:"https://glowing-inferno-6853.firebaseIO.com",nextId:function(){if(!this.length)return 1;var e=this.last().get(e);return console.log(typeof e),console.log(e),e+=1}});app.FoodItems=new FoodItems;