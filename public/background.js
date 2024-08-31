chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "openLoginPage") {
      chrome.tabs.create({ url: "http://localhost:5173" });
      sendResponse({ status: "success" });
    }
  });
  