import { Component, OnInit } from '@angular/core';
import { NgChartsModule } from 'ng2-charts';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NgChartsModule, CommonModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  isLoading = true;
  selectedPeriod = '30days';

  // Mock Statistics Data
  stats = {
    totalUsers: 15420,
    totalTrips: 3287,
    revenue: 125840,
    activeDrivers: 287,
    userGrowth: 12.5,
    tripGrowth: 8.3,
    revenueGrowth: 15.7,
    driverGrowth: 6.2,
    averageDriverRating: 4.7,
    averageWaitTime: 6,
    cancellationRate: 3.2,
    todayRevenue: 4560
  };

  // Mock Recent Activities
  recentActivities = [
    {
      title: 'New User Registered',
      time: new Date(Date.now() - 5 * 60000), // 5 minutes ago
      icon: 'fas fa-user-plus',
      type: 'success'
    },
    {
      title: 'New Trip Completed',
      time: new Date(Date.now() - 12 * 60000), // 12 minutes ago
      icon: 'fas fa-check-circle', // Corrected by removing "Epileptic"
      type: 'primary'
    },
    {
      title: 'New Driver Approved',
      time: new Date(Date.now() - 25 * 60000), // 25 minutes ago
      icon: 'fas fa-car',
      type: 'info'
    },
    {
      title: 'Trip Cancelled',
      time: new Date(Date.now() - 40 * 60000), // 40 minutes ago
      icon: 'fas fa-times-circle',
      type: 'warning'
    },
    {
      title: 'Driver Information Updated',
      time: new Date(Date.now() - 60 * 60000), // 1 hour ago
      icon: 'fas fa-edit',
      type: 'secondary'
    }
  ];

  // Chart Data
  userGrowthChart: ChartConfiguration['data'] = {
    datasets: [
      {
        data: [820, 932, 901, 934, 1290, 1330, 1320, 1540, 1420, 1680, 1750, 1820],
        label: 'New Users',
        borderColor: '#4f46e5',
        backgroundColor: 'rgba(79, 70, 229, 0.1)',
        fill: true,
        tension: 0.4,
        pointBackgroundColor: '#4f46e5',
        pointBorderColor: '#ffffff',
        pointBorderWidth: 2,
        pointRadius: 5
      },
      {
        data: [650, 820, 750, 840, 1100, 1200, 1150, 1300, 1200, 1400, 1500, 1580],
        label: 'Active Users',
        borderColor: '#10b981',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        fill: true,
        tension: 0.4,
        pointBackgroundColor: '#10b981',
        pointBorderColor: '#ffffff',
        pointBorderWidth: 2,
        pointRadius: 5
      }
    ],
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  };

  tripDistributionChart: ChartConfiguration['data'] = {
    datasets: [
      {
        data: [45, 25, 20, 10],
        backgroundColor: [
          '#4f46e5',
          '#10b981',
          '#f59e0b',
          '#ef4444'
        ],
        borderWidth: 0,
        hoverBackgroundColor: [
          '#4338ca',
          '#059669',
          '#d97706',
          '#dc2626'
        ]
      }
    ],
    labels: ['Completed Trips', 'Ongoing Trips', 'Cancelled Trips', 'Pending Trips']
  };

  // Chart Options
  chartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          usePointStyle: true,
          padding: 20,
          font: {
            size: 12
          }
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#ffffff',
        bodyColor: '#ffffff',
        cornerRadius: 8,
        displayColors: true
      }
    },
    scales: {
      x: {
        grid: {
          display: false
        },
        ticks: {
          font: {
            size: 11
          }
        }
      },
      y: {
        grid: {
          color: 'rgba(0, 0, 0, 0.1)'
        },
        ticks: {
          font: {
            size: 11
          }
        }
      }
    },
    elements: {
      point: {
        hoverRadius: 8
      }
    }
  };

  pieChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          usePointStyle: true,
          padding: 15,
          font: {
            size: 11
          }
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#ffffff',
        bodyColor: '#ffffff',
        cornerRadius: 8,
        callbacks: {
          label: (context) => {
            const label = context.label || '';
            const value = context.parsed;
            return `${label}: ${value}%`;
          }
        }
      }
    }
  };

  ngOnInit() {
    // Simulate loading
    setTimeout(() => {
      this.isLoading = false;
    }, 1500);
  }

  refreshData() {
    this.isLoading = true;
    
    // Simulate API call with random data updates
    setTimeout(() => {
      this.stats = {
        ...this.stats,
        totalUsers: this.stats.totalUsers + Math.floor(Math.random() * 50),
        totalTrips: this.stats.totalTrips + Math.floor(Math.random() * 20),
        revenue: this.stats.revenue + Math.floor(Math.random() * 1000),
        activeDrivers: this.stats.activeDrivers + Math.floor(Math.random() * 10),
        todayRevenue: Math.floor(Math.random() * 5000) + 3000
      };
      
      // Add new activity
      this.recentActivities.unshift({
        title: 'Data Updated',
        time: new Date(),
        icon: 'fas fa-sync-alt',
        type: 'success'
      });
      
      // Keep only last 5 activities
      if (this.recentActivities.length > 5) {
        this.recentActivities = this.recentActivities.slice(0, 5);
      }
      
      this.isLoading = false;
    }, 1000);
  }

  exportReport() {
    // Simulate report export
    const reportData = {
      date: new Date().toISOString(),
      stats: this.stats,
      period: this.selectedPeriod
    };
    
    // In a real app, you would generate and download a file
    console.log('Exporting report:', reportData);
    
    // Show success message (you can use a toast notification library)
    alert('Report Exported Successfully!');
  }

  updateChartData() {
    // Update chart data based on selected period
    let newData: number[] = [];
    let newLabels: string[] = [];
    
    switch (this.selectedPeriod) {
      case '7days':
        newData = [120, 135, 140, 125, 160, 155, 170];
        newLabels = ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
        break;
      case '30days':
        newData = Array.from({length: 30}, () => Math.floor(Math.random() * 100) + 50);
        newLabels = Array.from({length: 30}, (_, i) => `${i + 1}`);
        break;
      case '6months':
        newData = [1200, 1350, 1280, 1450, 1600, 1820];
        newLabels = ['July', 'August', 'September', 'October', 'November', 'December'];
        break;
      case '1year':
        newData = [820, 932, 901, 934, 1290, 1330, 1320, 1540, 1420, 1680, 1750, 1820];
        newLabels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        break;
    }
    
    this.userGrowthChart = {
      ...this.userGrowthChart,
      datasets: [
        {
          ...this.userGrowthChart.datasets[0],
          data: newData
        }
      ],
      labels: newLabels
    };
  }

  // Added trackBy function to optimize ngFor
  trackByActivity(index: number, activity: any): string {
    return activity.time.toISOString(); // Use time as a unique identifier
  }
}