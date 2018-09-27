var searchButtons = ["jurassic Park", "Star Wars", "Indiana Jones", "Matrix"]

//Show buttons with info from searchButtons 
function renderButtons() {
    // Empties array so we dont repeat buttons 
    $("#buttonsDiv").empty();
    //loops through searchButtons and makes a button for each element
    for (i = 0; i < searchButtons.length; i++) {
        $("<button>").attr("data-search", searchButtons[i]).text(searchButtons[i]).addClass("btn btn-info m-1 searchItem").appendTo("#buttonsDiv");
    }
}
function getGifs() {
    var search = $(this).attr("data-search");
    var GIFqueryURL = "http://api.giphy.com/v1/gifs/search?q=" + search + "&api_key=MNeVSWOTAJfR0WYeV1TbsDchBXgR4yhS&limit=10"
    console.log(search);

    $.ajax({
        url: GIFqueryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        var gifsArray = response.data
        for (var i = 0; i < gifsArray.length; i++) {
            var columnDiv = $("<div>").addClass("col-sm-4");
            var cardDiv = $("<div>").addClass("card").appendTo(columnDiv);
            var gifImg = $("<img>").addClass("card-img-top").attr("src", gifsArray[i].images.fixed_height_small_still.url).appendTo(cardDiv);
            var cardBody = $("<div>").addClass("card-body").appendTo(cardDiv);
            var cardText = $("<div>").addClass("card-text").appendTo(cardDiv);
            var title = $("<p>").text("Title: " + gifsArray[i].title).addClass("text-center").appendTo(cardDiv);
            var rating = $("<p>").text("Rating: " + gifsArray[i].rating).addClass("text-center").appendTo(cardDiv);


            $(columnDiv).prependTo($(".jumbotron"))

        }
    });
}

$("#addSearch").on("click", function (event) {
    event.preventDefault();

    var newSearch = $("#searchInput").val().trim();
    //if statement to check if a search is already in array 
    if (searchButtons.includes(newSearch)) {
        console.log("already in array")
    }
    else {
        searchButtons.push(newSearch);
    }
    // The renderButtons function is called, rendering the list of movie buttons
    renderButtons();
    //reset the form each time a search is added
    $("#searchForm")[0].reset();
    getGifs();
});
$(document).on("click", ".searchItem", getGifs)


renderButtons();

