var searchButtons = ["jurassic Park", "Star Wars", "Indiana Jones", "Matrix"]
var newsSearch;
var still;
var animate;
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
    $("#gif-area").empty();
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
            var columnDiv = $("<div>").addClass("col-md-4 float-left");
            var cardDiv = $("<div>").addClass("card mb-4").appendTo(columnDiv);
            var gifImg = $("<img>").addClass("card-img-top GIF").attr("data-animate", gifsArray[i].images.fixed_height.url).attr("data-still", gifsArray[i].images.fixed_height_still.url).attr("src", gifsArray[i].images.fixed_height_still.url).attr("data-state", "still").appendTo(cardDiv);
            gifImg.attr("height", "200px").attr("width", "200px")
            var cardBody = $("<div>").addClass("card-body").appendTo(cardDiv);
            var cardText = $("<div>").addClass("card-text").appendTo(cardBody);
            var title = $("<p>").text("Title: " + gifsArray[i].title).addClass("mb-1").appendTo(cardText);
            var rating = $("<p>").text("Rating: " + gifsArray[i].rating).addClass("mb-1").appendTo(cardText);
            $(columnDiv).prependTo($("#gif-area"))
        }
    });
}

function getGifs2() {
    $("#gif-area").empty();
    var search = newSearch;
    var GIFqueryURL = "http://api.giphy.com/v1/gifs/search?q=" + search + "&api_key=MNeVSWOTAJfR0WYeV1TbsDchBXgR4yhS&limit=10"
    console.log(search);

    $.ajax({
        url: GIFqueryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        var gifsArray = response.data
        for (var i = 0; i < gifsArray.length; i++) {
            var columnDiv = $("<div>").addClass("col-md-4 float-left");
            var cardDiv = $("<div>").addClass("card mb-4").appendTo(columnDiv);
            var gifImg = $("<img>").addClass("card-img-top GIF").attr("data-animate", gifsArray[i].images.fixed_height.url).attr("data-still", gifsArray[i].images.fixed_height_still.url).attr("src", gifsArray[i].images.fixed_height_still.url).attr("data-state", "still").appendTo(cardDiv);
            gifImg.attr("height", "200px").attr("width", "200px")
            var cardBody = $("<div>").addClass("card-body").appendTo(cardDiv);
            var cardText = $("<div>").addClass("card-text").appendTo(cardBody);
            var title = $("<p>").text("Title: " + gifsArray[i].title).addClass("mb-1").appendTo(cardText);
            var rating = $("<p>").text("Rating: " + gifsArray[i].rating).addClass("mb-1").appendTo(cardText);
            $(columnDiv).prependTo($("#gif-area"))
        }
    });
}

$("#addSearch").on("click", function (event) {
    event.preventDefault();

    newSearch = $("#searchInput").val().trim();
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
    getGifs2();
});
renderButtons();

$(document).on("click", ".searchItem", getGifs)
$(document).on("click", ".GIF", function () {
    console.log(this);
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




