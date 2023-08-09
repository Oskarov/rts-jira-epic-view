chrome.action.onClicked.addListener((_) => {
    alert(123)
    let newURL = chrome.runtime.getURL("pages/popup/index.html");
    chrome.tabs.create({ url: newURL});
});