// API key
var apiKey = "j35DYxgdTMaAnK6LR98HkviwSyGhfIul"

// Event listener for the search button
$("#search-button").on("click", function (event) {
    // event.preventDefault() function prevents the forms from trying to submit itself.
    event.preventDefault();
    // call search function
    searchArticle();
})

// access api in order to retrive articles

function searchArticle() {

    var userSearch = $("#search").val().trim();
    var queryURL = "https://core.ac.uk:443/api-v2/search/" + userSearch + "?page=1&pageSize=10&apiKey=" + apiKey;

    // clear input value after user clicks on search
    $("#search").val("");

    // Make the AJAX request to the API - GETs the JSON data at the queryURL.
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);

        for (var i = 0; i < 5; i++) {
            var authors = response.data[i]._source.authors[i];
            var description = response.data[i]._source.description;
            var datePublished = response.data[i]._source.datePublished;
            var topics = response.data[i]._source.topics[i];
            var urls = response.data[i]._source.urls[i];
            var inquiry = $("<h3>");
            var authorsEl = $("<h4>");
            var descriptionEl = $("<h5>");
            var datePublishedEl = $("<p>");
            var topicsEl = $("<p>");
            var urlsEl = $("<a>");
            urlsEl.attr("href", urls);
            urlsEl.attr("target", "_blank");
            inquiry.addClass("new-class");
            inquiry.attr("data-name", userSearch);
            descriptionEl.attr("style", "text-align: justify");
            inquiry.text(userSearch);
            authorsEl.text(authors);
            descriptionEl.text(description);
            datePublishedEl.text(datePublished);
            topicsEl.text(topics);
            urlsEl.text(urls);
            // prepend the results on div #main-content
            $("#main-content").prepend(authorsEl);
            $("#main-content").prepend(descriptionEl);
            $("#main-content").prepend(datePublishedEl);
            $("#main-content").prepend(topicsEl);
            $("#main-content").prepend(urlsEl);
            $("#main-content").prepend(inquiry);
            
        }
        doWiki();
    });
}

function doWiki() {
    var searchWiki = $(".new-class").attr("data-name");
    var after = (encodeURIComponent(searchWiki.trim()));
    console.log(searchWiki);
    console.log(after);
    
    // console.log(afterSeacrWiki);
    
    var wikiURL = "https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&srlimit=10&sroffset=10&srsearch=" + after;

    $.ajax({
        url: wikiURL,
        dataType: 'jsonp',
        success: function (data) {
            console.log(data);
            console.log(wikiURL);
            var wikiEl = data.query.search[0].snippet;
            console.log(wikiEl);
            $("#main-content").append(wikiEl);
            
        }
    });
}
