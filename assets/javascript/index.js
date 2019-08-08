var myConnection;
var playerNumber = "";
var labels = ["Your Choice:", "Result:", "Opponent's Choice:"]
var queue = "";
var myKey = "";
var myStuff = "test";

$(document).ready({
});

function rejectGame(queue) {
    document.body.innerHTML = "";
    $("body").append(`<h1>Unfortunately the lobby already has two people playing the game.<br>You are in queue: ${queue}</h1>`);
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
    let btnTypeArr = ["Rock","Paper","Scissors"];
    var group = $(`<div class="btn-group">`);
    var mainBtn = $(`<button type="button" class="btn btn-danger dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Choose!</button>`);
    var menuContainer = $(`<div class="dropdown-menu">`);
    for(var i = 0; i < btnTypeArr.length; i++){
        var btn = $(`<button class="dropdown-item" id="pick" type="button">${btnTypeArr[i]}</button>`);
        btn.addClass(btnTypeArr[i].toLowerCase());
        btn.click(function(){
            myConnection.push($(this).text());
            var myChoice = $("#box")[0];
            $(myChoice).attr("style","background-image: url('assets/images/rps.png');");
            $(myChoice).addClass($(this).text().toLowerCase());
        })
        menuContainer.append(btn);
    }
    group.append(mainBtn,menuContainer);
    $("#choices").append(group);
}

function generateGamePanel() {
    var squareRow = $("<div class='row align-items-center justify-content-center' style='display: inline-block;'>");
    var squareContainer = $("<div class='col-sm-12'>");

    for (var i = 0; i < 3; i++) {
        var textRow = $("<div class='borderRow'>");
        var square = $("<div>");
        square.attr("id", "box");
        textRow.append(`<h4>${labels[i]}</h4>`, square);
        squareContainer.append(textRow);
    }
    squareRow.append(squareContainer);
    $("#board").append(squareRow);
}

function updateQueue(obj) {
    var index = 0;
    obj.forEach(function (content) {
        index++;
        console.log(index, content.key);
        if (content.key === myKey) {
            if (index < 3) {
                queue = 0;
            } else {
                queue = index - 2;
            }
            playerNumber = index;
        }
    });
}