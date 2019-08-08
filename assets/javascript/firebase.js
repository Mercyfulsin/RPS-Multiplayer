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

// When the client's connection state changes...
connectedRef.on("value", function (snap) {
    // If they are connected..
    if (snap.val()) {
        // Add user to the connections list.
        var con = connectionsRef.push(true);
        myKey = con.path.pieces_[1];
        myConnection = database.ref("/connections/" + myKey);
        console.log("Your connection:", myKey);
        // Remove user from the connection list when they disconnect.
        con.onDisconnect().remove();
    }
});

// When first loaded
connectionsRef.on("value", function (snap) {

    // The number of online users is the number of children in the connections list.
    console.log("I'm player ", playerNumber);
    if (queue === "" || queue > 0) {
        updateQueue(snap);
        switch (playerNumber) {
            case 1:
            case 2:
                startGame();
                break;
            default:
                rejectGame(queue);
        }
    }
});