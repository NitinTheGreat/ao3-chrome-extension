// contentScript.js
console.log("Content script is running");

window.addEventListener("AO3_SEND_TOKENS", (event) => {
  const { accessToken, refreshToken } = event.detail;
  console.log("Received tokens in content script:", accessToken, refreshToken);
  
  chrome.runtime.sendMessage({
    type: "STORE_TOKENS",
    accessToken,
    refreshToken,
  }, (response) => {
    console.log("Background response:", response);
  });
});
