let isKioskMode = false;

chrome.commands.onCommand.addListener((command) => {
    if (command === "toggle-kiosk") {
        isKioskMode = !isKioskMode;
        if (isKioskMode) {
            openKioskTab();
        }
    }
});

function openKioskTab() {
    chrome.tabs.create({ url: "https://shelfconsole.glitch.me/" }, (tab) => {
        chrome.tabs.onUpdated.addListener(function checkTab(tabId, changeInfo) {
            if (tabId === tab.id && changeInfo.status === 'complete') {
                chrome.tabs.executeScript(tab.id, {
                    code: `
                        document.documentElement.requestFullscreen();
                        window.onbeforeunload = function() {
                            return "Are you sure you want to exit Kiosk Mode?";
                        };
                    `
                });
                chrome.tabs.onUpdated.removeListener(checkTab);
            }
        });
    });
}
