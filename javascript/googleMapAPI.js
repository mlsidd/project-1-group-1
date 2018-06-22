
var queryUrl = "https://www.google.com/maps/embed/v1/search?key=" + apiKey + "&q=" + addressSearch;
var apiKey = "AIzaSyDPJDvPWJ5bski_HrtiFnpkW5p16dGzSEc";
var addressSearch = $("#addressInput").val().trim();

$.ajax({
    url: queryURL,
    method: "GET"
  })
    // After the data comes back from the API
    .then(function(response) {
      // Storing an array of results in the results variable
      var results = response.data;

      console.log(results);
    })
