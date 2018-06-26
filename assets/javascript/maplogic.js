/*
var address;
var coord = {lat:0,lng:0};
//google maps stuff

// Note: This example requires that you consent to location sharing when
  // prompted by your browser. If you see the error "The Geolocation service
  // failed.", it means you probably did not give permission for the browser to
  // locate you.
  var map, infoWindow;
  var myposition;
  function initMap() {
    map = new google.maps.Map(document.getElementById('main_page_map'), {
      center: {lat: 29.760426700000004, lng: -95.3698028},
      zoom: 6
    });
    infoWindow = new google.maps.InfoWindow;
   
    // Try HTML5 geolocation.
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        var pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        console.log(pos);
        myposition=pos;
        infoWindow.setPosition(pos);
        infoWindow.setContent('you are here.');
        infoWindow.open(map);
        map.setCenter(pos);
      }, function() {
        handleLocationError(true, infoWindow, map.getCenter());
      });
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false, infoWindow, map.getCenter());
    }
  }

  function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
                          'Error: The Geolocation service failed.' :
                          'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(map);
  }

*/



users = firebase.database().ref().child("users");
dummyArray = [
    {  usertype:"client",
	username: "Aplumly",
	password: "password",
   index:0,
   firstname:"Austin",
   lastname:"Plumly",
   address:"15018 Rose Valley dr.",
   state:"TX",
   city:"Houston",
   zip: 77070,
   phone: 2818813597,
   sqft:20,
   coordinates:{lat:29.992148399999998,
                lng:-95.3698028},
   messages:
       [{sent_or_recieved:"recieved",
	   	 sender:"string",
         message:"string",
         timestamp:0
         },
		 {sent_or_received:"sent",
		   recipient:"string",
		   message:"string",
		   timestamp:0},
		   
       ],
   calendar:{monday:true,
             tuesday:true,
             wednesday:true,
             thursday:true,
             friday:true} 

    },
    {
          usertype:"client",
        username: "JSON",
        password: "password",
       index:1,
       firstname:"JAVASCRIPT",
       lastname:"ONOTATION",
       address:"11703 Cedar Point ct.",
       state:"TX",
       city:"Houston",
       zip: 77070,
       phone: 2818813597,
       sqft:20,
       coordinates:{lat:0,
                    lng:0},
       messages:
           [{sent_or_recieved:"recieved",
                sender:"string",
             message:"string",
             timestamp:0
             },
             {sent_or_received:"sent",
               recipient:"string",
               message:"string",
               timestamp:0},
               
           ],
       calendar:{monday:true,
                 tuesday:true,
                 wednesday:true,
                 thursday:true,
                 friday:true} 

    },
    {    usertype:"service",
    index:2,
    name:"paulie",
    price:10,
    coordinates:{lat:29.760426700000004,
                 lng:-95.3698028},
    calendar:{monday:true,
              tuesday:true,
              wednesday:true,
              thursday:true,
              friday:true
              },
     messages:[{sender:"string",
          message:"string",
          timestamp:0
          }
        ]

    }
];
guy={
    usertype:"service",
    index:3,
    name:"wallie",
    price:10,
    coordinates:{lat:29.760426700000004,
                 lng:-95.3698028},
    calendar:{monday:true,
              tuesday:true,
              wednesday:true,
              thursday:true,
              friday:true
              },
     messages:[{sender:"string",
          message:"string",
          timestamp:0
          }
        ]
}
let array = new Array();
users.on('value',function(snapshot)
{
    array=snapshot;
});

firebase.database().ref("users").set(dummyArray);
firebase.database().ref("users").push(guy);


/*


function init()
{
  var mapOptions={
    center: new google.maps.LatLng({lat: 29.760426700000004, lng: -95.3698028}),
    zoom:6
  };
  var map;
  map = new google.maps.Map(document.getElementById('main_page_map'),mapOptions);

  
};

function loadScript()
{
  var script = $("<script>");
  script.attr("src",'https://maps.googleapis.com/maps/api/js?key=AIzaSyDTwlzUpyLqmmDTtdCr2wM18mYBmnnIUfE&callback=init');
  $("body").append(script);



}




*/




//create a function that if(service provider)
//       grab coordinates and push to respective user obj


//if an infowindow or pin is clicked pull up respective info
// on client side
//... do this for service provider

