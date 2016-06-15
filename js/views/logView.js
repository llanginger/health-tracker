var app = app || {};

app.LogView = Backbone.View.extend({

  el: "#food-log",

  events: {
  
  },

  initialize: function() {

    this.render();

    this.listenTo( this.model, "change", this.render );
    this.listenTo( this.model, "destroy", this.remove );

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
