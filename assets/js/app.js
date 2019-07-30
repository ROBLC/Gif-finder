//Set up global variables
var searchButtons = ["jurassic Park", "star wars", "indiana jones", "matrix", "rocky"]
var searchBttnName = "";
var searchStatus;
var still;
var animate;
var i;
var search = "";

//Show buttons with info from searchButtons 
function renderButtons() {
    // Empties array so we dont repeat buttons 
    $("#buttonsDiv").empty();
    //Loops through searchButtons and makes a button for each element
    for (i = 0; i < searchButtons.length; i++) {
        $("<button>").attr("data-search", searchButtons[i].toLowerCase()).text(searchButtons[i]).addClass("btn m-1 searchItem").appendTo("#buttonsDiv");
    }
}
//Function to get GIFs from giphy API when calling from button
function getGifs(searchStatus, searchBttnName) {

    //Clears previously filled divs in HTML
    $("#gif-area").empty();
    $(".card-footer").empty();
    //checks searchStatus to determine if its a new search or an old one 
    if (searchStatus === false) {
        search = searchBttnName;
    }
    else if (searchStatus === true) {
        search = newSearch;
    }
    //Establish variable to store giphy API link with dynamic user input 
    var GIFqueryURL = "https://api.giphy.com/v1/gifs/search?q=" + search + "&api_key=MNeVSWOTAJfR0WYeV1TbsDchBXgR4yhS&limit=10"

    //Resets i to 0 before running ajax
    i = 0;
    //Runs ajax to get response from giphy API then dynamically creates a bootstrap card for each instance of i with a for loop   
    $.ajax({
        url: GIFqueryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        var gifsArray = response.data
        for (i = 0; i < gifsArray.length; i++) {
            var columnDiv = $("<div>").addClass("col-md-4 float-left");
            var cardDiv = $("<div>").addClass("card mb-4").appendTo(columnDiv);
            var gifImg = $("<img>").addClass("card-img-top GIF").attr("data-animate", gifsArray[i].images.fixed_height.url).attr("data-still", gifsArray[i].images.fixed_height_still.url).attr("src", gifsArray[i].images.fixed_height_still.url).attr("data-state", "still").appendTo(cardDiv);
            gifImg.attr("height", "200px").attr("width", "200px")
            var cardBody = $("<div>").addClass("card-body gif-card-body").appendTo(cardDiv);
            var cardText = $("<div>").addClass("card-text").appendTo(cardBody);
            var title = $("<p>").text("Title: " + gifsArray[i].title).addClass("mb-1").appendTo(cardText);
            var rating = $("<p>").text("Rating: " + gifsArray[i].rating).addClass("mb-1").appendTo(cardText);
            $(columnDiv).prependTo($("#gif-area"))
        }
    });
    //creates button to be able to ask for more GIFs
    $("<button>").addClass("btn").text("Give me more GIFs!!").attr("id", "moreButton").appendTo(".card-footer");
    $("#gif-area-text").css("display", "none");
}

//Function to get more GIFs from giphy API
function moreGifs() {
    //Sets local variable j 
    var j = i + 10;
    //Establish variable to store giphy API link with dynamic user input
    var GIFqueryURL = "https://api.giphy.com/v1/gifs/search?q=" + search + "&api_key=MNeVSWOTAJfR0WYeV1TbsDchBXgR4yhS&limit=200"

    //runs ajax and dynamically creates another 10 cards with gifs in them each times its' run, uses for loop with variables i and j to get the right gifs and the correct length
    $.ajax({
        url: GIFqueryURL,
        method: "GET"
    }).then(function (response) {

        var gifsArray = response.data
        for (i; i < j; i++) {
            var columnDiv = $("<div>").addClass("col-md-4 float-left");
            var cardDiv = $("<div>").addClass("card mb-4").appendTo(columnDiv);
            var gifImg = $("<img>").addClass("card-img-top GIF").attr("data-animate", gifsArray[i].images.fixed_height.url).attr("data-still", gifsArray[i].images.fixed_height_still.url).attr("src", gifsArray[i].images.fixed_height_still.url).attr("data-state", "still").appendTo(cardDiv);
            gifImg.attr("height", "200px").attr("width", "200px")
            var cardBody = $("<div>").addClass("card-body gif-card-body").appendTo(cardDiv);
            var cardText = $("<div>").addClass("card-text").appendTo(cardBody);
            var title = $("<p>").text("Title: " + gifsArray[i].title).addClass("mb-1").appendTo(cardText);
            var rating = $("<p>").text("Rating: " + gifsArray[i].rating).addClass("mb-1").appendTo(cardText);
            $(columnDiv).appendTo($("#gif-area"))

        }

    });
}
//Event listener for click on search 
$("#addSearch").on("click", function (event) {
    //Prevents form to submit/refresh
    event.preventDefault();
    //sets newSearch to user input
    newSearch = $("#searchInput").val().trim().toLowerCase();
    //if statement to check if a search is already in array 
    if (searchButtons.includes(newSearch)) {
        alert("already in array")
    }
    else {
        searchButtons.push(newSearch);
        getGifs(true);
    }
    // Renders the buttons in array 
    renderButtons();
    //Reset the form each time a search is added
    $("#searchForm")[0].reset();
});
//Event listener for searchButtons that runs the getGifs function when pressed
$(document).on("click", ".searchItem", function (event) {

    searchBttnName = event.target.attributes[0].value
    getGifs(false, searchBttnName)
});
//Event listener for GIFs that animate or pause the GIF on click
$(document).on("click", ".GIF", function () {

    var state = $(this).attr("data-state");
    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    }
    else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
});
//Event listener for the more button at bottom that loads 10 more gifs each time
$(document).on("click", "#moreButton", moreGifs);
//Makes intial buttons for the string preloaded in searchButtons when you first open page
renderButtons();





