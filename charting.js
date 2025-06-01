chrome.storage.local.get("scores", (data) => {
    const scores = data.scores || [];
    renderChart(scores);
});

function renderChart(scores) {
    const labels = scores.map(s => new Date(s.timestamp).toLocaleDateString());
    const dataPoints = scores.map(s => s.score);

    const ctx = document.getElementById("scoreChart").getContext("2d");
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Zetamac Score Over Time',
                data: dataPoints,
                borderColor: 'blue',
                borderWidth: 2,
                fill: false,
                tension: 0.2
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: false
                }
            }
        }
    });
}

