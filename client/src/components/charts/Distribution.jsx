import { useState, useEffect } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function CarbonScoreChart({ userScore }) {
    const [chartData, setChartData] = useState({
        labels: ['0-5', '6-10', '11-15', '16-20', '21-25', '26-30', '31-35', '36-40', '41-45', '46-50'],
        datasets: [
            {
                label: 'Number of Users',
                data: generateRandomCounts(10),
                backgroundColor: 'rgba(54, 162, 235, 0.5)', // Default blue color
            },
        ],
    });

    const userScoreIndex = Math.floor(userScore / 5);

    useEffect(() => {
        const normalDistData = generateRandomCounts(60);
        const backgroundColor = Array(60).fill('rgba(54, 162, 235, 0.5)'); // Blue for all bars
        backgroundColor[userScoreIndex] = 'rgba(255, 99, 132, 0.5)'; // Red for user's score bar

        setChartData({
            labels: generateLabels(300, 5),
            datasets: [
                {
                    label: 'Number of Users',
                    data: normalDistData,
                    backgroundColor: backgroundColor,
                },
            ],
        });
    }, [userScore]);

    function generateLabels(max, step) {
        const labels = [];
        for (let i = 0; i <= max; i += step) {
            const rangeEnd = i + step - 1;
            labels.push(`${i}-${rangeEnd}`);
        }
        return labels;
    }

    function generateRandomCounts(count) {
        // Parameters for the normal distribution
        const mean = count / 2; // Center of the distribution
        const stdDev = count / 6; // Standard deviation to control spread
        const maxHeight = 100; // Maximum height of the bars

        return Array.from({ length: count }, (_, index) => {
            // Calculate the normal distribution value
            const exponent = -Math.pow(index - mean, 2) / (2 * Math.pow(stdDev, 2));
            const value = Math.exp(exponent);

            // Scale the value to get a nice bell curve shape
            return Math.round(value * maxHeight);
        });
    }

    return (
        <div>
            <h2>Carbon Score Distribution</h2>
            <Bar
                data={chartData}
                options={{
                    scales: {
                        y: {
                            beginAtZero: true,
                            max: 100,
                        }
                    },
                    responsive: true,
                    maintainAspectRatio: true,
                }}
            />
        </div>
    );
}

export default CarbonScoreChart;