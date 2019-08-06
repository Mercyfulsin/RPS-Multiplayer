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
var labels = ["Your Choice:", "Result:", "Opponent's Choice:"]
var queue = "";
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
    tempNum = snap.numChildren();
    // The number of online users is the number of children in the connections list.
    if ((playerNumber === "" || playerNumber > 2) && (tempNum < queue || queue === "")) {
        console.log("I'm player ", tempNum);
        switch (tempNum) {
            case 1:
            case 2:
                playerNumber = tempNum;
                startGame();
                break;
            default:
                queue = tempNum;
                rejectGame(tempNum);
        }
    } else {
        switch (queue) {
            case 1:
                playerNumber = 2;
                startGame();
                break;
            default:
                queue--;
        }
    }
});

$(document).ready({
});

function rejectGame(queue) {
    document.body.innerHTML = "";
    $("body").append(`<h1>Unfortunately the lobby already has two people playing the game.<br>You are in queue: ${queue - 2}</h1>`);
}

function startGame() {
    document.body.innerHTML = "";
    // document.write("Welcome");
    var start = $("<div class='container'><div id='info' class='row mt-3'></div><div id='board' class='row align-items-center justify-content-center'></div><div id='choices' class='row'></div></div>");
    $("body").append(start);
    generateGamePanel();
    generateChoices();
}

function generateChoices() {
    var group = $(`<div class="input-group">`);
    var checkBox = $(`<div class="input-group-prepend"><div class="input-group-text"><input type="radio"></div></div>`);
    var choice = $(`<label class="input-group-text">Rock</label>`);
    group.append(checkBox, choice);
    $("#choices").append(group);
}

function generateGamePanel() {
    var squareRow = $("<div class='row align-items-center justify-content-center' style='display: inline-block;'>");
    var squareContainer = $("<div class='col-sm-12'>");

    for (var i = 0; i < 3; i++) {
        var textRow = $("<div class='borderRow'>");
        var square = $("<div class='choice'>");
        square.attr("id", "box");
        textRow.append(`<h4>${labels[i]}</h4>`, square);
        squareContainer.append(textRow);
    }
    squareRow.append(squareContainer);
    $("#board").append(squareRow);
}