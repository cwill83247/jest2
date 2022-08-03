const { TestScheduler } = require("jest");
const { hasUncaughtExceptionCaptureCallback } = require("process");

/**
 * @jest-environment jsdom
 */
 const {game, newGame, showScore, addTurn, lightsOn, showTurns, playerTurn} = require("../game");               // we are importing the functions from game.js
 
jest.spyOn(window, "alert").mockImplementation(() => { }); //this is used to check if an alert window has been triggered

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
    test("expect data-listener to be true", () => {                                
        newGame();
        const elements = document.getElementsByClassName("circle"); // get all of the classes with name circle and creating elements const
        for (let element of elements) {                                // iterating through the list each one becomes element                            
            expect(element.getAttribute("data-listener")).toEqual("true");        //this is checking if the datalistenr fo reach element ( ie item with id of circle) in index html is NOw true default is false
        }
    });      
    
 });

 describe ("gameplay works correctly",() => {
    beforeEach (() => {  // before each test runs
       game.score=0;
       game.currentGame = [];
       game.playerMoves = [];
       addTurn();                     //we are testing addTurn
    });
    afterEach (() => {  // Aftereach test this is now runnignt he below to rest the values 
        game.score=0;
        game.currentGame = [];
        game.playerMoves = [];
        addTurn();
     });
     test("addTurn adds a new turn to the game", () => {
        addTurn();
        expect(game.currentGame.length).toBe(2);
    });
    test("has correct class been added to button to light it up", () => {
        let button = document.getElementById(game.currentGame[0]); // here we are saying button is equal to game.currentGame and 1st item in the array
        lightsOn(game.currentGame[0]);                                //lighton function being called using the current.Game  0 ID so 1st one in the array
        expect(button.classList).toContain("light");               //we expect the button to contain the light class in this test
    });
    test("showTurns should update game.turnNumber", () => {
        game.turnNumber = 42;                 //setting it to 42
        showTurns();                            //this should reset turn number
        expect(game.turnNumber).toBe(0);         //is turn number 0 
    });
    test("should increment the score if the turn is correct", () => { // if player completes the sequence correctly
        game.playerMoves.push(game.currentGame[0]);
        playerTurn();
        expect(game.score).toBe(1);
    });
    test("turns progress to True when the computer is playing", () => {
        showTurns();                            //this calls showTurns function
        expect(game.turnInProgress).toBe(true);         //we are expecting it to be true to show gAME IS IN PROGRESS whilst computer is playing.
    });
    test("clicking during computer sequence should fail", () => {  //if whilst game starts someone trys to click clicks 
        showTurns(); 
        game.lastButton = "";                                          
        document.getElementById("button2").click();                     //we are choosing button 2 to make sure no clicks are recogonised
        expect(game.lastButton).toEqual("");                              //so this will stay blank  this is how our function will be set 
    });
});

 