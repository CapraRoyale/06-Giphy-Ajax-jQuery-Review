// Execute all code AFTER the page HTML and CSS fully loads
$(document).ready(function() {
    // Create an array of animal names
    var animals = [
        "dog", "cat", "rabbit", "hamster", "skunk", "goldfish",
        "bird", "ferret", "turtle", "sugar glider", "chinchilla",
        "hedgehog", "hermit crab", "gerbil", "pygmy goat", "chicken",
        "capybara", "teacup pig", "serval", "salamander", "frog"
    ];
    // Create a function to generate buttons on the page for every string in the previously-defined array
    function populateButtons(arrayToUse, classToAdd, areaToAddTo) {
        // Clear the areaToAddTo variable to prevent appending on to existing content
        $(areaToAddTo).empty();
        //Create a loop to generate valid HTML for each string in the array
        for (var i = 0; i < arrayToUse.length; i++) {
            // Create a variable to hold HTML button element attributes
            var a = $("<button>");
            //Add class attribute to the 'a' variable
            a.addClass(classToAdd);
            //Create a new attribute called 'data-type' and generate a new value for each string in the array
            a.attr("data-type", arrayToUse[i]);
            //Define the each buttons text content by each string of the array
            a.text(arrayToUse[i]);
            //Append the aforementioned a variable to the page based on the HTML Element defined in the areaToAddTo variable
            $(areaToAddTo).append(a);
        }

    }
    //Apply a 'click' function to all instances of .animal-button 
    $(document).on("click", ".animal-button", function() {
        //Clear all items with the ID 'animals'
        $("#animals").empty();
        // Remove the class atribute from al items with the class 'animal-button'
        $(".animal-button").removeClass("active");
        //Apply the active class to only THIS instance of 'animal-button'
        $(this).addClass("active");
        // Create a variable defined by the current item's "data-type" attribute, previously defined by the loop above
        var type = $(this).attr("data-type");
        //Query the Giphy API with the string of text from the above variable, 'type'
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + type + "&api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&limit=10";
        //Utilize the ajax method to query the Giphy API
        $.ajax({
                url: queryURL,
                method: "GET"
            })
            //When the query returns, execute a function
            .then(function(response) {
                //Create a variable to contain all of the data withing the query response
                var results = response.data;
                //Execute a for loop, iterating for every Giphy API response item
                for (var i = 0; i < results.length; i++) {
                    //create a variable definign an HTML div element with the 'class' attribute called 'animal-item'
                    var animalDiv = $("<div class=\"animal-item\">");
                    //Create a variable called rating to contain the rating of the current Giphy result
                    var rating = results[i].rating;
                    //Create a variable to contain HTML paragraph element containing text defined by the results variable
                    var p = $("<p>").text("Rating: " + rating);
                    //Create two variables corelating an animated and still state for displaying the GIF
                    var animated = results[i].images.fixed_height.url;
                    var still = results[i].images.fixed_height_still.url;
                    //Create a variable containing an HTML img element 
                    var animalImage = $("<img>");
                    //Defined a variety of attributes attached to the previously defined img element
                    animalImage.attr("src", still);
                    animalImage.attr("data-still", still);
                    animalImage.attr("data-animate", animated);
                    animalImage.attr("data-state", "still");
                    animalImage.addClass("animal-image");
                    //Attach the p variable and animalImage variable, with their associated attributes, to the previously defined animalDiv variable
                    animalDiv.append(p);
                    animalDiv.append(animalImage);
                    //Attach the animalDiv, with its asociated p and animalImage variables and attached attributes, to the HTML element with ID 'animals'
                    $("#animals").append(animalDiv);
                }
            });
    });
    //Create a click function realting to all items with the 'animal-image' class
    $(document).on("click", ".animal-image", function() {
        //Create a variable called state, containing the HTML element attribute associated with the current elements 'animal-image' class
        var state = $(this).attr("data-state");
        //Create conditions  for the current state of the GIF, for an animated and a still state
        //If the current state is 'still', change the state to animated
        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
            //if the current state is NOT still, change it BACK to 'still'
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    });
    //Create a function that executes on the click event of the button on page with ID 'add-animal'
    $("#add-animal").on("click", function(event) {
        //Use the preventDefault method to ensure the input button doesn't submit anything if there's no data to submit
        event.preventDefault();
        // create a variable containing the 0th index value of the input
        var newAnimal = $("input").eq(0).val();
        //Create condition for the length of the newAnimal string, if its longer 
        if (newAnimal.length > 2) {
            animals.push(newAnimal);
        }
        //Execute the populateButtons function to populate the page with buttons defined by the variables defined above
        populateButtons(animals, "animal-button", "#animal-buttons");

    });
    //Execute the populateButtons function to populate the page with buttons defined by the variables defined above
    populateButtons(animals, "animal-button", "#animal-buttons");
});