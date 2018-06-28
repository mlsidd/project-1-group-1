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
var time = moment().format('MMMM Do YYYY, h:mm:ss a');
var user = "user@email.com";
    // FROM CACHE var user = localStorage.getItem("email");
var recipient = 4;
    //Will be replaced with provider data on selection


$(document).ready(function(){
    database.ref("clients").child("messages").once("value", function(snapshot){
    console.log(snapshot.val());
});

})

database.ref("clients").child("messages").orderByChild("sender").equalTo(user).once("value", function(snapshot){
console.log(snapshot.val(), "0");
let x = snapshot.val();
console.log(x)


snapshot.forEach(function(childSnapshot){
 console.log(snapshot.val());
 console.log(childSnapshot.child("sender").val())
let user = childSnapshot.child("sender").val();
let sender = childSnapshot.child("recipient").val();
let time = childSnapshot.child("timestamp").val();
let msg = childSnapshot.child("message").val();

console.log(time)
 $("#msgs").append( "<tr><td>" + user
 + "</td><td>" + sender
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
        let here = snapshot.val();
        let key = Object.keys(snapshot.val())[0];
        console.log(key);


        database.ref("clients").child("messages").push({
            key : key,
            sent_or_received : "sent",
            recipient : recipient,
            sender : user,
            message : msg,
            timestamp : time
        });
    });
    database.ref("svcproviders").child(recipient).child("messages").push({
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

