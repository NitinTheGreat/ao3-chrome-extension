// // // chrome.runtime.onInstalled.addListener(() => {
// // //   chrome.storage.local.get("refreshToken", (result) => {
// // //     if (result.refreshToken === undefined) {
// // //       chrome.storage.local.set({ refreshToken: "Empty" }, () => {
// // //         console.log('Testing in set');
// // //       });
// // //     } else {
// // //       console.log("Already logged in ");
// // //     }
// // //   });
// // // });
// // // chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
// // //   if (message.action === "saveGreeting") {
// // //     chrome.storage.local.set({ greeting: message.value }, () => {
// // //       if (chrome.runtime.lastError) {
// // //         sendResponse({ status: "error", message: chrome.runtime.lastError.message });
// // //       } else {
// // //         sendResponse({ status: "success" });
// // //       }
// // //     });
// // //     return true;
// // //   }
// // // });


// // // New way from Anirudh 
// // // chrome.runtime.onMessageExternal.addListener(
// // //   (request, sender, sendResponse) => {
// // //     console.log('got smth');
// // //     if (request.action === 'storeToken') {
// // //       chrome.storage.local.set({ refreshToken: request.token }, function () {
// // //         console.log('Token stored successfully');
// // //         sendResponse({ status: 'success' });
// // //       });
// // //       return true; // Keep the message channel open for sendResponse
// // // }
// // // }
// // // );

// // // More changes
// // // Background script
// // // chrome.runtime.onMessageExternal.addListener((request, sender, sendResponse) => {
// // //   console.log('Received external message', request);
// // //   if (request.action === 'storeToken') {
// // //     chrome.storage.local.set({ refreshToken: request.token }, () => {
// // //       if (chrome.runtime.lastError) {
// // //         console.error('Error storing token:', chrome.runtime.lastError.message);
// // //         sendResponse({ status: 'error', message: chrome.runtime.lastError.message });
// // //       } else {
// // //         console.log('Token stored successfully');
// // //         sendResponse({ status: 'success' });
// // //       }
// // //     });
// // //     return true; // Keep the message channel open for async response
// // //   } else {
// // //     sendResponse({ status: 'error', message: 'Invalid action' });
// // //   }
// // // });

// // // // background.js (Chrome Extension)
// // // chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
// // //   if (request.action === 'storeToken') {
// // //     // Store the token in chrome.storage.local
// // //     chrome.storage.local.set({ refreshToken: request.refreshToken }, () => {
// // //       if (chrome.runtime.lastError) {
// // //         console.error('Error storing token:', chrome.runtime.lastError.message);
// // //         sendResponse({ status: 'error', message: chrome.runtime.lastError.message });
// // //       } else {
// // //         console.log('Token stored successfully');
// // //         sendResponse({ status: 'success' });
// // //       }
// // //     });
// // //     return true; // Keep the message channel open for async response
// // //   }
// // // });

// // // chrome.runtime.onMessageExternal.addListener(
// // //   (request, sender, sendResponse) => {
// // //     console.log('got smth');
// // //     if (request.action === 'storeToken') {
// // //       chrome.storage.local.set({ refreshToken: request.token }, function () {
// // //         console.log('Token stored successfully');
// // //         sendResponse({ status: 'success' });
// // //       });
// // //       return true; // Keep the message channel open for sendResponse
// // //     }
// // //   }
// // // );
// // console.log('Background script running ');

// // chrome.runtime.onMessageExternal.addListener((request, sender, sendResponse) => {
// //   console.log('Message received:', request); // Check if message is logged
// //   if (request.action === 'storeToken') {
// //     console.log('Storing token:', request.token); // Log token before storing
// //     chrome.storage.local.set({ refreshToken: request.token }, function () {
// //       console.log('Token stored successfully');
// //       sendResponse({ status: 'success' });
// //     });
// //   } else {
// //     console.log('Unknown action received:', request.action);
// //   }
// //   return true; // Ensure the message channel stays open for async response
// // });

