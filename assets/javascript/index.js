var playerNumber = "";
var labels = ["Your Choice:", "Result:", "Opponent's Choice:"]
var queue = "";
var myKey = "";

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
    let btnTypeArr = ["Rock", "Paper", "Scissors"];
    var group = $(`<div class="btn-group">`);
    var mainBtn = $(`<button type="button" class="btn btn-danger dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Choose!</button>`);
    var menuContainer = $(`<div class="dropdown-menu">`);
    for (var i = 0; i < btnTypeArr.length; i++) {
        var btn = $(`<button class="dropdown-item" id="pick" type="button">${btnTypeArr[i]}</button>`);
        btn.addClass(btnTypeArr[i].toLowerCase());
        btn.click(function () {
            myConnection.push($(this).text());
            var myChoice = $("#box0");
            $(myChoice).attr("style", "background-image: url('assets/images/rps.png');");
            $(myChoice).addClass($(this).text().toLowerCase());
            $(this).parent().parent().remove();
        })
        menuContainer.append(btn);
    }
    group.append(mainBtn, menuContainer);
    $("#choices").append(group);
}

function generateGamePanel() {
    var squareRow = $("<div class='row align-items-center justify-content-center' style='display: inline-block;'>");
    var squareContainer = $("<div class='col-sm-12'>");

    for (var i = 0; i < 3; i++) {
        var textRow = $("<div class='borderRow'>");
        var square = $("<div>");
        square.attr("id", `box${i}`);
        square.addClass("box");
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
            if (index < 3 && inGame === false) {
                queue = "";
                inGame = true;
            }
            else if (index < 3) {
                queue = 0;

            } else {
                queue = index - 2;
            }
            playerNumber = index;
        }
    });
}

function checkWinner() {
    if (!userChoices.includes("")) {
        if (userChoices[0] === "Paper" && userChoices[1] === "Rock" || userChoices[0] === "Rock" && userChoices[1] === "Scissors" || userChoices[0] === "Scissors" && userChoices[1] === "Paper") {
            result("win");
        } else if (userChoices[0] === userChoices[1]) {
            result("tie");
        } else {
            result("loss");
        }
    }
}

function result(string) {
    var myChoice = $("#box2");
    $(myChoice).attr("style", "background-image: url('assets/images/rps.png');");
    $(myChoice).addClass(userChoices[1].toLowerCase());
    var myChoice = $("#box1");
    $(myChoice).attr("style", "background-image: url('assets/images/status.png');");

    switch (string) {
        case "win":
            console.log("Win");
            $("#box1").addClass("win");
            break;
        case "tie":
            console.log("tie");
            $("#box1").addClass("tie");
            break;
        case "loss":
            console.log("loss");
            $("#box1").addClass("lose");
            break;
        default:
            console.log("Cheater!");
    }
}