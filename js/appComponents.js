var app = app || {};

var nutriApiKey = "421b1fb27190316a6585e273b648dd6f";
var nutriAppId = "02cd80d0";

$(function(){

var searchText = "What did you just eat?";

  // $("#search-bar").on("focus", function(){
  //   $(this).val("");
  // });
  //
  // $("#search-bar").on("blur", function(){
  //   if ($(this).val() == ""){
  //     $(this).val(searchText);
  //   }
  // });

  var nSets = {
    initUrl: "https://api.nutritionix.com/v1_1/search/",
    phrase: "Tacos",
    appId: "appId=02cd80d0",
    appKey: "appKey=421b1fb27190316a6585e273b648dd6f",
    calMin: "",
    calMax: "",
    fields: "fields=item_name%2Citem_id%2Cbrand_name%2Cnf_calories%2Cnf_total_fat"
  }

  $("#search-button").click(function(){
    $.ajax(nSets.initUrl + nSets.phrase + "?" + nSets.fields + "&" + nSets.appId + "&" + nSets.appKey)
      .fail(function( data ) {
        console.log("Nutri api call failed");
      })
      .done(function( data ) {
        console.log(data);
      })
  })
})
