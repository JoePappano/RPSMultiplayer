


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

    database.ref().on("value", function(snapshot) {
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

    $("#addPlayer").on("click", function () {

        playerOne = $("#playerOne").val().trim();
        playerTwo = $("#playerTwo").val().trim();
        database.ref().set({
            playerOne,
            playerTwo,
            winsOne: 0,
            winsTwo: 0,
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

    $("#submitOne").on("click", function(){
        database.ref().update({
            userOneGuess: userGuess1,
        })
        checkForWin();
        })
    })


    $(document).on("click", ".press2", function () {
        userGuess2 = $(this).attr("x");
        console.log(this)
    })

    $("#submitTwo").on("click", function(){
        database.ref().update({
            userTwoGuess: userGuess2,
        })
        checkForWin();

    })

function checkForWin() {
    console.log("User Guess 1" + userGuess1)
    console.log("User Guess 2" + userGuess2)
    if(userGuess1 == "paper" && userGuess2 == "rock"){
        winsOne++;
    }
    if(userGuess1 == "rock" && userGuess2 == "scissors"){
        winsOne++;
    }
    if(userGuess1 == "scissors" && userGuess2 == "paper"){
        winsOne++;
    }
    if(userGuess2 == "paper" && userGuess1 == "rock"){
        winsTwo++;
    }
    if(userGuess2 == "rock" && userGuess1 == "scissors"){
        winsTwo++;
    }
    if(userGuess2 == "scissors" && userGuess1 == "paper"){
        winsTwo++;
    }
    database.ref().update({
        winsOne: winsOne,
        winsTwo: winsTwo,
    })

    database.ref(winsOne).on("value", function(snapshot) {
        $("#winsOne").text("Wins: " + snapshot.val().winsOne);
        $("#winsTwo").text("Wins: " + snapshot.val().winsTwo);

    })
    console.log("p1 wins: " + winsOne);
    console.log("p2 wins : " + winsTwo);
}
    // database.ref().on("value", function(snapshot) {
    //     console.log(snapshot.name)

    // })


});
