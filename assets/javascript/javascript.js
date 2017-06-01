
$(document).ready(function(){

var gifs = ["cats", "racoons", "dogs", "goats", "birds", "kittens", "horses", "fish", "puppies", "snakes"];

function displayGifInfo(){     

  var gif= $(this).attr("data-name");
  var queryURL= "http://api.giphy.com/v1/gifs/search?q="+ gif +"+being+jerks&sort=relevant&api_key=dc6zaTOxFJmzC&limit=10";
 
   $.ajax({
   url: queryURL,
   method: "GET"
   }).done(function(response) {
   var results = response.data;
   $("#gif-area").empty();

   for (var i = 0; i < results.length; i++) {
   var gifDiv = $("<div class='gif-Div'>");
   var rating = results[i].rating;
   var p = $("<p>").html("Rating: " + rating);
   var gifImage = $("<img>");
   gifImage.attr("src", results[i].images.fixed_height.url);
   gifImage.attr("data-still", results[i].images.fixed_height_still.url);
   gifImage.attr("data-animate", results[i].images.fixed_height.url);
   gifImage.attr("data-state", "still");

    gifDiv.prepend(p);
    gifDiv.prepend(gifImage);

   $("#gif-area").prepend(gifDiv);
   }
    });
}


   function renderButtons() {
     $("#button-area").empty();
    for (var i = 0; i < gifs.length; i++) {
    var a = $("<button>");
    a.addClass("gif-button");
    a.attr("data-name", gifs[i]);
    a.text(gifs[i]);
    $("#button-area").append(a);
        }
      }



$("#add-gif").on("click", function(event) {
        event.preventDefault();
        var newGif = $("#gif-input").val().trim();
        gifs.push(newGif);
        renderButtons();


    });

$(".gifImage").on("click", function(){
  var state = $(this).attr("data-state"); 
  console.log(state);

     if ( state == "still"){
        $(this).attr("src", $(this).data("animate"));
        $(this).attr("data-state", "animate");
        }else{
        $(this).attr("src", $(this).data("still"));
        $(this).attr("data-state", "still");
}


});

 $(document).on("click", ".gif-button", displayGifInfo,);

 renderButtons();

})