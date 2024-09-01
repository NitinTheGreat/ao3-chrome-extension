chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.get("refreshToken", (result) => {
    if (result.refreshToken === undefined) {
      chrome.storage.local.set({ refreshToken: "Empty" }, () => {
        console.log('Testing in set');
      });
    } else {
      console.log("Already logged in ");
    }
  });
});