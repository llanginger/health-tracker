var app = app || {};

app.FoodItemView = Backbone.View.extend({

  tagName: "div",

  className: "select-food-option",



  // id: function() {
  //   return this.model.get("id");
  // },

  template: _.template( $("#food-select-template").html() ),

  events: {
    "click option" : "selectFoodToLog",
    "mouseenter .new-option": "addSelected",
    "click .destroy": "clear",
    "click": "selected",
    // "click .add-this": "addThis",

  },

  initialize: function() {
    _.bindAll(this,"render");
    // console.log(this.model.attributes)
    // console.log(this.$el);
    // this.render;

    // this.$select = $("#select-food-item");
    this.listenTo( this.model, "change", this.render );
    this.listenTo( this.model, "destroy", this.remove );
  },

  remove: function() {

  },

  selected: function() {
    app.FoodItems.each(function(model){
      // console.log(model.toJSON())
      model.set({selected: false})
    })
    this.model.selected();
    console.log(app.FoodItems.toJSON())

    $("#select-food-item").children().removeClass("leo-selected");
    this.$el.addClass("leo-selected");

  },

  addSelected: function() {
    this.$newItem.addClass("new-selected");
  },

  render: function() {

    this.delegateEvents();

    // console.log("created item with ID: " + this.model.get("id"))

    this.$el.html( this.template( this.model.attributes ) );

      // $(".new-option").mouseenter(function() {
      //   $(this).addClass("new-selected")
      // }).mouseleave(function() {
      //   $(this).removeClass('new-selected')
      // }).click(function() {
      //   console.log($(this).attr("id"))
      // })



    return this;
  },

  addThis: function() {
    app.FoodLog.create(this.model)
  },

  clear: function() {
    console.log("clear fired");
    this.model.destroy();
    this.$el.remove();
  },





})

console.log("after food item view")
