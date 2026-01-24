import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const Dashboard = ({ customers, loading }) => {
  const pieChartRef = useRef(null);
  const lineChartRef = useRef(null);
  const pieChartInstance = useRef(null);
  const lineChartInstance = useRef(null);

  // Calculate stats
  const totalCustomers = customers.length;
  const uniqueCompanies = [...new Set(customers.map(c => c.company))].length;

  useEffect(() => {
    if (customers.length === 0) return;

    // Destroy existing charts
    if (pieChartInstance.current) {
      pieChartInstance.current.destroy();
    }
    if (lineChartInstance.current) {
      lineChartInstance.current.destroy();
    }

    // Company distribution data
    const companyData = customers.reduce((acc, customer) => {
      const company = customer.company;
      acc[company] = (acc[company] || 0) + 1;
      return acc;
    }, {});

    const companies = Object.keys(companyData);
    const companyCounts = Object.values(companyData);

    // Vibrant gradient colors for dark theme
    const chartColors = [
      '#00D9FF', // Cyan
      '#0099FF', // Blue
      '#6B5FFF', // Purple
      '#A855F7', // Violet
      '#EC4899', // Pink
      '#F97316', // Orange
      '#10B981', // Green
      '#FBBF24', // Yellow
    ];

    // PIE CHART
    const pieCtx = pieChartRef.current.getContext('2d');
    pieChartInstance.current = new Chart(pieCtx, {
      type: 'doughnut',
      data: {
        labels: companies,
        datasets: [{
          data: companyCounts,
          backgroundColor: chartColors,
          borderColor: '#0f1c2e',
          borderWidth: 3,
          hoverOffset: 15,
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              color: '#94a3b8',
              font: {
                size: 12,
                family: "'Segoe UI', sans-serif"
              },
              padding: 15,
              usePointStyle: true,
              pointStyle: 'circle'
            }
          },
          tooltip: {
            backgroundColor: 'rgba(15, 28, 46, 0.95)',
            titleColor: '#00D9FF',
            bodyColor: '#e2e8f0',
            borderColor: '#00D9FF',
            borderWidth: 1,
            padding: 12,
            displayColors: true,
            callbacks: {
              label: function(context) {
                const label = context.label || '';
                const value = context.parsed || 0;
                const total = context.dataset.data.reduce((a, b) => a + b, 0);
                const percentage = ((value / total) * 100).toFixed(1);
                return `${label}: ${value} (${percentage}%)`;
              }
            }
          }
        },
        cutout: '65%',
        animation: {
          animateRotate: true,
          animateScale: true
        }
      }
    });

    // LINE CHART - Growth over time
    const growthData = customers.map((_, index) => index + 1);
    const labels = customers.map((_, index) => `#${index + 1}`);

    const lineCtx = lineChartRef.current.getContext('2d');
    lineChartInstance.current = new Chart(lineCtx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: 'Total Customers',
          data: growthData,
          borderColor: '#00D9FF',
          backgroundColor: (context) => {
            const ctx = context.chart.ctx;
            const gradient = ctx.createLinearGradient(0, 0, 0, 300);
            gradient.addColorStop(0, 'rgba(0, 217, 255, 0.3)');
            gradient.addColorStop(1, 'rgba(0, 217, 255, 0.01)');
            return gradient;
          },
          borderWidth: 3,
          tension: 0.4,
          fill: true,
          pointBackgroundColor: '#00D9FF',
          pointBorderColor: '#0f1c2e',
          pointBorderWidth: 2,
          pointRadius: 5,
          pointHoverRadius: 7,
          pointHoverBackgroundColor: '#00E5FF',
          pointHoverBorderWidth: 3
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
          mode: 'index',
          intersect: false,
        },
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            backgroundColor: 'rgba(15, 28, 46, 0.95)',
            titleColor: '#00D9FF',
            bodyColor: '#e2e8f0',
            borderColor: '#00D9FF',
            borderWidth: 1,
            padding: 12,
            displayColors: false
          }
        },
        scales: {
          x: {
            grid: {
              color: 'rgba(30, 58, 95, 0.3)',
              drawBorder: false
            },
            ticks: {
              color: '#94a3b8',
              font: {
                size: 11
              },
              maxRotation: 0,
              autoSkip: true,
              maxTicksLimit: 10
            }
          },
          y: {
            beginAtZero: true,
            grid: {
              color: 'rgba(30, 58, 95, 0.3)',
              drawBorder: false
            },
            ticks: {
              color: '#94a3b8',
              font: {
                size: 11
              },
              stepSize: 1
            }
          }
        }
      }
    });

    // Cleanup
    return () => {
      if (pieChartInstance.current) {
        pieChartInstance.current.destroy();
      }
      if (lineChartInstance.current) {
        lineChartInstance.current.destroy();
      }
    };
  }, [customers]);

  return (
    <div className="dashboard">
      {/* Header */}
      <div className="dashboard-header">
        <h1 className="dashboard-title">
          <span className="title-icon">📊</span>
          CRM Dashboard
        </h1>
        <p className="dashboard-subtitle">Real-time customer analytics and insights</p>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card stat-card-primary">
          <div className="stat-icon-wrapper">
            <div className="stat-icon">👥</div>
          </div>
          <div className="stat-content">
            <div className="stat-label">Total Customers</div>
            <div className="stat-value">{loading ? '...' : totalCustomers}</div>
            <div className="stat-trend">
              <span className="trend-icon">↗</span>
              <span className="trend-text">Active accounts</span>
            </div>
          </div>
        </div>

        <div className="stat-card stat-card-secondary">
          <div className="stat-icon-wrapper">
            <div className="stat-icon">🏢</div>
          </div>
          <div className="stat-content">
            <div className="stat-label">Unique Companies</div>
            <div className="stat-value">{loading ? '...' : uniqueCompanies}</div>
            <div className="stat-trend">
              <span className="trend-icon">📈</span>
              <span className="trend-text">Business partners</span>
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      {customers.length > 0 ? (
        <div className="charts-grid">
          <div className="chart-card">
            <div className="chart-header">
              <h3 className="chart-title">Customer Distribution by Company</h3>
              <p className="chart-subtitle">Market share breakdown</p>
            </div>
            <div className="chart-container">
              <canvas ref={pieChartRef}></canvas>
            </div>
          </div>

          <div className="chart-card">
            <div className="chart-header">
              <h3 className="chart-title">Customer Growth</h3>
              <p className="chart-subtitle">Cumulative customer acquisition</p>
            </div>
            <div className="chart-container">
              <canvas ref={lineChartRef}></canvas>
            </div>
          </div>
        </div>
      ) : (
        !loading && (
          <div className="empty-state">
            <div className="empty-icon">📭</div>
            <h3>No Data Available</h3>
            <p>Add your first customer to see analytics</p>
          </div>
        )
      )}
    </div>
  );
};

export default Dashboard;