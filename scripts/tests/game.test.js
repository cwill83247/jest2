const { TestScheduler } = require("jest");
const { hasUncaughtExceptionCaptureCallback } = require("process");

/**
 * @jest-environment jsdom
 */
 const {game, newGame, showScore, addTurn} = require("../game");               // we are importing the functions from game.js
 

beforeAll(() => {                        //this is standard for DOM import ot load a html file
let fs = require("fs");
let fileContents =fs.readFileSync("index.html", "utf-8");
document.open();
document.write(fileContents);
document.close();
})

describe ("game object contains correct keys", () => {    // gave a description for the group of tests that will follow
    test("score key exists", () => {                       //name for test
        expect("score" in game).toBe(true);               // the testing criteria
    });
    test("current game key exists", () => {                       //name for test
        expect("currentGame" in game).toBe(true);               // the testing criteria
    });
    test("playerMoves key exists", () => {                       //name for test
        expect("playerMoves" in game).toBe(true);               // the testing criteria
    });
    test("choices key exists", () => {                       //name for test
        expect("choices" in game).toBe(true);               // the testing criteria
    });
    test("button choices contain correct ids", () => {
        expect(game.choices).toEqual(["button1", "button2", "button3", "button4"]);  // checking choices in JS contain button1,2,3 etc as options
    });
});

describe("testing newGame works correctly", () => {
    beforeAll(() => {                         //this before all puts a score in 42, then runs new game so we cna test if resrt to 0
        game.score = 42;
        game.playerMoves= ["button1","button2"];
        game.currentGame= ["button1","button2"];
        document.getElementById("score").innerText = "42";
        newGame();
    });
    test("should set game score to zero", () => {             //what we are testing 
        expect(game.score).toEqual(0);  
    });  
    test("should display 0 for the score element within the html", () => {
        expect(document.getElementById("score").innerText).toEqual(0);    //we are saying we expect the html element with the ID "score" to have a value of "0"
    }); 
    test("should be one move in the computers game array", () => {             //what we are testing 
        expect(game.currentGame.length).toBe(1);  
    });    
    
    test("should reset playerMoves", () => {             //what we are testing 
        expect(game.playerMoves.length).toBe(0);  
    });            
    test("should be one move in the computers array", () => {             //what we are testing 
        expect(game.currentGame.length).toBe(1);  
    });    
   
     
    
 });