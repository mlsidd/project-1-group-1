

// Initialize Firebase

/*
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

database.ref("messages").orderByChild("sender").equalTo(user).once("value", function(snapshot){
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


        database.ref("messages").push({
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
        + "</td><td>" + recipient
        + "</td><td>" + time
        + "</td><td>" + msg
        + "</td></tr>" 
    );


    $('#msginput')
    .not(':button, :submit, :reset, :hidden')
    .val('')
});

*/


var blacklist= new Array("<script","</script>","<applet","</applet>","<iframe>","</iframe>","<style","</style>","<html","</html>","<body","</body>","onerror=","onclick=");

var messageArray = new Array();
autoscrolling = true;

channeldata=firebase.database().ref("chat_channels");





name = localStorage.getItem("email");
var messageArrayl = 0;


var updateonce=false;
var channelArray = new Array();

channeldata.on('value',snap => {
    channelArray=snap.val();
    console.log(channelArray);
});

var rpsArray = new Array();

function create_onvalue(){
    let data = firebase.database().ref("channels").child(channel).child("messages");
data.on('value',snap => {messageArray=snap.val();
                console.log(snap.exists());
                
                if(snap.exists())
                {
      
                
                if(!updateonce){
                
                
                 $("#messagebox").empty();
                for(let i=0;i<messageArray.length;i++)
                {
                    
                    let scriptcheck= false;
                    let a=messageArray[i];
                    for(let i=0;i<blacklist.length;i++)
                    {   
                        if(a.includes(blacklist[i]))
                        {   
                        scriptcheck=true;
                        }
                    }
                
                if(scriptcheck)
                {
                    console.log("someone tried to run a script or include an illegal tag");

                }else{
                    
                    $("#messagebox").append('<div class="message">'+messageArray[i]+"</div><br>");
                }
                scriptcheck=false;
                }

            }else{
                
                let scriptcheck= false;
                let a=messageArray[messageArray.length-1];
                for(let i=0;i<blacklist.length;i++)
                {
                    if(a.includes(blacklist[i]))
                    {   
                        scriptcheck=true;
                    }
                }
                if(scriptcheck)
                {
                    console.log("someone tried to run a script or include an illegal tag");
                }else{
                $("#messagebox").append('<div class="message">'+messageArray[messageArray.length-1]+"</div><br>");
                }
            }
             
                if(autoscrolling){
                $("#messagebox").prop({ scrollTop: $("#messagebox").prop("scrollHeight") });
                }
                updateonce=true;
            }else{
                channelArray=new Array();
                channelArray.push(channel);
                //firebase.database().ref("channels").push(channel);
                set();}
        });
    }
 

function create_clickevents()
{

$("#send").on("click",function(event){
    event.preventDefault();


        //much needed security changes that neeeed to be made
        //pass name, timestamp, and message input as an object. piece together in on value. 
    msg =timestamp()+"<br>"+ name+ ": <hr>"+ $("#messageinput").val();
    
    messageArray.push(msg);
    firebase.database().ref("channels").child(channel).child("messages").set(messageArray);
    
    
    $("#messageinput").val("");
});

}

$("#changechannel").on("click",function(event){
    event.preventDefault();
    change_channel($("#channelinput").val());

})


function set()
{
    messageArray = ["welcome","say hi"];
    firebase.database().ref("channels").child(channel).child("messages").set(messageArray);
}

function autoscroll_toggle()
{
    autoscrolling=!autoscrolling;
}




function change_channel(cname)
{
 
    data.off('value');

    messageArray.length=0;
    channel = cname;
    data = firebase.database().ref("channels").child(channel).child("messages");
    updateonce=false;
    create_onvalue();


}


function timestamp()
{   

    return moment().format('MMMM Do YYYY, h:mm:ss a');

}






//on map... client clicks button on map...
//redirects to messaging after storing the email of the client in session storage.
//build a channel obj containing {from:name(grabbed from local"email"),to:provider(grabbed from session storage)}
function build_channel()
{   let obj = {from:localStorage.email,to:sessionStorage.to};
firebase.database().ref("channels").push(obj);

}

async function find_channels()
{   let temp = await firebase.database().ref("channels").once("value").then(function(snapshot){return snapshot.val();})

    for(let c in temp)
    {
        if(temp[c].from==name)
        {   
            $("#messagebox").append("<button class='chatchannels' id='"+c+"'>"+temp[c].to+"</button");
        }
        if(temp[c].to==name)
        {   
            $("#messagebox").append("<button class='chatchannels' id='"+c+"'>"+temp[c].from+"</button");
        }
        
    }
    $(".chatchannels").on("click",function(){channel=$(this).attr("id");
    create_onvalue();
    create_clickevents();
});
}
//push channel obj to ref(channels).
//enumerate to find channels that contains users email(grabbed from local).
//display list of channels to connect to with the other parties name displayed
//create on click for each channel
//when clicked get the key name of the channel and store as channel... then create_onvalue()

//make a back button that turns off the on value, 