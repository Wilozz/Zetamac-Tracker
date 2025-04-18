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
  
            chrome.runtime.sendMessage({ type: "SCORE_FOUND", score: score }, (response) => {
                if (chrome.runtime.lastError) {
                    console.error("Error sending message:", chrome.runtime.lastError.message);
                } else {
                    console.log("Response from background:", response);
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
  
setTimeout(checkForScore, 121000);
  