// // const getRefreshToken = () => new Promise((resolve) => {
// //   console.log('Getting refresh token');
// //   chrome.storage.local.get(['refreshToken'], (result) => resolve(result.refreshToken));
// // });

// // getRefreshToken()
// //   .then((refreshToken) => {
// //     if (refreshToken) {
// //       console.log('Refresh token found:', refreshToken);
// //       return chrome.storage.local.set({ refreshToken });
// //     }
// //   })
// //   .then(() => console.log('Token stored successfully'))
// //   .catch((error) => console.error('Error storing token:', error));

// //   // chrome.storage.local.get(['refreshToken'], function(result) {
// //   //     console.log("result", result);
// //   //     console.log('Stored refreshToken:', result.refreshToken); // Check if token is stored
// //   //     chrome.storage.local.set({ refreshToken: result.refreshToken }, function() {
// //   //       console.log('Token stored successfully');
// //   //     });
// //   //   });


// //   console.log('New from chatgpt script running ');
// //   chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
// //     if (request.action === "getAccessToken") {
// //       // Simulate retrieving token from storage or external source
// //       getAccessTokenFromStorage()
// //         .then((accessToken) => {
// //           sendResponse({ accessToken });
// //         })
// //         .catch((error) => {
// //           console.error('Error fetching token:', error);
// //           sendResponse({ error: 'Failed to fetch access token' });
// //         });
// //       return true; // Keep the message channel open for async response
// //     }
// //   });
  
// //   // Function to get the access token from storage or simulate retrieval
// //   function getAccessTokenFromStorage() {
// //     return new Promise((resolve, reject) => {
// //       chrome.storage.local.get('accessToken', (result) => {
// //         if (result.accessToken) {
// //           resolve(result.accessToken);
// //         } else {
// //           reject(new Error('No access token found'));
// //         }
// //       });
// //     });
// //   }
  


// // Existing message listener to store token from external source
// chrome.runtime.onMessageExternal.addListener((request, sender, sendResponse) => {
//   console.log('Message received:', request);
//   if (request.action === 'storeToken') {
//     console.log('Storing token:', request.token);
//     chrome.storage.local.set({ refreshToken: request.token }, function () {
//       console.log('Token stored successfully');
//       sendResponse({ status: 'success' });
//     });
//   } else {
//     console.log('Unknown action received:', request.action);
//   }
//   return true; // Keep message channel open
// });

// // New listener to respond to a message from Popup.jsx requesting the refreshToken
// chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
//   if (request.action === 'getRefreshToken') {
//     console.log('Getting refresh token');
//     chrome.storage.local.get(['refreshToken'], (result) => {
//       if (result.refreshToken) {
//         console.log('Refresh token found:', result.refreshToken);
//         sendResponse({ refreshToken: result.refreshToken });
//       } else {
//         sendResponse({ error: 'No refresh token found' });
//       }
//     });
//     return true; // Keep the message channel open for asynchronous response
//   }
// });

// Existing listener for external messages
chrome.runtime.onMessageExternal.addListener((request, sender, sendResponse) => {
  console.log('Message received:', request);
  
  if (request.action === 'storeTokens') {
    // console.log('Storing accessToken and refreshToken:', request.accessToken, request.refreshToken);
    console.log("first token", request.accessToken);

    // Store both tokens in chrome.storage.local
    chrome.storage.local.set({ accessToken: request.accessToken, refreshToken: request.refreshToken }, function () {
      console.log('Tokens stored successfully');
      sendResponse({ status: 'success' });
    });

  } else {
    console.log('Unknown action received:', request.action);
  }

  return true; // Keep message channel open
});

// New method to retrieve both tokens
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'getTokens') {
    chrome.storage.local.get(['accessToken', 'refreshToken'], (result) => {
      if (result.accessToken && result.refreshToken) {
        console.log('Access and Refresh tokens found:', result.accessToken, result.refreshToken);
        sendResponse({ accessToken: result.accessToken, refreshToken: result.refreshToken });
      } else {
        sendResponse({ error: 'No tokens found' });
      }
    });
    return true; // Keep message channel open for async response
  }
});

