
$(document).ready(function () {

    var lat;
    var lon;
    var api_url;

    if ("geolocation" in navigator) {

        navigator.geolocation.getCurrentPosition(gotLocation);

        function gotLocation(position) {
            lat = position.coords.latitude;
            lon = position.coords.longitude;

            api_url = 'https://api.openweathermap.org/data/2.5/forecast/daily?lat=' +
                lat + '&lon=' +
                lon + '&cnt=16&appid=b231606340553d9174136f7f083904b3';

            $.ajax({
                url: api_url,
                method: 'GET',
                success: function (data) {

                    for (i = 0; i < 16; i++) {
                        let info = data.list
                        console.log(info[i])

                        var day = moment(info[i].dt).format('MMMM Do YYYY, h:mm:ss a');
                        var rain = info[i].weather[0].main;
                        var rainType = info[i].weather[0].description;
                        var icon = info[i].weather[0].icon;
                        var iconSrc = "http://openweathermap.org/img/w/" + icon + ".png"
                        var tempHi = Math.floor(info[i].temp.max - 273);
                        var tempLow = Math.floor(info[i].temp.min - 273);

                        console.log(day)
                        $('#result').append("<tr><td>" +
                            day + "</td><td>" +
                            rain + "</td><td>" +
                            rainType + "</td><td>" +
                            tempHi + "</td><td>" +
                            tempLow + "</td><td>" +
                            "<img src=" + iconSrc + "></td></tr>"
                        );
                    }

                }
            });
        }
    } else {
        $(".container").empty();
        $(".container").append("<h3>" + "Sorry, your browser does not support this feature." + "</h3>");
    }



});