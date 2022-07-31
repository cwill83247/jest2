const { TestScheduler } = require("jest");
const { hasUncaughtExceptionCaptureCallback } = require("process");

/**
 * @jest-environment jsdom
 */
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
    })
});