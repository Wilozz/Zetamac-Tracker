document.addEventListener('DOMContentLoaded', () => {
    const scoresListDiv = document.getElementById('scoresList');
    scoresListDiv.innerHTML = '<p>Loading scores...</p>'; // Placeholder

    const highScoreDiv = document.getElementById('highScore'); 
    highScoreDiv.textContent = 'High Score - '; 
  
    chrome.storage.local.get({ scores: [] }, (result) => {
      const scores = result.scores;
  
      if (scores.length === 0) {
        scoresListDiv.innerHTML = '<p>No scores recorded yet. Play a game!</p>';
        return;
      }

      if (scores.length > 0) {
        let maxScore = Math.max(...scores.map(record => record.score)); 
        highScoreDiv.textContent = `High Score: ${maxScore}`; 
      } else {
        highScoreDiv = 'No high score found'; 
      }
  
      // Clear placeholder
      scoresListDiv.innerHTML = '';
  
      // Display each score (newest first if sorted in background.js)
      scores.forEach(record => {
        const scoreElement = document.createElement('p');
        const date = new Date(record.timestamp);
        // Format date/time nicely
        const formattedDate = date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
        scoreElement.textContent = `Score: ${record.score} (on ${formattedDate})`;
        scoresListDiv.appendChild(scoreElement);
      });
    });
  });