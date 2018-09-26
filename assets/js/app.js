var searchButtons = ["jurassic Park", "Star Wars", "Indiana Jones", "Matrix"]
//Show buttons with info from searchButtons 
function renderButtons() {
    // Empties array so we dont repeat buttons 
    $("#buttonsDiv").empty();
    //loops through searchButtons and makes a button for each element
    for (i = 0; i < searchButtons.length; i++) {
        $("<button>").text(searchButtons[i]).addClass("btn btn-info m-1").appendTo("#buttonsDiv");
    }
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

});


renderButtons();

