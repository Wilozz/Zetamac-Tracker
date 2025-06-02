let chartInstance = null; 

chrome.storage.local.get("scores", (data) => {
    const scores = data.scores || [];
    setupDropdown(scores); 
    renderChart(scores);
});

function setupDropdown(scores) {
    const select = document.getElementById("rangeSelect"); 
    select.addEventListener("change", () => {
        const value = select.value; 
        let filtered = [...scores]; 

        if (value === "30") {
            filtered = scores.slice(-30); 
        } else if (value === "60") {
            filtered = scores.slice(-60); 
        }

        renderChart(filtered)
    }); 
}

function renderChart(scores) {
    scores.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
    const labels = scores.map(s => new Date(s.timestamp).toLocaleDateString());
    const dataPoints = scores.map(s => s.score);

    const ctx = document.getElementById("scoreChart").getContext("2d");

    if (chartInstance) {
        chartInstance.destroy();
    }

    chartInstance = new Chart(ctx, {
        type: 'line',
        data: {
            labels,
            datasets: [{
                label: 'Zetamac Score Over Time',
                data: dataPoints,
                borderColor: 'blue',
                backgroundColor: 'rgba(0, 123, 255, 0.1)',
                borderWidth: 2,
                fill: true,
                tension: 0.3,
                pointRadius: 3
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: false,
                    suggestedMax: 100
                }
            }
        }
    });
}

