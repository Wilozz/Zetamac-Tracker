console.log('Content script loaded'); 

function checkForScore() {
    const scoreElement = document.querySelector("p.correct");
  
    if (scoreElement) {
      const fullText = scoreElement.innerText;
      // Use regex to find digits
      const match = fullText.match(/\d+/);
  
      if (match) {
        const scoreText = match[0]; // Get the matched digits (e.g., "58")
        const score = parseInt(scoreText); // Convert to number
  
        if (!isNaN(score)) {
          console.log("Successfully extracted score:", score); // Should show 58
  
            // *** Send score to background script ***
            chrome.runtime.sendMessage({ type: "SCORE_FOUND", score: score }, (response) => {
                if (chrome.runtime.lastError) {
                    // Handle potential errors like the background script not being ready
                    console.error("Error sending message:", chrome.runtime.lastError.message);
                } else {
                    console.log("Response from background:", response); // Optional: check response
                }
            });
  
        } else {
          console.error("Parsing failed for extracted text:", scoreText);
        }
      } else {
        console.error("Could not find digits in the text:", fullText);
      }
    } else {
       console.log("Score element (<p class='correct'>) not found yet...");
    }
  }
  
  // --- Simple way to check periodically ---
  // Zetamac seems to reload the page or heavily modify it for results,
  // so running the check when the script loads might be enough after a game.
  // For more dynamic sites, MutationObserver is better, but let's start simple.
  // We'll try running it once after a short delay, assuming the results page has loaded.
  setTimeout(checkForScore, 121000); // Check 1 second after script loads
  