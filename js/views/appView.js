"use strict";

var app = app || {};

// cache a tracking variable for later
var trackSuggest = -1;

// cache keycodes
var keys = {
  ESC   :   27,
  TAB   :   9,
  ENTER :   13,
  LEFT  :   37,
  UP    :   38,
  RIGHT :   39,
  DOWN  :   40
};

// cache Nutritionix AJAX url info
var nSets = {
  searchUrl: "https://api.nutritionix.com/v1_1/search/",
  autoUrl: "https://api.nutritionix.com/v2/autocomplete?",
  appId: "appId=02cd80d0",
  appKey: "appKey=421b1fb27190316a6585e273b648dd6f",
  fields: "fields=*"
}


// // Helper function to quickly be sure of what part of the document is being clicked
// $(function(){
//   $("body").click(function( event ) {
//     console.log(event.target);
//   });
// })

// Main app's "view"
app.AppView = Backbone.View.extend({

  // Specify which dom element this "View" has access to
  el: "#app",

  // initialize a number of events and the functions they call
  events: {
    "click    #leo-auto-bar"        :       "edit",
    "click    .food-option"         :       "printOption",
    "keyup    #leo-auto-bar"        :       "onKeypress",
    "keydown  #leo-auto-bar"        :       "upDownEtc",
    "click"                         :       "hideOptions",
    "click    .main-ate-that"       :       "addFoodToLog",
    "click    #clear-log"           :       "clearFoodLog",
    "click    .select-food-option"  :       "thisCalories",
    "click    .leo-auto-suggest"    :       "onEnter",
    "click    #close-tutorial"      :       "closeTutorial",
    "click    #show-tutorial"       :       "showTutorial"
  },

  initialize: function() {
    // cache a number of selectors
    this.$overlay                   =       $("#overlay");
    this.$leoInput                  =       $("#leo-auto-bar");
    this.$autoSuggestions           =       $(".leo-auto-suggestions");
    this.$overlayInfo               =       $("#overlay-info");
    this.$overlayGroup              =       $("#overlay-group");

    // Set up listeners for several events
    this.listenTo( this.model,    "change", this.render );
    this.listenTo( app.FoodItems, "add",    this.createList );
    this.listenTo( app.FoodLog,   "add",    this.renderLog );
    this.render();
    // _.bindAll(this, "onEnter"); TODO Not sure if I need this
  },

  // Not entirely sure that I need this
  render: function() {
    this.$input = this.$(".edit");
    // console.log(JSON.stringify(this.model))
    return this;
  },

  // Populate the calorie counter box with the calories of the selected option
  thisCalories: function() {
    var cals = app.FoodItems.where({selected: true})[0].get("calories")
    $("#item-cals").html("That has: " + "<span class='accent-color'>" + Math.round(cals) + "</span> calories!");
  },

  // Add selected food option to the persistent food log
  addFoodToLog: function() {
    var selected = app.FoodItems.where({selected: true})
    app.FoodLog.create({
      title     :   selected[0].get("title"),
      calories  :   selected[0].get("calories"),
      date      :   selected[0].get("date"),
      brand     :   selected[0].get("brand")
    })
  },

  // Close tutorial
  closeTutorial: function() {
    this.$overlay.fadeOut('fast');
    this.$overlayInfo.fadeOut('fast');
  },

  // Show tutorial once it's been closed
  showTutorial: function() {
    this.$overlay.fadeIn("fast").removeClass("hidden");
    this.$overlayInfo.fadeIn("fast").removeClass("hidden");
  },

  // Prepare autocomplete bar
  edit: function() {

    // Clear out initial instruction text
    if (this.$input.val() === "What did you just eat?"){
      this.$input.val("");
    };
    this.$el.addClass( "editing" );
  },


  // Clear out autocomplete suggestions if user clicks outside of autocomplete area
  hideOptions: function( event ) {
    if ( event.target != $(".leo-auto-suggest") || event.target != this.$input ) {
      this.$autoSuggestions.html("");
    }
  },

  // Clear out collection of models
  resetFoodItems: function() {
    app.FoodItems.reset();
  },

  // --==Currently disabled in UI==-- function to clear out food log
  clearFoodLog: function(){
    // console.log("food Log Cleared");
    app.FoodLog.reset();

    $("#food-log").html("");
    $("#total-cals").html("").text("Total calories tracked: 0");
  },

  // Create and format a new Date()
  newDate: function() {
    var date = new Date();

    var dateObj = {
      currDate    :   date.getDate(),
      currDay     :   date.getDay(),
      currMonth   :   date.getMonth(),
      currYear    :   date.getFullYear(),
      currHour    :   date.getHours(),
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

    return formattedDateTime;
  },

  // Create a new model, instantiate a new Date() and add it to the FoodItems collection
  newModel: function( title, calories, brand ) {

    // Function to check that the brand names aren't useless ( currently just Nutritionix / USDA)
    var checkBrand = function( brand ) {
      if (brand != "Nutritionix" && brand != "USDA") {
        return brand;
      } else {
        return "Generic"
      };
    }

    app.FoodItems.create({
      title     :   title,
      calories  :   calories,
      brand     :   checkBrand( brand ),
      date      :   this.newDate(),
    });
  },

  // Create and render a new FoodItem view
  createList: function( foodItem ) {
    var view = new app.FoodItemView({
      model: foodItem,
    });
    $("#select-food-item").append( view.render().el );
  },

  // Create and render a new FoodLog view
  renderLog: function( foodLogItem ) {
    var logView = new app.LogView({ model: foodLogItem });
    $("#food-log").prepend( logView.render().el );

  },

  // Function that makes AJAX request to a different part of the nutritionix API based on the results of the autocomplete function
  onEnter: function() {

    // Clear out the input box
    this.$autoSuggestions.html("");

    // Instantiate "self"
    var self = this;

    // Cache the query to be used in the AJAX request
    var value = this.$input.val().trim();

    // Check to make sure that there is indeed a query value. If so, perform the AJAX request and create new models for each result
    if ( value ) {

      $.ajax(nSets.searchUrl + value + "?" + nSets.fields + "&" + nSets.appId + "&" + nSets.appKey)
        .fail(function() {
          alert("Oops, we couldn't find anything like that!")
        })
        .done(function( data ) {
          // console.log(data)
          $("#select-food-item").html("");

          // Clear out collection to make room for new models
          self.resetFoodItems();
          for (var i in data.hits) {
            var info = data.hits[i].fields;
            self.newModel(info.item_name, info.nf_calories, info.brand_name);
          }
        })
    }
  },


  // Main autocomplete function that handles keypresses. Keyup so as to make sure that it responds appropriately to keypresses
  onKeypress: function ( e ) {

    // Instantiate "self"
    var self = this;


    // Hide autoSuggestions if there is nothing in the input box, otherwise show input box
    if (this.$leoInput.val().trim() === ""){
      this.$autoSuggestions.html("").addClass("hidden");
    } else {
      this.$autoSuggestions.removeClass('hidden');
    }

    // Ensure that we're not calling the function on these key inputs
    if (e.which != keys.DOWN && e.which != keys.UP && e.which != keys.ENTER && e.which != keys.TAB && e.which != keys.LEFT && e.which != keys.RIGHT && e.which != keys.ESC) {

      // Create and cache the AJAX url
      var leoAutoUrl = nSets.autoUrl + "&" + nSets.appId + "&" + nSets.appKey

      // Create and cache the autocomplete query term
      var query = self.$leoInput.val().trim();

      // Perform the autocomplete AJAX request
      if ( query != "" ) {
        $.ajax( leoAutoUrl + "&q=" + query )
          .fail(function( data ) {
            alert("Nutri api call failed");
          })
          .done(function( data ) {
            // console.log(data);
            self.$autoSuggestions.html("");
            for (var key in data) {
              if (data.hasOwnProperty(key)) {
                var option = data[key].text;
                self.$autoSuggestions.append("<div class='leo-auto-suggest' data-index='" + key + "'>" + option + "</div>");
              }
            }

            // Handle expected mouse interactions with auto suggestions
            // self.$autoSuggestions.removeClass("hidden")
            $(".leo-auto-suggest").click(function(){
              $("#leo-auto-bar").val($(this).text());
              self.$autoSuggestions.addClass('hidden');
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
  },

  upDownEtc: function( e ) {

    // This function handles the up/down/enter/esc keys' functionality. This is separate from the "onKeypress" function because it uses and takes advantage of "keydown"'s key repeat functionality
    var self = this;
    if (e.which === keys.DOWN) {
      e.preventDefault();

      // Check to make sure the user isn't able to scroll past the end of the available options. Assuming we're safe, select the next option in the autocomplete list
      if (trackSuggest <= $(".leo-auto-suggest").length - 2){
        trackSuggest ++;
        $(".leo-auto-suggest").removeClass("leo-selected");
        $("[data-index*='" + trackSuggest + "']").addClass("leo-selected");
      }
    } else if (e.which === keys.UP && trackSuggest > 0) {

      // Select the previous option in the autocomplete list
      e.preventDefault();
      trackSuggest --;
      $(".leo-auto-suggest").removeClass("leo-selected");
      $("[data-index*='" + trackSuggest + "']").addClass("leo-selected");
    } else if (e.which === keys.ENTER) {

      // Perform the steps to provide expected behavior on "Enter"
      $("#leo-auto-bar").val($(".leo-selected").text());
      self.onEnter();
      trackSuggest = -1;
    } else if (e.which === keys.ESC) {

      // As above but for the Esc key
      this.$autoSuggestions.html("");
      trackSuggest = -1;
    }
  }

});
