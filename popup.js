
function displayScores(scores, targetDiv) {
    targetDiv.innerHTML = ''; 

    if (scores.length === 0) {
        scoresListDiv.innerHTML = '<p>No scores recorded yet. Play a game!</p>';
        return;
    }

    scores.forEach(record => {
        const scoreElement = document.createElement('p');
        const date = new Date(record.timestamp);
        const formattedDate = date.toLocaleDateString() /*+ ' ' + date.toLocaleTimeString()*/;
        scoreElement.textContent = `Score: ${record.score} (on ${formattedDate})`;
        targetDiv.appendChild(scoreElement);
      });
}

document.addEventListener('DOMContentLoaded', () => {
    const scoresListDiv = document.getElementById('scoresList');
    scoresListDiv.innerHTML = '<p>Loading scores...</p>';

    const highScoreDiv = document.getElementById('highScore'); 
    highScoreDiv.textContent = 'High Score - '; 

    const sortSelectorElement = document.getElementById('sortSelector'); 
  
    let scores = []; 

    chrome.storage.local.get({ scores: [] }, (result) => {
      scores = result.scores;

      if (scores.length > 0) {
        let maxScore = Math.max(...scores.map(record => record.score)); 
        highScoreDiv.textContent = `High Score: ${maxScore}`; 
      } else {
        highScoreDiv.textContent = 'No high score found'; 
      }
        
      displayScores(scores, scoresListDiv); 
    });

    sortSelectorElement.addEventListener('change', () => {
      const sortFormat = sortSelectorElement.value;

      if (sortFormat == "Time") {
        displayScores(scores, scoresListDiv);
      } else {
        displayScores([...scores].sort((a, b) => b.score - a.score), scoresListDiv); 
      }

    }); 
  });