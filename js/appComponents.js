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
  autoUrl: "https://api.nutritionix.com/v2/autocomplete?",
  appId: "appId=02cd80d0",
  appKey: "appKey=421b1fb27190316a6585e273b648dd6f",
  fields: "fields=item_name%2Citem_id%2Cbrand_name%2Cnf_calories%2Cnf_total_fat"
}

$(function() {




  // $('input').bind('keydown', function(e){
  //   if(e.which == '38' || e.which == '40' || e.which == "13"){
  //     e.preventDefault();
  //   }
  // });

  $("#leo-auto-bar").focus(function(){
    // if ($(".leo-auto-suggestions").children().length > 0) {
    //   $(".leo-auto-suggestions").removeClass('hidden');
    // }
    // $("#leo-auto-bar").keydown(function( e ) {
    //
    //   console.log(e.which);
    //
    //   if (e.which != keys.DOWN && e.which != keys.UP && e.which != keys.ENTER && e.which != keys.TAB && e.which != keys.LEFT && e.which != keys.RIGHT && e.which != keys.ESC) {
    //
    //   var query = $(this).val().trim();
    //   if ( query != "" ) {
    //     $.ajax( leoAutoUrl + "&q=" + query )
    //       .fail(function( data ) {
    //         alert("Nutri api call failed");
    //       })
    //       .done(function( data ) {
    //         $(".leo-auto-suggestions").html("");
    //         console.log(data);
    //         console.log(query);
    //         console.log(leoAutoUrl);
    //         for (var key in data) {
    //           if (data.hasOwnProperty(key)) {
    //             var option = data[key].text;
    //             $(".leo-auto-suggestions").append("<div class='leo-auto-suggest' data-index='" + key + "'>" + option + "</div>");
    //           }
    //         }
    //         $(".leo-auto-suggestions").removeClass("hidden")
    //         $(".leo-auto-suggest").click(function(){
    //           $("#leo-auto-bar").val($(this).text());
    //           $(".leo-auto-suggestions").addClass('hidden');
    //         })
    //         $(".leo-auto-suggest").mouseenter(function(){
    //           $(".leo-auto-suggest").removeClass("leo-selected");
    //           $(this).addClass('leo-selected');
    //           trackSuggest = -1
    //         });
    //         $(".leo-auto-suggest").mouseleave(function() {
    //           $(this).removeClass("leo-selected");
    //         });
    //       })
    //     }
    //   };
    //
    //   var container = $("div"),
    //       scrollTo = $(".leo-selected");
    //
    //   if (e.which === keys.DOWN) {
    //     trackSuggest ++;
    //     $(".leo-auto-suggest").removeClass("leo-selected");
    //     $("[data-index*='" + trackSuggest + "']").addClass("leo-selected");
    //     container.animate({
    //       scrollTop: scrollTo.offset().top
    //     })
    //   } else if (e.which === keys.UP && trackSuggest > 0) {
    //     trackSuggest --;
    //     $(".leo-auto-suggest").removeClass("leo-selected");
    //     $("[data-index*='" + trackSuggest + "']").addClass("leo-selected");
    //   } else if (e.which === keys.ENTER) {
    //     console.log($(".leo-selected").text())
    //     $("#leo-auto-bar").val($(".leo-selected").text());
    //   }
    // })
  })
  // $("#leo-auto-bar").blur(function(){
  //   $(".leo-auto-suggestions").addClass('hidden');
  // })
})
