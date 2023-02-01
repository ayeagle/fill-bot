

let baseEmail = ''

console.log("wwoooooowww this is the background file")

console.log(chrome.storage.local);



chrome.storage.local.get(["email"], (result) => {
    if(result.key) {
        baseEmail = result.key
    } 
    // else if (localStorage.get('email')){
    //     baseEmail = localStorage.get('email')
    // }
})

let img = chrome.runtime.getURL("images/fillbot.png")
console.log(img)

chrome.runtime.onMessage.addListener(function (request, sender,  sendResponse) {
    if (request.type === "getLogo") {
        sendResponse({logo: img})
    }
})


chrome.runtime.onMessage.addListener(function (request) {
    if (request.type === "setEmail") {
        console.log("THE SET EMAIL METHOD WAS INVOKED")
        chrome.storage.local.set({ 'email': request.email})
        // localStorage.set('email',request.email)
        baseEmail = request.email;
    }
})

chrome.runtime.onMessage.addListener(function (request, sender,  sendResponse) {
    if (request.type === "getEmail") {
        console.log("THE GET EMAIL METHOD WAS INVOKED")

        sendResponse({ email: baseEmail });
    }
});