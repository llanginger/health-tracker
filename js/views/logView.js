var app = app || {};

app.LogView = Backbone.View.extend({

  el: "#food-log",

  events: {
    "click": "dosomething"
  },

  initialize: function() {

    this.render();

    this.listenTo( this.model, "change", this.render );
    this.listenTo( this.model, "destroy", this.remove );

  },

  dosomething: function() {
    "thing"
  },

  render: function() {

    console.log("logview something happened")

    this.$el.append("<div class='logged-item'>" +
        this.model.get("id") + "'>" +
        this.model.get("title") + ", by: " +
        this.model.get("brand") + ".  " +
        this.model.get("calories") + " calories!" +
      "</div>")

    return this;
  },

})
