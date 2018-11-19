


// Initialize Firebase
var config = {
    apiKey: "AIzaSyDNNR9yWKk4olga89ZzUq_PsPgI9_D60w4",
    authDomain: "rpsmultiplayer-429ce.firebaseapp.com",
    databaseURL: "https://rpsmultiplayer-429ce.firebaseio.com",
    projectId: "rpsmultiplayer-429ce",
    storageBucket: "rpsmultiplayer-429ce.appspot.com",
    messagingSenderId: "527901174635"
};

var winsOne = 0;
var winsTwo = 0;
var userGuess1;
var userGuess2;

$(document).ready(function () {
    firebase.initializeApp(config);
    var database = firebase.database();

    $("#restart").on("click", function () {
        database.ref().set({
            playerOne: null,
            playerTwo: null
        });
        window.location.reload();
    })

    database.ref().on("value", function (snapshot) {
        $("#winsOne").text("Wins: " + snapshot.val().winsOne);
        $("#winsTwo").text("Wins: " + snapshot.val().winsTwo);
        $(".userOne").text(snapshot.val().playerOne);
        $(".userTwo").text(snapshot.val().playerTwo);
    })

    //Functions

    function showModal() {
        $('#myModal').on('shown.bs.modal', function () {
            $('#myInput').trigger('focus')
        })
    }

    $('#start-game').click(function () {
        showModal();
    });

    $("#addPlayer1").on("click", function () {
        playerOne = $("#playerOne").val().trim();
        database.ref().update({
            playerOne,
            winsOne,
            winsTwo,
        })
    });

    $("#addPlayer2").on("click", function () {
        playerTwo = $("#playerTwo").val().trim();
        database.ref().update({
            playerTwo,
            winsOne,
            winsTwo,
        })
    });

    database.ref().on("value", function (snapshot) {
        $(".userOne").text(snapshot.val().playerOne);
        $(".userTwo").text(snapshot.val().playerTwo);
    });

    $(document).on("click", ".press1", function () {
        userGuess1 = $(this).attr("x");
        console.log(this)
    })

    $("#submitOne").on("click", function () {
        database.ref().update({
            userOneGuess: userGuess1,
        })
        checkForWin();
        
    })


    $(document).on("click", ".press2", function () {
        userGuess2 = $(this).attr("x");
        console.log(this)
    })

    $("#submitTwo").on("click", function () {
        database.ref().update({
            userTwoGuess: userGuess2,
        })
        checkForWin();
        
    })

    $(".playAgain").on("click", function () {
        database.ref().update({
            userOneGuess: null,
            userTwoGuess: null
        })
        window.location.reload();
    })

    function checkForWin() {
        console.log("User Guess 1" + userGuess1)
        console.log("User Guess 2" + userGuess2)
        database.ref().update({
            winsOne: winsOne,
            winsTwo: winsTwo,
        })
        window.location.reload();
    }


    database.ref().on("value", function (snapshot) {
        if (snapshot.val().userOneGuess == "paper" && snapshot.val().userTwoGuess == "rock") {
            winsOne++;
        }
        if (snapshot.val().userOneGuess == "rock" && snapshot.val().userTwoGuess == "scissors") {
            winsOne++;
        }
        if (snapshot.val().userOneGuess == "scissors" && snapshot.val().userTwoGuess == "paper") {
            winsOne++;
        }
        if (snapshot.val().userTwoGuess == "paper" && snapshot.val().userOneGuess == "rock") {
            winsTwo++;
        }
        if (snapshot.val().userTwoGuess == "rock" && snapshot.val().userOneGuess == "scissors") {
            winsTwo++;
        }
        if (snapshot.val().userTwoGuess == "scissors" && snapshot.val().userOneGuess == "paper") {
            winsTwo++;
        }


        $("#winsOne").text("Wins: " + snapshot.val().winsOne);
        $("#winsTwo").text("Wins: " + snapshot.val().winsTwo);

        console.log("This is database Wins for player 1: " + snapshot.val().winsOne)
        console.log("This is database Wins for player 2: " + snapshot.val().winsTwo)
        console.log("This is value stored in variable winsOne: " + winsOne)
        console.log("This is value stored in variable winsTwo: " + winsTwo)

    })
});
