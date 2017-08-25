$(document).ready(function() {
    // set up initial array of topics
    var topics = ["puppies", "kittens", "ponies", "bunnies", "piglets"];

    // displayGifInfo function to re-render the HTML to display the appropriate content
    function displayGifInfo() {

        var topic = $(this).attr("data-name");
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=f0fdbd09d1ab46ce8f53fdff5d104aad&limit=10";
        // console.log(queryURL);
        
        // Creates AJAX call for the specific topic button being clicked
        $.ajax({
            url: queryURL,
            method: "GET"
        }).done(function(response) {
            console.log(response);

            //loop through each of the objects items 
            for (var i=0; i < response.data.length; i++){
                //create a div to hold the gif + information
                var gifDiv = $("<div>");
                //create an img that will hold the gif image itself
                var gif = $("<img>");
                //create a p that will hold the rating of the gif
                var rating = $("<p>");
                //add the class gifHolder to the gifDiv
                gifDiv.addClass("gifHolder");
                //add the rating information to the rating <p>
                rating.text("Rating: " + (response.data[i].rating).toUpperCase());
                //set the URLs for the still and animated images, and set the state to still on the gif
                var animatedURL = response.data[i].images.fixed_height.url;
                var stillURL = response.data[i].images.fixed_height_still.url;
                gif.addClass("gif");
                gif.attr("src", stillURL);
                gif.data("still", stillURL);
                gif.data("animate", animatedURL);
                gif.data("state", "still");
                //append the rating <p> to the gifDiv <div>
                gifDiv.append(rating);
                //append the gif image <img> to the gifDiv <div>
                gifDiv.append(gif);
                //prepend the gifDiv <div> to the gif-view DOM element
                $("#gif-view").prepend(gifDiv);
            }
        });
    }

    // Function for displaying gif data 
    function renderButtons() {
        // deletes the gifs buttons prior to adding new gifs
        $("#topics").empty();
        // loops through the array of gifs
        for (var i = 0; i < topics.length; i++) {
            // create button for each element in the array
            var a = $("<button>");
            // Adds a class of movie to our button
            a.addClass("topic");
            a.addClass("btn btn-warning");
            // adding a data-attribute
            a.attr("data-name", topics[i]);
            // providing the button text
            a.text(topics[i]);
            // adding the button to the topics div
            $("#topics").append(a);
        }
    }

    // This function handles events where the add gif button is clicked
    $("#add-gif").on("click", function(event) {
        event.preventDefault();
        // grab input from the text box
        var topic = $("#gif-input").val().trim();

        // add text from textbox to topics array
        topics.push(topic);

        // calling renderButtons to process gif array
        renderButtons();
    });

    // Adding click event listeners to all elements with a class of "topic" that will run displayGifInto function
    $(document).on("click", ".topic", displayGifInfo);

    // display the initial buttons
    renderButtons();

    //function for when gifs are clicked... because gifs are dynamically created, 
    $("#gif-view").on("click", ".gif", function() {
        //save state on clicked gif to a variable
        var state = $(this).data("state");
        //console.log(state);
        //if state is still, then set the URL to the animated image URL and set state to animate
        if (state === "still"){
          $(this).attr("src", $(this).data("animate"));
          $(this).data("state", "animate");
        }
        //if state is animate, then set the URL to the still image URL and set state to animate
        else {
          $(this).attr("src", $(this).data("still")); 
          $(this).data("state", "still");
        }
    });
});