declare var chrome: any;

chrome = window.chrome;

// import * as chrome from 'chrome';


console.log("wwoooooowww this is the background file")

let baseEmail = ''

// let sharedData = {
//     email: '',
// };


chrome.runtime.onMessage.addListener(function (request: any) {
    if (request.type === "setEmail") {
        console.log("THE SET EMAIL METHOD WAS INVOKED")
        baseEmail = request.email;
    }
})

chrome.runtime.onMessage.addListener(function (request: any, sendResponse: any) {
    if (request.type === "getEmail") {
        console.log("THE GET EMAIL METHOD WAS INVOKED")
        sendResponse({ email: baseEmail });
    }
});