//find a way to take users addy and push it to maps.
//also sets their coordinates in firebase?


//function that takes address and returns street view/
//and or close top down view
dude=dummyArray[0];
//json api call for address to coordinates.
address= dude.address+" "+dude.city+" "+dude.state+" "+dude.zip;
qurl="https://maps.googleapis.com/maps/api/geocode/json?address="+address+"&key=AIzaSyDTwlzUpyLqmmDTtdCr2wM18mYBmnnIUfE";
var a;
$.ajax({
    method:"GET",
    url:qurl
}).then(function(result){a=result;
console.log(a)});





function init()
{
  var mapOptions={
    center: new google.maps.LatLng(29.760426700000004,-95.3698028),
    //mapType: google.maps.MapTypeid.ROADMAP,
    zoom:13
  };
  qurl="https://maps.googleapis.com/maps/api/geocode/json?address="+address+"&key=AIzaSyDTwlzUpyLqmmDTtdCr2wM18mYBmnnIUfE";
  var map = new google.maps.Map(document.getElementById('main_page_map'),mapOptions);
dude=dummyArray[0];
//json api call for address to coordinates.
address= dude.address+" "+dude.city+" "+dude.state+" "+dude.zip;
  $.ajax({
    method:"GET",
    url:qurl
}).then(function(result){
a=result;
console.log(a);
console.log(a.results[0].geometry.location);
addycoordinates=a.results[0].geometry.location;
let pos = addycoordinates;
useraddy = new google.maps.InfoWindow;
useraddy.setPosition(pos);
useraddy.setContent(a.results[0].formatted_address);
useraddy.open(map);
});
/*
function test(x)
{ //create a for user array length loop
    //if(isservice)& service provider is within x distance from you
    //drop a pin on their coordinates.
  
let pos = addycoordinates;
useraddy = new google.maps.InfoWindow;
useraddy.setPosition(pos);
useraddy.setContent('here is dude.');
useraddy.open(map);
}  
test(0);*/



var a;
$.ajax({
    method:"GET",
    url:qurl
}).then(function(result){
a=result;
console.log(a);
console.log(a.results[0].geometry.location);
addycoordinates=a.results[0].geometry.location;
});
};

function loadScript()
{
  var script = $("<script>");
  script.attr("src",'https://maps.googleapis.com/maps/api/js?libraries=places&key=AIzaSyDTwlzUpyLqmmDTtdCr2wM18mYBmnnIUfE&callback=init');
  $("body").append(script);

}

    // This example displays an address form, using the autocomplete feature
      // of the Google Places API to help users fill in the information.

      // This example requires the Places library. Include the libraries=places
      // parameter when you first load the API. For example:
      // <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">

      var placeSearch, autocomplete;
      var componentForm = {
        street_number: 'short_name',
        route: 'long_name',
        locality: 'long_name',
        administrative_area_level_1: 'short_name',
        country: 'long_name',
        postal_code: 'short_name'
      };

      function initAutocomplete() {
        // Create the autocomplete object, restricting the search to geographical
        // location types.
        autocomplete = new google.maps.places.Autocomplete(
            /** @type {!HTMLInputElement} */(document.getElementById('addy')),
            {types: ['geocode']});

        // When the user selects an address from the dropdown, populate the address
        // fields in the form.
        autocomplete.addListener('place_changed', fillInAddress);
      }

      function fillInAddress() {
        // Get the place details from the autocomplete object.
        var place = autocomplete.getPlace();

        for (var component in componentForm) {
          document.getElementById(component).value = '';
          document.getElementById(component).disabled = false;
        }

        // Get each component of the address from the place details
        // and fill the corresponding field on the form.
        for (var i = 0; i < place.address_components.length; i++) {
          var addressType = place.address_components[i].types[0];
          if (componentForm[addressType]) {
            var val = place.address_components[i][componentForm[addressType]];
            document.getElementById(addressType).value = val;
          }
        }
      }

      // Bias the autocomplete object to the user's geographical location,
      // as supplied by the browser's 'navigator.geolocation' object.
      function geolocate() {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            var geolocation = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
            var circle = new google.maps.Circle({
              center: geolocation,
              radius: position.coords.accuracy
            });
            autocomplete.setBounds(circle.getBounds());
          });
        }
      }
window.onload = loadScript;





