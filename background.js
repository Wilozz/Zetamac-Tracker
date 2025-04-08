chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === "SCORE_FOUND") {
      console.log("Background script received score:", message.score);
      const scoreValue = message.score;
      const timestamp = new Date().toISOString(); // Get current time
  
      const record = {
        score: scoreValue,
        timestamp: timestamp
      };
  
      // Get existing scores, add the new one, and save
      chrome.storage.local.get({ scores: [] }, (result) => {
        const scores = result.scores;
        scores.push(record);
        // Sort scores by date, newest first (optional but nice)
        scores.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  
        chrome.storage.local.set({ scores: scores }, () => {
          console.log("Score saved:", record);
        });
      });
  
      return true; 
    }
  });
  
  console.log("Background service worker started.");