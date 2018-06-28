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

var user = "user@email.com";
    // FROM CACHE var user = localStorage.getItem("email");

database.ref("clients").orderByChild("username").equalTo(user).once("value", function(snapshot){
    console.log(snapshot.val(), "0");  
    
    snapshot.forEach(function(childSnapshot){

        console.log(childSnapshot.child("firstname").val());


        $("#clientFirstName").val(childSnapshot.child("firstname").val());
        $("#clientLastName").val(childSnapshot.child("lastname").val());
        $("#inputAddress").val(childSnapshot.child("address").val());
        $("#inputAddress2").val(childSnapshot.child("address2").val());
        $("#").val(childSnapshot.child("city").val());
        $("#").val(childSnapshot.child("state").val());
        $("#").val(childSnapshot.child("zip").val());
        $("#").val(childSnapshot.child("sqft").val());

    });
    


});

    