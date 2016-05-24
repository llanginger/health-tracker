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

var leoSets = {
  searchUrl: "https://api.nutritionix.com/v1_1/search/",
  autoUrl: "https://api.nutritionix.com/v2/autocomplete?",
  phrase: "Tacos",
  appId: "appId=02cd80d0",
  appKey: "appKey=421b1fb27190316a6585e273b648dd6f",
  calMin: "",
  calMax: "",
  fields: "fields=item_name%2Citem_id%2Cbrand_name%2Cnf_calories%2Cnf_total_fat"
}

$(function() {

//   $(document).on("keydown keyup", "#search input", function(event) {
//     if(event.which==38 || event.which==40){
//         event.preventDefault();
//     }
// });
var trackSuggest = -1;

  var leoAutoUrl = leoSets.autoUrl + "&" + leoSets.appId + "&" + leoSets.appKey

  $('input').bind('keydown', function(e){
    if(e.which == '38' || e.which == '40' || e.which == "13"){
      e.preventDefault();
    }
  });

  $("#leo-auto-bar").focus(function(){
    $(".leo-auto-suggestions").removeClass('hidden');
    $("#leo-auto-bar").keydown(function( e ) {




      console.log(e.which);

      if (e.which != keys.DOWN && e.which != keys.UP && e.which != keys.ENTER && e.which != keys.TAB && e.which != keys.LEFT && e.which != keys.RIGHT && e.which != keys.ESC && e.which != keys.TAB) {
      $(".leo-auto-suggestions").html("").removeClass("hidden");
      var query = $(this).val();
      // console.log(query);
      if ( query != "" ) {
        $.ajax( leoAutoUrl + "&q=" + query )
          .fail(function( data ) {
            console.log(nAutoUrl);
            console.log("Nutri api call failed");
          })
          .done(function( data ) {
            console.log(data);
            console.log(query);
            console.log(leoAutoUrl);
            for (var key in data) {
              if (data.hasOwnProperty(key)) {
                var thisLabel = data[key].text;
                // console.log(thisLabel);
                $(".leo-auto-suggestions").append("<div class='leo-auto-suggest' data-index='" + key + "'>" + thisLabel + "</div>");
              }
            }

            $(".leo-auto-suggest").click(function(){
              $("#leo-auto-bar").val($(this).text());
            })
            $(".leo-auto-suggest").mouseenter(function(){
              $(this).addClass('leo-selected');
              // trackSuggest = $(this).attr("data-index");
              // console.log(trackSuggest)
            });
            $(".leo-auto-suggest").mouseleave(function() {
              $(this).removeClass("leo-selected");
            });





          })
        }
      };
      if (e.which === keys.DOWN) {
        trackSuggest ++;
        console.log(trackSuggest);
        $(".leo-auto-suggest").removeClass("leo-selected");
        $("[data-index*='" + trackSuggest + "']").addClass("leo-selected");

      } else if (e.which === keys.UP && trackSuggest > 0) {
        trackSuggest --;
        $(".leo-auto-suggest").removeClass("leo-selected");
        $("[data-index*='" + trackSuggest + "']").addClass("leo-selected");
        console.log(trackSuggest);
      } else if (e.which === keys.ENTER) {
        console.log("enter key");
        console.log($(".leo-selected").text())
        $("#leo-auto-bar").val($(".leo-selected").text());
      }

    })
  })
  $("#leo-auto-bar").blur(function(){
    $(".leo-auto-suggestions").addClass('hidden');
  })
})
