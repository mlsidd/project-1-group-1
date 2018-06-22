// IF user is going to create new account...
//----------------if else statements will start here once incluce these features-----------------
// Get the client's user name and password from the input boxes
var clientUserName = "";
var clientPassword = "";
var clientFirst = "";
var clientLast = "";
var address = "";
var address2 = "";
var city = "";
var state = "";
var zip = "";
var phone = "";
var squareFootage = 0;
var servicesNeeded = [];


// IF user is going to use google account to sign up
//-------------------enter code here for using Google API-------------------

//IF user is going to use facebook to sign up
//------------------enter code here for using facebook API--------------------------

   // Capture Button Click
$("#create-client-account").on("click", function(event) {
    event.preventDefault();

    // Get the user's data from the input boxes for Firebase database.
    clientUserName = $("#email-input").val().trim();
    clientPassword = $("#password-input").val().trim();
});

   // Capture Button Click
   $("#create-client-profile").on("click", function(event) {
    event.preventDefault();

// Initialize Firebase
var config = {
    apiKey: "AIzaSyCLbEjKvRPiZdO3I6ADlExj_N0ZD60nATk",
    authDomain: "recent-user-with-all-users.firebaseapp.com",
    databaseURL: "https://recent-user-with-all-users.firebaseio.com",
    storageBucket: "recent-user-with-all-users.appspot.com"
  };
  
  firebase.initializeApp(config);
  
  var dataRef = firebase.database();

    // Push client data to Firebase
    dataRef.ref().push({
    
    usertype: "client",
    username: clientUserName,
    password: clientPassword,
    firstname: clientFirst,
    lastname: clientLast,
    address: address,
    address2: address2,
    state: state,
    city: city,
    zip: zip,
    phone: phone,
    sqft: squareFootage,
    servicesneeded: servicesNeeded,
    coordinateslat: coordinatesLat,
    coordianteslong: coordinatesLong, 
    calendar: {monday}, //need to figure this out
    dateAdded: firebase.database.ServerValue.TIMESTAMP
    });
   });
