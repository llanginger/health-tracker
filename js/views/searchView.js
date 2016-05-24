var app = app || {};

var nSets = {
  searchUrl: "https://api.nutritionix.com/v1_1/search/",
  autoUrl: "https://api.nutritionix.com/v2/autocomplete?",
  phrase: "Tacos",
  appId: "appId=02cd80d0",
  appKey: "appKey=421b1fb27190316a6585e273b648dd6f",
  calMin: "",
  calMax: "",
  fields: "fields=item_name%2Citem_id%2Cbrand_name%2Cnf_calories%2Cnf_total_fat"
}


$(function(){
  $("body").click(function( event ) {
    console.log(event.target);
  });

  var value;

  // $('#autocomplete').on('change', function() {
  //   value = $(this).val();
  //   // alert(value);
  // });



  // $("#autocomplete").autocomplete({
  //   lookup: function(query, done) {
  //     console.log(query);
  //     var result = {};
  //     var suggestions = [];
  //     var nAutoUrl = nSets.autoUrl + "&" + nSets.appId + "&" + nSets.appKey
  //
  //     $.ajax( nAutoUrl + "&q=" + query )
  //       .fail(function( data ) {
  //         console.log(nAutoUrl);
  //         console.log("Nutri api call failed");
  //       })
  //       .done(function( data ) {
  //         console.log(data);
  //         console.log(nAutoUrl);
  //         for (var key in data) {
  //           if (data.hasOwnProperty(key)) {
  //             var thisLabel = data[key].text;
  //             suggestions.push({"value": thisLabel, "data": key})
  //             console.log(suggestions);
  //           }
  //         }
  //         result["suggestions"] = suggestions;
  //         done(result);
  //
  //
  //       })
  //
  //         // console.log(value);
  //
  //     }
  //
  // })

})


app.SearchView = Backbone.View.extend({

  el: "#search-div",

  events: {
    "click input": "edit",
    "click .food-option": "printOption",
    // "keypress #autocomplete": "updateOnEnter"
  },

  printOption: function() {
    this.$option = this.$("option");
    console.log(this.$option);
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

  autocompleteBar: function() {

    var value = this.$input.val().trim();
    var nAutoUrl = nSets.autoUrl + value + "&" + nSets.appId + "&" + nSets.appKey
    $.ajax(nAutoUrl)
      .fail(function( data ) {
        console.log("Nutri api call failed");
      })
      .done(function( data ) {
        console.log(nAutoUrl);
        $("option").remove();
        for (var i = 0; i < data.length; i++) {
          $("#food-list").append("<option class='food-option' value='" + data[i].text + "' />");
        }
        console.log(data);
        console.log(value);
      })

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
