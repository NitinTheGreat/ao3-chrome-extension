// background.js
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'STORE_TOKEN' && message.token) {
      chrome.storage.local.set({ accessToken: message.token }, () => {
        console.log('Token stored in extension storage:', message.token);
      });
    }
  });
  