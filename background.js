chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete' && tab.url !== "https://shelfconsole.glitch.me/") {
        chrome.tabs.update(tabId, { url: "https://shelfconsole.glitch.me/" });
    }
});
