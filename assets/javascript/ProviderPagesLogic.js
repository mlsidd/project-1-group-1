// IF user is going to create new account...
//----------------if else statements will start here once incluce these features-----------------
// Get the provider's user name and password from the input boxes
var providerUserName = "";
var providerPassword = "";
var providerFirst = "";
var providerLast = "";
var businessName = "";
var providerAddress = "";
var providerAddress2 = "";
var providerCity = "";
var providerState = "";
var providerZip = "";
var providerPhone = "";
var providerMiles = 0;
var servicesprovided = [];
var availableDays = [];
var uid = "";

// Initialize Firebase
var config = {
    apiKey: "AIzaSyDFhTiBSjTaFH-bYZdHI5v_FRS3nE76adk",
    authDomain: "thp1g1-1529168178742.firebaseapp.com",
    databaseURL: "https://thp1g1-1529168178742.firebaseio.com",
    projectId: "thp1g1-1529168178742",
    storageBucket: "thp1g1-1529168178742.appspot.com",
    messagingSenderId: "293280499251"
  };
  firebase.initializeApp(config);
    
  var dataRef = firebase.database();



// IF user is going to use google account to sign up
//-------------------enter code here for using Google API-------------------

//IF user is going to use facebook to sign up
//------------------enter code here for using facebook API--------------------------

   //-------------LOGIN PAGE CODE IS BELOW-------------//

   // Capture Button Click
