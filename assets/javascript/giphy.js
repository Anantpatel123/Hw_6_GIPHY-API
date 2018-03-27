
var giphys = ["basketball", "Tiger", "trump", "football", "Homer simpson", "cartoon", "Hell nooooo", "sports",
              "weather", "sun", "yesssss"];

// function for adding a button
function addbutton() {

  $("#Button-view").empty();
  
  //for loop to add an giphy.
  for (var i = 0; i < giphys.length; i++) {
      
    // creates button, class, data attr, & text and then append it to the Button-view.
  
      // Create a variable named "giphyBtn" equal to $("<button>");
      var giphyBtn = $("<button>");
  
      // Then give each "giphyBtn" a class called "giphy-class".
      giphyBtn.addClass("giphy-class");
  
      // Then give each "giphyBtn" a data-attribute called "data-letter".
      giphyBtn.attr("data-giphy", giphys[i]);
  
      // Then give each "giphyBtn" a text equal to "letters[i]".
      giphyBtn.text(giphys[i]);
  
      // Finally, append each "giphyBtn" to the "#Button-view" div (provided).
      $("#Button-view").append(giphyBtn);
      
    }
  
  }

  //when submit button is clicked, event function gets executed.
$("#btnsubmit").on("click", function(event) {
  event.preventDefault();

//create a variable giphy where the user input will be stored.
  var giphy = $("#Giphy-input").val().trim();

  if (giphy === "") {//this will not create empty boxes to the document.
    return;
  }

//user input gets added(push) to the giphys ARRAY[].
  giphys.push(giphy);
//addbutton is called so that button gets added after user input.
  addbutton();

  $("#Giphy-input").val("");

});

//creat a function to display response.
function displayresponse() {

  var giphyName = $(this).attr("data-giphy");

    $.ajax ({    
    url: "https://api.giphy.com/v1/gifs/search?api_key=xWfEvyYZLxhZU2hnb5araCCyI6uAsSjP&q=" + giphyName + "&limit=10",
    method:"GET"
    })
    .then(function(response) {
    console.log(response);

    var results = response.data;
  
      // create a for loop that will take ratings, title & giphy from each array of giphy & show it under Giphy-view div.    
      for (var i = 0; i < results.length; i++) {
      $("#Giphy-view").prepend('<p> Ratings: ' + results[i].rating + '</p>');
      $("#Giphy-view").prepend('<p> Title: ' + results[i].title + '</p>');
      $("#Giphy-view").prepend('<img class="gif" data-state="still" src="' + results[i].images.fixed_height_still.url + 
      '"data-animate="' + results[i].images.fixed_height.url + 
      '"data-still="' + results[i].images.fixed_height_still.url + '">');
      }  

       //function for pause and animate giphy.
      $(".gif").on("click", function() {  
        var state = $(this).attr("data-state");

        if (state === "still") {
          var animatedImg = $(this).attr("data-animate");
          console.log(animatedImg);
          $(this).attr("src", $(this).attr("data-animate"));
          $(this).attr("data-state","animate");
        }
        
        if (state === "animate") {
          $(this).attr("src", $(this).attr("data-still"));
          $(this).attr("data-state","still");
        }
        });

    });

}

addbutton();

// Adding click event listeners to all elements with a class of "giphy-class".
$(document).on("click", ".giphy-class", displayresponse);

