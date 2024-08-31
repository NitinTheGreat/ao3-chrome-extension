// content.js
const token = browser.localStorage.getItem('refreshToken'); 

if (token) {
  chrome.runtime.sendMessage({ type: 'STORE_TOKEN', token });
}