$("#create_provider_account").on("click", function(event) {
    event.preventDefault();

    // Get the user's data from the input boxes for Firebase database.
    providerUserName = $("#email-input").val().trim();
    providerPassword = $("#password-input").val().trim();
    // form validation
    if(providerUserName.indexOf("@") == -1 && providerPassword.length < 7) {
        $("#data-validation-message").html("Make sure you are entering your email <p> Password must contain at least 7 characters");        
    } else if (providerPassword.length < 7) {
        $("#data-validation-message").text("Password must contain at least 7 characters");
    } else if (providerUserName.indexOf("@") == -1) {
        $("#data-validation-message").text("Make sure you are entering your email");
    } else if(providerUserName.indexOf("@") > 0 && providerPassword.length > 6) {
        firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            if (errorCode == 'auth/weak-password') {
                alert('The password is too weak.');
            } else {
                alert(errorMessage);
            }
  console.log(error);
          });

          dataRef.ref().push({

          usertype: "provider",
          uid = user.uid,
          username: providerUserName,
          password: providerPassword,
          firstname: providerFirst,
          lastname: providerLast,
          businessName: businessName,
          address: providerAddress,
          address2: providerAddress2,
          state: providerState,
          city: providerCity,
          zip: providerZip,
          phone: providerPhone,
          miles: providerMiles,
          availableDays: availableDays,
          servicesprovided: servicesprovided
          });

        window.location.href = "./Registration-Provider.html";
    }
    console.log(providerUserName);
    console.log(providerPassword);
});

   //-------------REGISTRATION PAGE CODE IS BELOW-------------//

   // Capture Button Click
   $("#create-provider-profile").on("click", function(event) {
    event.preventDefault();

    var user = firebase.auth().currentUser;

    if (user  != null) {
    // User is signed in.
     
    
    // Get values from input boxes
    providerFirst = $("#providerFirstName").val().trim();
    providerLast = $("#providerLastName").val().trim();
    businessName = $("#businessName").val().trim();
    providerAddress = $("#inputAddress").val().trim();
    providerAddress2 = $("#inputAddress2").val().trim();
    providerCity = $("#inputCity").val().trim();
    providerState = $("#inputState").val().trim();
    providerZip = $("#inputZip").val().trim();
    providerPhone = $("#providerPhoneNumber").val().trim();
    providerMiles = $("#miles").val().trim();
    //get the value only if the user checked the radio button
    if ($("#trimBushes").prop("checked")) {
        servicesprovided.push($("#trimBushes").val())
    }
    if ($("#edging").prop("checked")) {
        servicesprovided.push($("#edging").val())
    }
    if ($("#mowing").prop("checked")) {
        servicesprovided.push($("#mowing").val())
    }
    if ($("#monday").prop("checked")) {
        availableDays.push($("#monday").val())
    }
    if ($("#tuesday").prop("checked")) {
        availableDays.push($("#tuesday").val())
    }
    if ($("#wednesday").prop("checked")) {
        availableDays.push($("#wednesday").val())
    }
    if ($("#thursday").prop("checked")) {
        availableDays.push($("#thursday").val())
    }
    if ($("#friday").prop("checked")) {
        availableDays.push($("#friday").val())
    }
    if ($("#saturday").prop("checked")) {
        availableDays.push($("#saturday").val())
    }
    if ($("#sunday").prop("checked")) {
        availableDays.push($("#sunday").val())
    }
    
    // Push provider data to Firebase
    var user = firebase.auth().currentUser;

    user.updateProfile({
    
    firstname: providerFirst,
    lastname: providerLast,
    businessName: businessName,
    address: providerAddress,
    address2: providerAddress2,
    state: providerState,
    city: providerCity,
    zip: providerZip,
    phone: providerPhone,
    miles: providerMiles,
    availableDays: availableDays,
    servicesprovided: servicesprovided,
    //coordinateslat: coordinatesLat,
    //coordianteslong: coordinatesLong, 
    dateAdded: firebase.database.ServerValue.TIMESTAMP
    });

    if (providerFirst.length < 1) {
        $("#data-validation-message-registration").append("Enter your first name");
    } if (providerLast.length < 1) {
        $("#data-validation-message-registration").append("<p> Enter your last name");
    } if(providerAddress.length < 1) {
        $("#data-validation-message-registration").append("<p> Enter your address");
    } if(providerState.length < 3) {
        $("#data-validation-message-registration").append("<p> Make sure you select your state");
    } if(providerCity.length < 1) {
        $("#data-validation-message-registration").append("<p> Make sure you select your city");
    } if(providerZip.length < 5 || providerZip.length > 5) {
        $("#data-validation-message-registration").append("<p> Enter a valid zip code");
    } if(providerPhone.length < 10 || providerPhone.length > 10) {
        $("#data-validation-message-registration").append("<p> Enter a valid phone number");
    } if(providerMiles.length < 3) {
        $("#data-validation-message-registration").append("<p> Make sure you enter the amount of miles you are willing to travel");
    } if($("#monday").prop('checked') == false && $("#tuesday").prop('checked') == false && $("#wednesday").prop('checked') == false && $("#thursday").prop('checked') == false && $("#friday").prop('checked') == false && $("#saturday").prop('checked') == false && $("#sunday").prop('checked') == false) {
        $("#data-validation-message-registration").append("Make sure to select at least 1 day your are available"); 
    } if($("#mowing").prop('checked') == false && $("#trimBushes").prop('checked') == false && $("#edging").prop('checked') == false) {
        $("#data-validation-message-registration").append("Make sure to select at least 1 service");
    } else if(providerFirst.length > 1 && providerLast.length > 1 && providerAddress.length > 1 && providerState.length > 3 && providerCity.length > 1 && providerZip.length == 5 && providerPhone.length == 10 && providerMiles.length > 1 && ($("#mowing").prop('checked') == true || $("#edging").prop('checked') == true || $("#trimBushes").prop('checked') == true) && ($("#monday").prop('checked') == true || $("#tuesday").prop('checked') == true || $("#wednesday").prop('checked') == true || $("#thursday").prop('checked') == true || $("#friday").prop('checked') == true || $("#saturday").prop('checked') == true || $("#sunday").prop('checked') == true)) {
        window.location.href = "./ProviderLandingPage.html";
    };
}    else {
    // No user is signed in.
    }
   
   });

   //-------------RETURNING USERS CODE IS BELOW-------------//
   $("#login_provider_button").on("click", function(event) {
   firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // ...
  });
});
  

   //-------------LANDING PAGE CODE IS BELOW-------------//

   dataRef.ref().on("child_added", function(childSnapshot) {
       console.log(childSnapshot.val());

       $("#firstNameStored").text(childSnapshot.val().providerFirst);

   }, function(errorObject) {
        console.log("Errors handled: " + errorObject.code);
      });

   //Store each button in a variable
   var profile = $("#profile");
   var calendar = $("#calendar");
   var inbox = $("#inbox");
   var payments = $("#payments");
   var jobHistory = $("#jobHistory");
   var requests = $("#requests");
   var upcomingJobs = $("#upcomingJobs");
   var placeholderForDisplay = $("#placeholderForLandingPageDisplay");
   var profileHolder = $("#holderForProfileDisplay");
   var inboxHolder = $("#placeholderForIndexDisplay");
   var calendarHolder = $("#placeholderForCalendarDisplay");
   var requestsHolder = $("#holderForRequestsDisplay");


   // When User clicks panel button, display relevant information
    profile.on("click", function(event) {
        event.preventDefault();
        profileHolder.show();
        placeholderForDisplay.hide();
        inboxHolder.hide();
        calendarHolder.hide();
        requestsHolder.hide();
        inboxHolder.hide();
    })

    requests.on("click", function(event) {
        event.preventDefault();
        requestsHolder.show();
        placeholderForDisplay.hide();
        inboxHolder.hide();
        calendarHolder.hide();
        profileHolder.hide();
        inboxHolder.hide();
        })

    inbox.on("click", function(event) {
        event.preventDefault();
        inboxHolder.show();
        requestsHolder.hide();
        placeholderForDisplay.hide();
        inboxHolder.hide();
        calendarHolder.hide();
        profileHolder.hide();
        })

firebase.auth().signOut().then(function() {
    // Sign-out successful.
    }).catch(function(error) {
    // An error happened.
    });

       //capture the updated values stored in firebase from the logged in user
//    database.ref().on("value", function(snapshot) {

//     $("#employee-table").append("<td>").text(snapshot.child("EmployeeName").val());


// console.log(snapshot.val());
// })






    