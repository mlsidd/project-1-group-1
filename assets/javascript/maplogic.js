

var dataRef = firebase.database();


var svcpvdrs = new Array();



function initialize_main_page_map()
{
 
  qurl="https://maps.googleapis.com/maps/api/geocode/json?address="+userinfo.address+"&key=AIzaSyDTwlzUpyLqmmDTtdCr2wM18mYBmnnIUfE";
 
var a
//json api call for address to coordinates.
//address= dude.address+" "+dude.city+" "+dude.state+" "+dude.zip;
  $.ajax({
    method:"GET",
    url:qurl
}).then(function(result){
  dataRef.ref("svcproviders").once("value", function(snapshot){
    console.log(snapshot.val());
    providers = snapshot.val();
    

a=result;



console.log(a);
console.log(a.results[0].geometry.location);
addycoordinates=a.results[0].geometry.location;
let pos = addycoordinates;
var mapOptions={
  center: new google.maps.LatLng(pos.lat,pos.lng),
  //mapType: google.maps.MapTypeid.ROADMAP,
  zoom:13
};

var map = new google.maps.Map(document.getElementById('main_page_map'),mapOptions);
var scontent = new Array();
var sinfo = new Array();
var smarker = new Array();
for(let i=0;i<providers.length;i++)
{  let s = providers[i] ;
  
   scontent.push("name: "+s.name+"<br>rating: "+s.rating+"<br>about: "+s.about+"<br>price per sqft: "+s.price+"<br> number: "+s.number);
   sinfo.push( new google.maps.InfoWindow({content:scontent[i]}));
    smarker.push( new google.maps.Marker({
     position:s.coordinates,
     map:map,
     title:s.name
     
   }));
   smarker[i].addListener('click',function(){sinfo[i].open(map,smarker[i]);});
   console.log("testing");
}
console.log(a);

useraddy = new google.maps.InfoWindow;
useraddy.setPosition(pos);
useraddy.setContent(a.results[0].formatted_address);
useraddy.open(map);



});
});

};

function loadScript(func)
{
  var script = $("<script>");
  script.attr("src",'https://maps.googleapis.com/maps/api/js?libraries=places&key=AIzaSyDTwlzUpyLqmmDTtdCr2wM18mYBmnnIUfE&callback='+func);
  $("body").append(script);
  console.log("script loaded");
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




      //fill in address needs to take input addy and place a pin on the map
var userinfo={address:""};
      function fillInAddress() {
        console.log("test");
        
        // Get the place details from the autocomplete object.
        var place = autocomplete.getPlace();
        userinfo.address = place.formatted_address;
        localStorage.setItem("address",JSON.stringify({
          formatted:place.formatted_address,
          street_number:place.address_components[0],
          street_name:place.address_components[1],
          city:place.address_components[3],
          state:place.address_components[5],
          zip:place.address_components[7]}));
        initialize_main_page_map();

      }

      


      //function to initialize landing page map
async function initialize_landing_page_map()
      { 
        userinfo = await grab_user_data();
        console.log(userinfo.address);
        qurl="https://maps.googleapis.com/maps/api/geocode/json?address="+userinfo.address+"&key=AIzaSyDTwlzUpyLqmmDTtdCr2wM18mYBmnnIUfE";
 
        var a
        //json api call for address to coordinates.
        //address= dude.address+" "+dude.city+" "+dude.state+" "+dude.zip;
          $.ajax({
            method:"GET",
            url:qurl
        }).then(function(result){
          dataRef.ref("svcproviders").once("value", function(snapshot){
            console.log(snapshot.val());
            providers = snapshot.val();
            
        
        a=result;
        
        
        
        console.log(a);
        console.log(a.results[0].geometry.location);
        addycoordinates=a.results[0].geometry.location;
        let pos = addycoordinates;
        var mapOptions={
          center: new google.maps.LatLng(pos.lat,pos.lng),
          
          zoom:13
        };
        
        var map = new google.maps.Map(document.getElementById('clp_map'),mapOptions);
        var scontent = new Array();
        var sinfo = new Array();
        var smarker = new Array();
        for(let i=0;i<providers.length;i++)
        {  let s = providers[i] ;
          
           scontent.push("name: "+s.name+"<br>rating: "+s.rating+"<br>about: "+s.about+"<br>price per sqft: "+s.price+"<br> number: "+s.number+"<br><button class='messageprovider' id='"+s.name+"'>message</button>");
           sinfo.push( new google.maps.InfoWindow({content:scontent[i]}));
            smarker.push( new google.maps.Marker({
             position:s.coordinates,
             map:map,
             title:s.name
             
           }));
           smarker[i].addListener('click',function(){sinfo[i].open(map,smarker[i]);
            $(".messageprovider").on("click",function(){sessionStorage.setItem("to",$(this).attr("id"));build_channel();window.location.href="./messages.html"})});
           console.log("testing");
        }
        
        
        useraddy = new google.maps.InfoWindow;
        useraddy.setPosition(pos);
        useraddy.setContent(a.results[0].formatted_address);
        useraddy.open(map);
        
        
        
        });
        });

      }

markerArray = new Array();
//svp drop pin to select service area

async function initialize_provider_map()
      { var clickpos;
        userinfo = await grab_provider_data();
        console.log(userinfo.city);
        qurl="https://maps.googleapis.com/maps/api/geocode/json?address="+userinfo.city+" "+userinfo.state+"&key=AIzaSyDTwlzUpyLqmmDTtdCr2wM18mYBmnnIUfE";
 
        var a;
        //json api call for address to coordinates.
        //address= dude.address+" "+dude.city+" "+dude.state+" "+dude.zip;
         await $.ajax({
            method:"GET",
            url:qurl
        }).then(function(result){
          a=result;
        
        
          console.log(userinfo.city+" "+userinfo.state);
          
        addycoordinates=a.results[0].geometry.location;
         pos = addycoordinates;
         mapOptions={
          center: new google.maps.LatLng(pos.lat,pos.lng),
          
          zoom:9
        };
        $("#placeholderForLandingPageDisplay").append("<div id='plp_map'></div>");
         map = new google.maps.Map(document.getElementById('plp_map'),mapOptions);
         

        
        
        google.maps.event.addListener(map, 'click',async function(event){
        clickpos = {lat:event.latLng.lat(),lng:event.latLng.lng()}
        console.log(clickpos);
        console.log(userinfo.userKey);
        //firebase.database().ref("providers").child(userinfo.userKey).remove("coordinates");
        firebase.database().ref("providers").child(userinfo.userKey).child("coordinates").set(clickpos);
        userinfo = await grab_provider_data();
               for(i=0; i<markerArray.length; i++){
          markerArray[i].setMap(null);
                }
        markerArray.push(new google.maps.Marker({
          position:userinfo.coordinates,
          map:map,
          title:"service area"}));
 


       /* serviceArea = new google.maps.Marker({
          position:userinfo.coordinates,
          map:map,
          title:"service area"});*/

        });
 
        });
        var bool = await firebase.database().ref("providers").child(userinfo.userKey).child("coordinates").once("value",function(snapshot){return snapshot.exists();});
        if(bool){
          markerArray.push(new google.maps.Marker({
            position:userinfo.coordinates,
            map:map,
            title:"service area"}));
        }
      }

