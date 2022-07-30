const { TestScheduler } = require("jest");
const addition = require("../calc");

describe("Calculator", () =>  {                  //just naming the test 
    describe("Addition function", () => {           //being more detailed in what it does and tests
        test("should return 42 for 20 + 22", () =>{
            expect(addition(20,22)).toBe(42);
        })
        test("should return 73 for 42 + 31", () =>{  // added another addition test
            expect(addition(42,31)).toBe(73);
        })
    });
    describe("Subtraction function", () => {

        describe("Multiply function", () => {

        });
    });
    describe("Division function", () => {

    });
})