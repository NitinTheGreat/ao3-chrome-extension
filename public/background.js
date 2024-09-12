// chrome.runtime.onInstalled.addListener(() => {
//   chrome.storage.local.get("refreshToken", (result) => {
//     if (result.refreshToken === undefined) {
//       chrome.storage.local.set({ refreshToken: "Empty" }, () => {
//         console.log('Testing in set');
//       });
//     } else {
//       console.log("Already logged in ");
//     }
//   });
// });
// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//   if (message.action === "saveGreeting") {
//     chrome.storage.local.set({ greeting: message.value }, () => {
//       if (chrome.runtime.lastError) {
//         sendResponse({ status: "error", message: chrome.runtime.lastError.message });
//       } else {
//         sendResponse({ status: "success" });
//       }
//     });
//     return true;
//   }
// });


// New way from Anirudh 
// chrome.runtime.onMessageExternal.addListener(
//   (request, sender, sendResponse) => {
//     console.log('got smth');
//     if (request.action === 'storeToken') {
//       chrome.storage.local.set({ refreshToken: request.token }, function () {
//         console.log('Token stored successfully');
//         sendResponse({ status: 'success' });
//       });
//       return true; // Keep the message channel open for sendResponse
// }
// }
// );

// More changes
// Background script
// chrome.runtime.onMessageExternal.addListener((request, sender, sendResponse) => {
//   console.log('Received external message', request);
//   if (request.action === 'storeToken') {
//     chrome.storage.local.set({ refreshToken: request.token }, () => {
//       if (chrome.runtime.lastError) {
//         console.error('Error storing token:', chrome.runtime.lastError.message);
//         sendResponse({ status: 'error', message: chrome.runtime.lastError.message });
//       } else {
//         console.log('Token stored successfully');
//         sendResponse({ status: 'success' });
//       }
//     });
//     return true; // Keep the message channel open for async response
//   } else {
//     sendResponse({ status: 'error', message: 'Invalid action' });
//   }
// });

// // background.js (Chrome Extension)
// chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
//   if (request.action === 'storeToken') {
//     // Store the token in chrome.storage.local
//     chrome.storage.local.set({ refreshToken: request.refreshToken }, () => {
//       if (chrome.runtime.lastError) {
//         console.error('Error storing token:', chrome.runtime.lastError.message);
//         sendResponse({ status: 'error', message: chrome.runtime.lastError.message });
//       } else {
//         console.log('Token stored successfully');
//         sendResponse({ status: 'success' });
//       }
//     });
//     return true; // Keep the message channel open for async response
//   }
// });

// chrome.runtime.onMessageExternal.addListener(
//   (request, sender, sendResponse) => {
//     console.log('got smth');
//     if (request.action === 'storeToken') {
//       chrome.storage.local.set({ refreshToken: request.token }, function () {
//         console.log('Token stored successfully');
//         sendResponse({ status: 'success' });
//       });
//       return true; // Keep the message channel open for sendResponse
//     }
//   }
// );
console.log('Background script running ');

chrome.runtime.onMessageExternal.addListener((request, sender, sendResponse) => {
  console.log('Message received:', request); // Check if message is logged
  if (request.action === 'storeToken') {
    console.log('Storing token:', request.token); // Log token before storing
    chrome.storage.local.set({ refreshToken: request.token }, function () {
      console.log('Token stored successfully');
      sendResponse({ status: 'success' });
    });
  } else {
    console.log('Unknown action received:', request.action);
  }
  return true; // Ensure the message channel stays open for async response
});

chrome.storage.local.get(['refreshToken'], function(result) {
  console.log('Stored refreshToken:', result.refreshToken); // Check if token is stored
  chrome.storage.local.set({ refreshToken: result.refreshToken }, function () {
    console.log('Token stored successfully second');
  });
});



