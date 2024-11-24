import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const AverageScoreChart = () => {
    const data = {
        labels: ['A', 'B', 'C', 'D'],
        datasets: [
            {
                label: 'Sample Data',
                data: [10, 20, 30, 40],
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: true,
            },
            title: {
                display: true,
                text: 'Chart with Category Scale',
            },
        },
        scales: {
            x: {
                type: 'category', // Use the 'category' scale
                grid: {
                    display: false,
                },
            },
            y: {
                type: 'linear', // Ensure the 'linear' scale is also registered
                beginAtZero: true,
            },
        },
    };

    return <Bar data={data} options={options} />;
};

export default AverageScoreChart;
