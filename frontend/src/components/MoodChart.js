import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const MoodChart = ({ data, type = 'bar' }) => {
  if (!data || data.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p>No data available for chart</p>
      </div>
    );
  }

  const chartData = {
    labels: data.map(item => item._id),
    datasets: [
      {
        label: 'Mood Count',
        data: data.map(item => item.count),
        backgroundColor: [
          '#3B82F6', // blue
          '#10B981', // green
          '#F59E0B', // yellow
          '#EF4444', // red
          '#8B5CF6', // purple
          '#06B6D4', // cyan
          '#F97316', // orange
          '#EC4899', // pink
          '#84CC16', // lime
          '#6366F1', // indigo
        ],
        borderColor: [
          '#2563EB',
          '#059669',
          '#D97706',
          '#DC2626',
          '#7C3AED',
          '#0891B2',
          '#EA580C',
          '#DB2777',
          '#65A30D',
          '#4F46E5',
        ],
        borderWidth: 2,
        borderRadius: 8,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return `${context.label}: ${context.parsed.y} entries`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
        },
      },
    },
  };

  const doughnutData = {
    labels: data.map(item => item._id),
    datasets: [
      {
        data: data.map(item => item.count),
        backgroundColor: [
          '#3B82F6',
          '#10B981',
          '#F59E0B',
          '#EF4444',
          '#8B5CF6',
          '#06B6D4',
          '#F97316',
          '#EC4899',
          '#84CC16',
          '#6366F1',
        ],
        borderColor: '#ffffff',
        borderWidth: 2,
      },
    ],
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          usePointStyle: true,
          padding: 20,
        },
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            const total = context.dataset.data.reduce((a, b) => a + b, 0);
            const percentage = ((context.parsed / total) * 100).toFixed(1);
            return `${context.label}: ${context.parsed} (${percentage}%)`;
          }
        }
      }
    },
  };

  return (
    <div className="w-full">
      {type === 'bar' ? (
        <div className="h-80">
          <Bar data={chartData} options={options} />
        </div>
      ) : (
        <div className="h-80">
          <Doughnut data={doughnutData} options={doughnutOptions} />
        </div>
      )}
      
      {/* Summary Stats */}
      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
        {data.slice(0, 4).map((item, index) => (
          <div key={index} className="text-center p-3 bg-gray-50 rounded-lg">
            <div className="text-2xl mb-1">{item._id}</div>
            <div className="text-sm text-gray-600">{item.count} entries</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MoodChart;
