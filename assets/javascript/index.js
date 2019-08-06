var firebaseConfig = {
    apiKey: "AIzaSyCaYU9uqpUSiFE20AjqIX4-bNumUzufuuw",
    authDomain: "fir-intro-27da8.firebaseapp.com",
    databaseURL: "https://fir-intro-27da8.firebaseio.com",
    projectId: "fir-intro-27da8",
    storageBucket: "",
    messagingSenderId: "232675283864",
    appId: "1:232675283864:web:f73c23b164121cb2"
};
firebase.initializeApp(firebaseConfig);

var database = firebase.database();
var connectionsRef = database.ref("/connections");
var connectedRef = database.ref(".info/connected");
var playerNumber = "";
var labels = ["Your Choice:","Result:","Opponent's Choice:"]

// When the client's connection state changes...
connectedRef.on("value", function (snap) {
    // If they are connected..
    if (snap.val()) {
        // Add user to the connections list.
        var con = connectionsRef.push(true);
        // Remove user from the connection list when they disconnect.
        con.onDisconnect().remove();
    }
});

// When first loaded
connectionsRef.on("value", function (snap) {
    // The number of online users is the number of children in the connections list.
    if (playerNumber > 2 || playerNumber === "") {
        tempNum = snap.numChildren();
        console.log("I'm player ", tempNum);
        switch (tempNum) {
            case 1:
            case 2:
                playerNumber = tempNum;
                startGame();
                break;
            default:
                rejectGame();
        }
    }
});

$(document).ready({
});

function rejectGame() {
    document.body.innerHTML = "";
    document.write("<h1>Unfortunately the lobby already has two people playing the game.</h1>");
}

function startGame() {
    document.body.innerHTML = "";
    // document.write("Welcome");
    var start = $("<div class='container'><div id='info' class='row mt-3'></div><div id='board' class='row align-items-center justify-content-center'></div><div id='choices' class='row'></div></div>");
    $("body").append(start);
    generateGamePanel();
}

function generateChoices() {

}

function generateGamePanel() {
    for (var i = 0; i < 3; i++) {
        var contain = $("<div class='col-sm-3'>");
        var square = $("<div>");
        var text = $("<h4 style='margin:5px'>");
        text.text(labels[i]);
        square.attr("id","box");
        contain.append(text,square);
        $("#board").append(contain);
    }
}