var app=app||{};app.FoodItemView=Backbone.View.extend({el:"#item-div",events:{"click option":"selectFoodToLog"},initialize:function(){_.bindAll(this,"render"),this.$select=$("#select-food-item"),this.listenTo(this.model,"change",this.render),this.listenTo(this.model,"destroy",this.remove)},remove:function(){},render:function(){return this.$select.append("<option id='"+this.model.get("id")+"'>"+this.model.get("title")+", by: "+this.model.get("brand")+"</option>"),this}}),console.log("after food item view");