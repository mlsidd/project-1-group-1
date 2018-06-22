
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
    var autocomplete = new google.maps.places.Autocomplete($("#addy"));
    google.maps.events.addListener(autocomplete,'plac_changed',function(){
        var places = autocomplete.getplace();
        address = places.formatted_address
        coord= {lat:places.geometry.location.A,
                lng:places.geometry.location.F};
        console.log(coord);
        console.log(address);
        
    });
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


function test(x)
{ //create a for user array length loop
    //if(isservice)& service provider is within x distance from you
    //drop a pin on their coordinates.

let pos = dummyArray[x].coordinates;
let dude = new google.maps.InfoWindow;
dude.setPosition(pos);
dude.setContent('here is dude.');
dude.open(map);
}
test(0);
test(2);
test(3);




//create a function that if(service provider)
//       grab coordinates and push to respective user obj


//if an infowindow or pin is clicked pull up respective info
// on client side
//... do this for service provider

//find a way to take users addy and push it to maps.
//also sets their coordinates in firebase?


//function that takes address and returns street view/
//and or close top down view