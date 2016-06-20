var app = app || {};

var keys = {
  ESC: 27,
  TAB: 9,
  ENTER: 13,
  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40
};

var nSets = {
  searchUrl: "https://api.nutritionix.com/v1_1/search/",
  autoUrl: "https://api.nutritionix.com/v2/autocomplete?",
  appId: "appId=02cd80d0",
  appKey: "appKey=421b1fb27190316a6585e273b648dd6f",
  fields: "fields=*"
}



$(function(){
  $("body").click(function( event ) {
    console.log(event.target);
  });
})




app.AppView = Backbone.View.extend({

  el: "#app",

  events: {
    "click #leo-auto-bar": "edit",
    "click .food-option": "printOption",
    "keypress #leo-auto-bar": "onKeypress",
    "focus #leo-auto-bar": "showOptions",
    "click": "hideOptions",
    "click .main-ate-that": "addFoodToLog",
    "click #clear-log": "clearFoodLog",
    "click .select-food-option": "thisCalories",
    "click .leo-auto-suggest": "onEnter",
    "click #close-tutorial": "closeTutorial",
    "click #show-tutorial": "showTutorial"
    // "keypress #autocomplete": "updateOnEnter"
  },

  initialize: function() {

    this.$overlay = $("#overlay");
    this.$overlayInfo = $("#overlay-info");
    this.$overlayGroup = $("#overlay-group");

    this.listenTo( this.model, "change", this.render );
    this.listenTo( app.FoodItems, "add", this.createList );
    this.listenTo( app.FoodLog, "add", this.renderLog );
    this.render();
    _.bindAll(this, "onEnter");
    console.log("Init fired");
  },

  thisCalories: function() {

    var cals = app.FoodItems.where({selected: true})[0].get("calories")

    console.log(cals);

    $("#item-cals").html("That has: " + "<span class='accent-color'>" + Math.round(cals) + "</span> calories!");


  },

  addFoodToLog: function() {

    var selected = app.FoodItems.where({selected: true})
    app.FoodLog.create({
      title: selected[0].get("title"),
      calories: selected[0].get("calories"),
      date: selected[0].get("date"),
      brand: selected[0].get("brand")
    })

    console.log()
  },

  render: function() {

    this.$input = this.$(".edit");
    console.log(JSON.stringify(this.model))
    return this;
  },

  closeTutorial: function() {

    this.$overlay.fadeOut('fast');
    this.$overlayInfo.fadeOut('fast');
  },

  showTutorial: function() {

    console.log("show tut")

    this.$overlay.fadeIn("fast").removeClass("hidden");
    this.$overlayInfo.fadeIn("fast").removeClass("hidden");

  },

  edit: function() {
    if (this.$input.val() === "What did you just eat?"){
      this.$input.val("");
    };
    this.$el.addClass( "editing" );
    console.log(this.$input.val());
    console.log("Edit fired");
  },

  showOptions: function() {
    if ($(".leo-auto-suggestions").children().length > 0) {
      $(".leo-auto-suggestions").removeClass('hidden');
    }
  },

  hideOptions: function( event ) {
    if ( event.target != $(".leo-auto-suggest") || event.target != $("#leo-auto-bar")) {
      $(".leo-auto-suggestions").addClass("hidden");
    }
  },


  resetFoodItems: function() {
    app.FoodItems.reset();
  },

  clearFoodLog: function(){
    console.log("food Log Cleared");
    app.FoodLog.reset();

    $("#food-log").html("");
    $("#total-cals").html("").text("Total calories tracked: 0");
  },


  newModel: function( title, calories, brand ) {

    var date = new Date();

    var dateObj = {
      currDate: date.getDate(),
      currDay: date.getDay(),
      currMonth: date.getMonth(),
      currYear: date.getFullYear(),
      currHour: date.getHours(),
    }

    var amPm = function(){
      if (dateObj.currHour > 12){
        return dateObj.currHour - 12 + " pm";
      } else {
        return dateObj.currHour + " am";
      }
    }

    var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    var formattedDateTime = amPm() + ", " + days[dateObj.currDay] + " " + dateObj.currMonth + " " + dateObj.currYear;

    app.FoodItems.create({
      title: title,
      calories: calories,
      brand: brand,
      date: formattedDateTime,
    });
  },

  createList: function( foodItem ) {
    var view = new app.FoodItemView({
      model: foodItem,

    });
    $("#select-food-item").append( view.render().el );
  },

  renderLog: function( foodLogItem ) {

    console.log("log render fired");
    var logView = new app.LogView({ model: foodLogItem });
    $("#food-log").prepend( logView.render().el );

  },


  onEnter: function() {
    $(".leo-auto-suggestions").html("");

    var self = this;

    console.log("onEnter triggered")
    var value = this.$input.val().trim();

    if ( value ) {

      // $("#temp-items").html("");
      // this.model.save({title: value});
      console.log(value);
      $.ajax(nSets.searchUrl + value + "?" + nSets.fields + "&" + nSets.appId + "&" + nSets.appKey)
        .fail(function( data ) {
          console.log("Nutri api call failed");
        })
        .done(function( data ) {
          $("#select-food-item").html("");

          self.resetFoodItems();
          console.log(data);
          for (var i in data.hits) {
            var info = data.hits[i].fields;
            // console.log(info.item_name);
            self.newModel(info.item_name, info.nf_calories, info.brand_name);
          }
        })
    }
    // else {
    //   this.clear();
    // }
  },



  onKeypress: function ( ) {

    var self = this;

    var trackSuggest = -1;

    if ($(".leo-auto-suggestions").children().length > 0) {
      $(".leo-auto-suggestions").removeClass('hidden');
    }
    $("#leo-auto-bar").off().keydown(function( e ) {

      $('input').bind('keydown', function(e){
        if(e.which == '38' || e.which == '40' || e.which == "13"){
          e.preventDefault();
        }
      });

      console.log(e.which);

      if (e.which != keys.DOWN && e.which != keys.UP && e.which != keys.ENTER && e.which != keys.TAB && e.which != keys.LEFT && e.which != keys.RIGHT && e.which != keys.ESC) {

        var leoAutoUrl = nSets.autoUrl + "&" + nSets.appId + "&" + nSets.appKey

        var query = $(this).val().trim();
        if ( query != "" ) {
          $.ajax( leoAutoUrl + "&q=" + query )
            .fail(function( data ) {
              alert("Nutri api call failed");
            })
            .done(function( data ) {
              $(".leo-auto-suggestions").html("");
              for (var key in data) {
                if (data.hasOwnProperty(key)) {
                  var option = data[key].text;
                  $(".leo-auto-suggestions").append("<div class='leo-auto-suggest' data-index='" + key + "'>" + option + "</div>");
                }
              }
              $(".leo-auto-suggestions").removeClass("hidden")
              $(".leo-auto-suggest").click(function(){
                $("#leo-auto-bar").val($(this).text());
                $(".leo-auto-suggestions").addClass('hidden');
              })
              $(".leo-auto-suggest").mouseenter(function(){
                $(".leo-auto-suggest").removeClass("leo-selected");
                $(this).addClass('leo-selected');
                trackSuggest = -1
              });
              $(".leo-auto-suggest").mouseleave(function() {
                $(this).removeClass("leo-selected");
              });
            })
          }
      };

      if (e.which === keys.DOWN) {
        // Check to make sure the user isn't able to scroll past the end of the available options
        if (trackSuggest <= $(".leo-auto-suggest").length - 2){
          trackSuggest ++;
          $(".leo-auto-suggest").removeClass("leo-selected");
          $("[data-index*='" + trackSuggest + "']").addClass("leo-selected");
        }
      } else if (e.which === keys.UP && trackSuggest > 0) {
        trackSuggest --;
        $(".leo-auto-suggest").removeClass("leo-selected");
        $("[data-index*='" + trackSuggest + "']").addClass("leo-selected");
      } else if (e.which === keys.ENTER) {
        console.log($(".leo-selected").text())
        $("#leo-auto-bar").val($(".leo-selected").text());
        self.onEnter();
      } else if (e.which === keys.ESC) {
        $(".leo-auto-suggestions").html("");
      }
    })

    // $("#leo-auto-bar").off("keydown");
  },



});
