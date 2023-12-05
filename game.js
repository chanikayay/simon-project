//2.3. color buttons array
var buttonColors = ["red", "blue", "green", "yellow"]

//2.5. new variable: random pattern generated and put inside the array
var gamePattern = [];
//user clicked pattern inside the array
var userClickedPattern = [];
//initial number for level indicator
var level = 0;

//start the game function
function nextSequence() {

    //2.2. random num from 0 to 3
    var randomNumber = Math.floor(Math.random() * 4);
    //2.4. link random to element inside array
    var randomChosenColor = buttonColors[randomNumber];

    //2.6. push radom generated color into array
    gamePattern.push(randomChosenColor);
    //animation for random pattern
    $("#" + randomChosenColor).fadeOut(100).fadeIn(100);
    //call function for sound
        playSound(randomChosenColor);

    //level up each time we call nextSequence function
    level++;
    $("h1").text("Level " + level);
    //clear up array for next level
    userClickedPattern = [];

    // console.log(gamePattern); > to see the cheatsheet

}

//create function for sound
function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

//user click on game buttons
$(".btn").click(function() {
    //retrieve color name from id
    var userChosenColor = $(this).attr("id");
    //push color inside the user array
    userClickedPattern.push(userChosenColor);
    //to see above in the developer view
    console.log(userClickedPattern);

    playSound(userChosenColor);
    animatePress(userChosenColor);

    checkAnswer(userClickedPattern.length-1);
}
)
//flash animation for buttona
function animatePress(currentColor) {
    $("." + currentColor).addClass("pressed");
    setTimeout(() => {
        $("." + currentColor).removeClass("pressed")
    }, 100);
    }
//ensure the button is disabled when user not playing
$(".btn").addClass("disabled");

//interface changes when the game begins
function startGame() {
    $(".btn").removeClass("disabled");
    nextSequence();
    $("h1").text("Level " + level);
    $(".start").hide();
}

//disable keydown function/key a
let keydownEnabled = true;
$(document).on("keydown", function (event) {
    if (keydownEnabled && event.key === "a") {
        startGame();
        keydownEnabled = false;
    }
});

//enable keydown function
function enableKeydown() {
    keydownEnabled = true;
}

//click button to start
$(".start").on("click", startGame);

//
function checkAnswer(i) {
    //check each element inside the array is at the same position
    if (userClickedPattern[i] === gamePattern[i]) {
        console.log("success");
        //check if user pattern = game pattern
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(() => {
                nextSequence()
            }, 1000);
        }
    }
    else {
        console.log("failed");
        //game over sound
        var audio = new Audio("sounds/" + "wrong" + ".mp3");
        audio.play();
        //game over red flash background
        $(document.body).addClass("game-over");
        setTimeout(()=> {
            $(document.body).removeClass("game-over")}, 200);
        //call function
            startOver();

        
    }
}
//function for retry interface and re-enable button & keydown
function startOver() {
    $("h1").text("Game Over " + "(Level " + level + ")");
    gamePattern = [];
    $(".start").show().text("RETRY");            
    enableKeydown();
    level = 0;
    $(".btn").addClass("disabled");
}
