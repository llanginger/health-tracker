var app = app || {};

var nSets = {
  initUrl: "https://api.nutritionix.com/v1_1/search/",
  phrase: "Tacos",
  appId: "appId=02cd80d0",
  appKey: "appKey=421b1fb27190316a6585e273b648dd6f",
  calMin: "",
  calMax: "",
  fields: "fields=item_name%2Citem_id%2Cbrand_name%2Cnf_calories%2Cnf_total_fat"
}

app.SearchView = Backbone.View.extend({

  el: "#search-div",

  events: {
    "click input": "edit",
    "keypress #search-bar": "updateOnEnter"
  },

  initialize: function() {
    this.listenTo( this.model, "change", this.render );
    this.render();
    console.log("Something happened");
  },

  render: function() {
    this.$input = this.$(".edit");
    console.log(JSON.stringify(this.model))
    return this;
  },

  edit: function() {
    this.$el.addClass( "editing" )
    console.log("Edit fired");
  },

  close: function() {
    var value = this.$input.val().trim();

    if ( value ) {
      // this.model.save({title: value});
      console.log(value);
      $.ajax(nSets.initUrl + value + "?" + nSets.fields + "&" + nSets.appId + "&" + nSets.appKey)
        .fail(function( data ) {
          console.log("Nutri api call failed");
        })
        .done(function( data ) {
          console.log(data);
        })
    } else {
      this.clear();
    }
  },

  updateOnEnter: function( e ) {
    if (e.which === ENTER_KEY ) {
      this.close();
    }
  },

  clear: function() {
    this.model.destroy();
  }

})
