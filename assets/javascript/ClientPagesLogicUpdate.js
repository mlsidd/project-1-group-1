var config = {
apiKey: "AIzaSyDFhTiBSjTaFH-bYZdHI5v_FRS3nE76adk",
authDomain: "thp1g1-1529168178742.firebaseapp.com",
databaseURL: "https://thp1g1-1529168178742.firebaseio.com",
projectId: "thp1g1-1529168178742",
storageBucket: "thp1g1-1529168178742.appspot.com",
messagingSenderId: "293280499251"
};

firebase.initializeApp(config);

var database = firebase.database();

var user = "3@4.com";
    // FROM CACHE var user = localStorage.getItem("email");

database.ref("clients").orderByChild("username").equalTo(user).once("value", function(snapshot){
    console.log(snapshot.val(), "0");  
    
    snapshot.forEach(function(childSnapshot){

        console.log(childSnapshot.child("firstname").val());


        $("#clientFirstName").val(childSnapshot.child("firstname").val());
        $("#clientLastName").val(childSnapshot.child("lastname").val());
        $("#inputAddress").val(childSnapshot.child("address").val());
        $("#inputAddress2").val(childSnapshot.child("address2").val());
        $("#inputCity").val(childSnapshot.child("city").val());
        $("#inputState").val(childSnapshot.child("state").val());
        $("#inputZip").val(childSnapshot.child("zip").val());
        $("#clientPhoneNumber").val(childSnapshot.child("phone").val());
        $("#squareFootage").val(childSnapshot.child("sqft").val());

    });
    


});


$("#create_client_account").on("click", function (event) {
    event.preventDefault();

    // Get the user's data from the input boxes for Firebase database.
    clientUserName = $("#email-input").val().trim();
    clientPassword = $("#password-input").val().trim();
    // form validation
    if (clientUserName.indexOf("@") == -1 && clientPassword.length < 7) {
        $("#data-validation-message").html("Make sure you are entering your email <p> Password must contain at least 7 characters");
    } else if (clientPassword.length < 7) {
        $("#data-validation-message").text("Password must contain at least 7 characters");
    } else if (clientUserName.indexOf("@") == -1) {
        $("#data-validation-message").text("Make sure you are entering your email");
    } else if (clientUserName.indexOf("@") > 0 && clientPassword.length > 6) {
        localStorage.setItem("email", clientUserName);
        localStorage.setItem("pass", clientPassword);
        window.location.href = "./Registration-Client.html";
    }
    console.log(clientUserName);
    console.log(clientPassword);
});

// Capture Button Click
$("#create-client-profile").on("click", function (event) {
    event.preventDefault();
        
    database.ref("clients").orderByChild("username").equalTo(user).once("value", function(snapshot){
        let here = snapshot.val();
        let key = Object.keys(snapshot.val())[0];
        console.log(key);
            

            // Get values from input boxes
            clientFirst = $("#clientFirstName").val().trim();
            clientLast = $("#clientLastName").val().trim();
            address = $("#inputAddress").val().trim();
            address2 = $("#inputAddress2").val().trim();
            city = $("#inputCity").val().trim();
            state = $("#inputState").val().trim();
            zip = $("#inputZip").val().trim();
            phone = $("#clientPhoneNumber").val().trim();
            squareFootage = $("#squareFootage").val().trim();
            servicesNeeded1 = $("#mowing").val();
            servicesNeeded2 = $("#edging").val();
            servicesNeeded3 = $("#trimBushes").val();



            // Push client data to Firebase
            let object = {

                username: user,
                usertype: "client",
                firstname: clientFirst,
                lastname: clientLast,
                address: address,
                address2: address2,
                state: state,
                city: city,
                zip: zip,
                phone: phone,
                sqft: squareFootage,
                servicesneeded: [servicesNeeded1, servicesNeeded2, servicesNeeded3],
                //coordinateslat: coordinatesLat,
                //coordianteslong: coordinatesLong, 
                //calendar: , //need to figure this out
                dateAdded: firebase.database.ServerValue.TIMESTAMP
            }
            // Push client data to Firebase
            database.ref("clients").child(key).set(object);

            if (clientFirst.length < 1) {
                $("#data-validation-message-registration").append("Enter your first name");
            } if (clientLast.length < 1) {
                $("#data-validation-message-registration").append("<p> Enter your last name");
            } if (address.length < 1) {
                $("#data-validation-message-registration").append("<p> Enter your address");
            } if (state.length < 3) {
                $("#data-validation-message-registration").append("<p> Make sure you select your state");
            } if (city.length < 1) {
                $("#data-validation-message-registration").append("<p> Make sure you select your city");
            } if (zip.length < 5 || zip.length > 5) {
                $("#data-validation-message-registration").append("<p> Enter a valid zip code");
            } if (phone.length < 10 || phone.length > 10) {
                $("#data-validation-message-registration").append("<p> Enter a valid phone number");
            } if (squareFootage.length < 1) {
                $("#data-validation-message-registration").append("<p> Make sure you enter the square footage of your lawn");
            } if ($("#mowing").prop('checked') == false && $("#trimBushes").prop('checked') == false && $("#edging").prop('checked') == false) {
                $("#data-validation-message-registration").append("Make sure to select at least 1 service");
            } 
             if (clientFirst.length > 1 && clientLast.length > 1 && address.length > 1 && state.length > 3 && city.length > 1 && zip.length == 5 && phone.length == 10 && squareFootage.length > 1 && ($("#mowing").prop('checked') == true || $("#edging").prop('checked') == true || $("#trimBushes").prop('checked') == true)) {
                window.location.href = "./ClientLandingPage.html";
            }
            
            console.log(clientFirst);
            console.log(servicesNeeded1, servicesNeeded2, servicesNeeded3)
        });

    //window.location.href = "./ClientLandingPage.html"; 
    //Above will does work, but it leaves the page before firebase has a change to update records. 
});
