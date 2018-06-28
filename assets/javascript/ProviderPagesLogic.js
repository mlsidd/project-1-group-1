// Declare variables
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

// Initialize Firebase

  console.log(dataRef);







  

   //-------------LOGIN PAGE CODE IS BELOW-------------//

//-------------------enter code here for using Google API-------------------

//------------------enter code here for using facebook API--------------------------
console.log("testingggg")
// Event listener tied to create account button to store username and password data 
$("#create_provider_account").on("click", function(event) {
    event.preventDefault();
    console.log(dataRef);


    // Get the user's username and password from the input boxes for Firebase database.
    providerUserName = $("#email-input").val().trim();
    providerPassword = $("#password-input").val().trim();
    // login form validation to ensure using email address and password is at least 6 characters long
    if(providerUserName.indexOf("@") == -1 && providerPassword.length < 6) {
        $("#data-validation-message").html("Make sure you are entering your email <p> Password must contain at least 6 characters");        
    } else if (providerPassword.length < 6) {
        $("#data-validation-message").text("Password must contain at least 6 characters");
    } else if (providerUserName.indexOf("@") == -1) {
        $("#data-validation-message").text("Make sure you are entering your email");
    } else if(providerUserName.indexOf("@") > 0 && providerPassword.length > 5) {
        // Create a new user account and store it using local storage
        localStorage.setItem("userName", providerUserName);
        localStorage.setItem("Password", providerPassword);
        window.location.href = "./Registration-Provider.html";
        var ref = firebase.database().ref("providers/username");
        ref.once("value")
        .then(function(snapshot) {
        snapshot.exists();  // true
        });

            // check firebase to see if the username/password already exists
            // // Fetch a Blog Post by ID. Returns a Promise of an actual object, not a DataSnapshot.
            // function getUserFromDatabase(currentusername) {
            //     return dataRef.child('providers').child(currentusername).once('value').then(function(snapshot) {
            //     return snapshot.val();
            //     });
            // }
            // console.log(getUserFromDatabase(providerUserName));
            //     // if (snapshot.child.val().username !== providerUserName) {
            //     //     //push username and password to firebase database if username is available
                //     dataRef.ref('providers/').push({ 
                //         username: providerUserName,
                //         password: providerPassword });
                //         // AND take user to registration page to complete registration
                //         window.location.href = "./Registration-Provider.html";
                // }
                // else {
                // // return message if username already exists
                // $("#data-validation-message").text("That username and/or password already exists.");
                // }    
        }
            });
    //     }
    // });

   //-------------REGISTRATION PAGE CODE IS BELOW-------------//

   // Capture Button Click
   $("#create-provider-profile").on("click", function(event) {
    event.preventDefault();
    
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
    //data validation to ensure user entered information correctly
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

        // Push provider data to THE SAME user in the database
        dataRef.ref('providers/').push({
            username: localStorage.getItem("userName"),
            password: localStorage.getItem("Password"),
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
            dateAdded: firebase.database.ServerValue.TIMESTAMP
        });
        // Take user to the landing page    
        window.location.href = "./ProviderLandingPage.html";
    };

   });

   //-------------RETURNING USERS CODE IS BELOW-------------//
   //need to add event listener to login button for returing logins and then user is taken direction to landing page
  

   //-------------LANDING PAGE CODE IS BELOW-------------//

   dataRef.ref().on("child_added", function(childSnapshot) {

       $("#firstNameStored").text(childSnapshot.val().providerFirst);

   }, function(errorObject) {
        console.log("Errors handled: " + errorObject.code);
      });

   //Store each button in a variable
   var profile = $("#profile");
   var calendar = $("#calendar");
   var inbox = $("#inbox");
   var placeholderForDisplay = $("#placeholderForLandingPageDisplay");
   var profileHolder = $("#holderForProfileDisplay");
   var inboxHolder = $("#placeholderForIndexDisplay");
   var calendarHolder = $("#placeholderForCalendarDisplay");
    var updateProfileButton = $("#change-provider-profile");

    //When user clicks change profile button, the updated data is updated for that same user in firebase database
   //-------------put code here-------------//



   // When User clicks panel button, display relevant information
    profile.on("click", function(event) {
        event.preventDefault();
        //set the values in the input forms to the users answers that are stored in firebase
            var user = "cool trimmings";
                // FROM CACHE var user = localStorage.getItem("email");
            
            dataRef.ref("providers").orderByChild("businessName").equalTo(user).once("value", function(snapshot){
                console.log(snapshot.val(), "0");  
                
                snapshot.forEach(function(childSnapshot){
            
                    console.log(childSnapshot.child("firstname").val());
            
            
                    $("#firstNameAnswer").val(childSnapshot.child("firstname").val());
                    $("#lastNameAnswer").val(childSnapshot.child("lastname").val());
                    $("#businessNameAnswer").val(childSnapshot.child("businessName").val());
                    $("#inputAddressAnswer").val(childSnapshot.child("address").val());
                    $("#inputAddress2Answer").val(childSnapshot.child("address2").val());
                    $("#inputCityAnswer").val(childSnapshot.child("city").val());
                    $("#inputStateAnswer").val(childSnapshot.child("state").val());
                    $("#inputZipAnswer").val(childSnapshot.child("zip").val());
                    $("#phoneNumberAnswer").val(childSnapshot.child("phone").val());
                
                    $("#milesAnswer").val(childSnapshot.child("miles").val());
                    
                    //NEED TO ADDRESS how we store services and dates for the following
                    $("#edging").val(childSnapshot.child("servicesProvided").child("0").val());
                    $("#mowing").val(childSnapshot.child("servicesProvided").child("1").val());
                    $("#trimBushes").val(childSnapshot.child("servicesProvided").child("2").val());
        
                    $("#monday").val(childSnapshot.child("availableDays").child("0").val());
                    $("#tuesday").val(childSnapshot.child("availableDays").child("0").val());
                    $("#wednesday").val(childSnapshot.child("availableDays").child("0").val());
                    $("#thursday").val(childSnapshot.child("availableDays").child("0").val());
                    $("#friday").val(childSnapshot.child("availableDays").child("0").val());
                    $("#saturday").val(childSnapshot.child("availableDays").child("0").val());
                    $("#sunday").val(childSnapshot.child("availableDays").child("0").val());
        
        
            
                });
            });

        // $("#inputStateAnswer").attr("placeholder", //users firebase answer);
        profileHolder.show();
        placeholderForDisplay.hide();
        inboxHolder.hide();
        calendarHolder.hide();
    })

    inbox.on("click", function(event) {
        event.preventDefault();
        inboxHolder.show();
        placeholderForDisplay.hide();
        calendarHolder.hide();
        profileHolder.hide();
        })

    calendar.on("click", function(event) {
        event.preventDefault();
        calendarHolder.show();
        placeholderForDisplay.hide();
        inboxHolder.hide();
        profileHolder.hide();
        })
  


