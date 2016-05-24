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
  fields: "fields=item_name%2Citem_id%2Cbrand_name%2Cnf_calories%2Cnf_total_fat"
}

$(function(){
  $("body").click(function( event ) {
    console.log(event.target);
  });



})


app.SearchView = Backbone.View.extend({


  el: "#search-div",

  events: {
    "click #leo-auto-bar": "edit",
    "click .food-option": "printOption",
    "keypress #leo-auto-bar": "onKeypress",
    // "keypress #autocomplete": "updateOnEnter"
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
    if (this.$input.val() === "What did you just eat?"){
      this.$input.val("");
    };
    this.$el.addClass( "editing" );
    console.log(this.$input.val());
    console.log("Edit fired");
  },

  close: function() {
    // var value = this.$input.val().trim();
    //
    // if ( value ) {
    //   // this.model.save({title: value});
    //   console.log(value);
    //   $.ajax(nSets.searchUrl + value + "?" + nSets.fields + "&" + nSets.appId + "&" + nSets.appKey)
    //     .fail(function( data ) {
    //       console.log("Nutri api call failed");
    //     })
    //     .done(function( data ) {
    //       console.log(data);
    //     })
    // } else {
    //   this.clear();
    // }
  },
  onEnter: function() {

    console.log("onEnter triggered")
    var value = this.$input.val().trim();

    if ( value ) {
      // this.model.save({title: value});
      console.log(value);
      $.ajax(nSets.searchUrl + value + "?" + nSets.fields + "&" + nSets.appId + "&" + nSets.appKey)
        .fail(function( data ) {
          console.log("Nutri api call failed");
        })
        .done(function( data ) {
          console.log(data);
          for (var i in data.hits) {
            console.log(data.hits[i].fields.item_name)
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
    $("#leo-auto-bar").off("keydown").keydown(function( e ) {

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
              console.log(data);
              console.log(query);
              console.log(leoAutoUrl);
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
        trackSuggest ++;
        $(".leo-auto-suggest").removeClass("leo-selected");
        $("[data-index*='" + trackSuggest + "']").addClass("leo-selected");
      } else if (e.which === keys.UP && trackSuggest > 0) {
        trackSuggest --;
        $(".leo-auto-suggest").removeClass("leo-selected");
        $("[data-index*='" + trackSuggest + "']").addClass("leo-selected");
      } else if (e.which === keys.ENTER) {
        console.log($(".leo-selected").text())
        $("#leo-auto-bar").val($(".leo-selected").text());
        self.onEnter();
      }
    })

    // $("#leo-auto-bar").off("keydown");
  },


  // updateOnEnter: function( e ) {
  //   if (e.which === ENTER_KEY ) {
  //     // this.close();
  //     console.log("Enter key");
  //   } else {
  //     this.autocompleteBar();
  //   }
  // },

  // clear: function() {
  //   this.model.destroy();
  // }

})
