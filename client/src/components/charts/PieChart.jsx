import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ data, labels }) => {
    const colors = {
        background: [
            'rgba(255, 99, 132, 0.8)',   
            'rgba(54, 162, 235, 0.8)',   
            'rgba(255, 206, 86, 0.8)',   
            'rgba(75, 192, 192, 0.8)',   
            'rgba(153, 102, 255, 0.8)',  
            'rgba(255, 159, 64, 0.8)',   
            'rgba(46, 204, 113, 0.8)',   
        ],
        border: [
            'rgba(255, 99, 132, 1)',     
            'rgba(54, 162, 235, 1)',    
            'rgba(255, 206, 86, 1)',     
            'rgba(75, 192, 192, 1)',     
            'rgba(153, 102, 255, 1)',    
            'rgba(255, 159, 64, 1)',     
            'rgba(46, 204, 113, 1)',     
        ]
    };

    const chartData = {
        labels: labels,
        datasets: [
            {
                label: 'Section Rates',
                data: data,
                backgroundColor: colors.background,
                borderColor: colors.border,
                borderWidth: 0,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    padding: 20,
                    font: {
                        size: 12
                    }
                }
            },
            tooltip: {
                callbacks: {
                    label: function (tooltipItem) {
                        return `${tooltipItem.label}: ${tooltipItem.raw}%`;
                    },
                },
                padding: 12,
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
            },
        },
    };

    return <Pie data={chartData} options={options} />;
};

export default PieChart;