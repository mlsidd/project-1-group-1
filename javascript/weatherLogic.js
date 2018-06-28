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
var database = firebase.database();

console.log(moment());


// Messaging

var message = $("#msginput").innerHtml;
var messageTo = $("#msgto").innerHtml;


var defaultAuth = firebase.auth();
var time = moment()._d;
var user = "user@email.com";
    // FROM CACHE var user = localStorage.getItem("email");
var recipient = "-LFuLd4dtAHtFcUwQjok";
    //Will be replaced with provider data on selection


$(document).ready(function(){
    database.ref("clients").child("messages").on("value", function(snapshot){
    console.log(snapshot.val());
});

})

database.ref("clients").orderByChild("username").equalTo(user).on("value", function(snapshot){
console.log(snapshot.val(), "0");
let x = snapshot.val();
console.log(x)


snapshot.forEach(function(childSnapshot){
 console.log(snapshot.val());

let user = childSnapshot.child("servicesneeded").child("0").val();
let time = childSnapshot.child("servicesneeded").child("1").val();
let msg = childSnapshot.child("servicesneeded").child("2").val();

 $("#msgs").append( "<tr><td>" + user
 + "</td><td>" + time
 + "</td><td>" + msg
 + "</td></tr>" 
);
})

})

$("#msgsubmit").on("click", function(){
event.preventDefault();
let msg = $("#msginput").val().trim();


    database.ref("clients").orderByChild("username").equalTo(user).on("value", function(snapshot){
        let here = (snapshot.val());
        console.log(here);
        database.ref("here").push({
            sent_or_received : "sent",
            recipient : recipient,
            sender : user,
            message : msg,
            timestamp : time
        });
    });
    database.ref("svcproviders").child(recipient).push({
        sent_or_received : "recieved",
        recipient : recipient,
        sender : user,
        message : msg,
        timestamp : time
        });

    $("#msgs").append( "<tr><td>" + user
        + "</td><td>" + time
        + "</td><td>" + msg
        + "</td></tr>" 
    );


    $('#msginput')
    .not(':button, :submit, :reset, :hidden')
    .val('')
});

