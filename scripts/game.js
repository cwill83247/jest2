let game = {
    score: 0,
    currentGame: [],     // add as an empty array to our game
    playerMoves: [],     // add playerMoves as an empty array to our game
    turnNumber:0,
    lastButton: "",
    turnInProgress: false,   //this changes ot true when its computers game, and gets reset.
    choices: ["button1","button2","button3","button4"],     // add chocies then button options in array for our game
}
function newGame() {          //newgame function
    game.score = 0; 
    game.currentGame = [];
    game.playerMoves =[];           //setting score to 0 using the dot notation
    
    for (let circle of document.getElementsByClassName("circle")) { // for all of our elements in the html with the classname circle in our document
        if (circle.getAttribute("data-listener") !== "true") {         //check if the attribute of each circle so its data listener is FALSE  using NOT TRUE
            circle.addEventListener("click", (e) => {                             //if its false then add an event listener of click UNSURE of "e" (passing in event object of e ??)
                if (game.currentGame.length > 0 && !game.turnInProgress) {  //only accept a click if the gamearray is greater then 0 so we know a game is in progress
                let move = e.target.getAttribute("id");             //here we are getting the id of the circle i.e button1 , 2 etc and sore the result as move/
                game.lastButton =move; 
                lightsOn(move);                                     //we are calling the lighton function and passing the parameter from move                                 
                game.playerMoves.push(move);                        //push that move into our playerMoves
                playerTurn();
                }
            });
            circle.setAttribute("data-listener", "true");
        }
    }
    showScore();  
    addTurn();                  //this just says run the showscore function as well 
  
}

function addTurn() {
    game.playerMoves =[];                //clears player moves
    game.currentGame.push(game.choices[(Math.floor(Math.random() * 4))]); // this pushs a random button selection into our gamechoices array
    showTurns()       
}
function showScore() {
    document.getElementById("score").innerText= game.score; 
}
function lightsOn(circ) {        //function is lightson but passing circ dont understand circ                                    
    document.getElementById(circ).classList.add("light"); // it saying get element id by circ but no element named circ in html - it then adds the light class to it 
    setTimeout(function () {                                            //this function then removes what we have applied above after 400 ms so effectivley it will flash.
        document.getElementById(circ).classList.remove("light");    //remove the light class from circ - were is circ and ??
    }, 400);             //400ms 
}

function showTurns() {                           //this relates to the computers turn 
    game.turnInProgress=true;          //computers turn has started so we are settign this to true 
    game.turnNumber = 0;
    let turns = setInterval(function () {    //the set Interval just causes a pause in between the sequences  of 800ms
        lightsOn(game.currentGame[game.turnNumber]);
        game.turnNumber++;                                 //increment game turn number
        if (game.turnNumber >= game.currentGame.length) {  //i f game i slonger than our current game array lenghth then we can end the sequence..
            clearInterval(turns);
            game.turnInProgress=false;                //then change back to false because the computers turn is over     
        }
    }, 800);
}
function playerTurn() {
    let i = game.playerMoves.length - 1;
    if (game.currentGame[i] === game.playerMoves[i]) {                           //checking if currentGame so computer) and playerMoves are equal
        if (game.currentGame.length === game.playerMoves.length) {               //if so  then also If the lenght is the same so checking the sequence   
            game.score++;                                                        //if os increment the score   
            showScore();                                                        //run showscore function
            addTurn();                                                            //run add turn function
        }
    } else {
        alert("Wrong move!");                                               //otherwise worng move
        newGame();                                                            //run newgame function 
    }
}

module.exports = { game, newGame, showScore, addTurn, lightsOn, showTurns,playerTurn };    //this exports it so JEST can run tests against it. in {} becuase we will be exportign more than 1 FUNCTION
