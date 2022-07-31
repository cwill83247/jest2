let game = {
    score: 0,
    currentGame: [],     // add as an empty array to our game
    playerMoves: [],     // add playerMoves as an empty array to our game
    choices: ["button1","button2","button3","button4"],     // add chocies then button options in array for our game
}
function newGame() {          //newgame function
    game.score = 0; 
    game.currentGame = [];
    game.playerMoves =[];           //setting score to 0 using the dot notation
    showScore();                    //this just says run the showscore function as well 
  
}
function showScore() {
    document.getElementById("score").innerText= game.score; 
}


module.exports ={game, newGame,showScore};    //this exports it so JEST can run tests against it. in {} becuase we will be exportign more than 1 FUNCTION
