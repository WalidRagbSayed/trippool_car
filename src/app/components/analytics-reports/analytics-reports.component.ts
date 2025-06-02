import { Component, OnInit } from '@angular/core';
import { NgChartsModule } from 'ng2-charts';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-analytics-reports',
  standalone: true,
  imports: [NgChartsModule, CommonModule],
  templateUrl: './analytics-reports.component.html',
  styleUrls: ['./analytics-reports.component.scss']
})
export class AnalyticsReportsComponent implements OnInit {
  
  // Dummy data for demonstration
  totalRides = 1247;
  totalRevenue = 15650;
  activeDrivers = 89;
  avgRating = 4.7;
  completionRate = 94.5;

  // Chart configurations
  totalRidesChart: ChartConfiguration['data'] = {
    datasets: [],
    labels: []
  };

  revenueChart: ChartConfiguration['data'] = {
    datasets: [],
    labels: []
  };

  driverChart: ChartConfiguration['data'] = {
    datasets: [],
    labels: []
  };

  monthlyTrendsChart: ChartConfiguration['data'] = {
    datasets: [],
    labels: []
  };

  // Chart options
  barChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top'
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0,0,0,0.1)'
        }
      },
      x: {
        grid: {
          display: false
        }
      }
    }
  };

  pieChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom'
      }
    }
  };

  lineChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top'
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0,0,0,0.1)'
        }
      },
      x: {
        grid: {
          display: false
        }
      }
    }
  };

  constructor() {}

  ngOnInit() {
    this.loadChartData();
  }

  private loadChartData() {
    // Daily rides data (last 7 days)
    this.totalRidesChart = {
      datasets: [{
        data: [45, 52, 38, 67, 73, 58, 64],
        label: 'الرحلات اليومية',
        backgroundColor: 'rgba(54, 162, 235, 0.8)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 2,
        borderRadius: 4
      }],
      labels: ['السبت', 'الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة']
    };

    // Revenue by service type
    this.revenueChart = {
      datasets: [{
        data: [6500, 4200, 3800, 1150],
        label: 'الإيرادات',
        backgroundColor: [
          'rgba(255, 99, 132, 0.8)',
          'rgba(54, 162, 235, 0.8)',
          'rgba(255, 205, 86, 0.8)',
          'rgba(75, 192, 192, 0.8)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 205, 86, 1)',
          'rgba(75, 192, 192, 1)'
        ],
        borderWidth: 2
      }],
      labels: ['رحلات عادية', 'رحلات مميزة', 'توصيل طعام', 'أخرى']
    };

    // Driver status
    this.driverChart = {
      datasets: [{
        data: [89, 23, 8],
        label: 'حالة السائقين',
        backgroundColor: [
          'rgba(75, 192, 192, 0.8)',
          'rgba(255, 205, 86, 0.8)',
          'rgba(255, 99, 132, 0.8)'
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)',
          'rgba(255, 205, 86, 1)',
          'rgba(255, 99, 132, 1)'
        ],
        borderWidth: 2
      }],
      labels: ['نشط', 'غير متاح', 'غير متصل']
    };

    // Monthly trends (last 6 months)
    this.monthlyTrendsChart = {
      datasets: [
        {
          data: [3200, 3800, 4100, 3900, 4400, 4800],
          label: 'إجمالي الرحلات',
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 3,
          fill: true,
          tension: 0.4
        },
        {
          data: [12000, 14500, 16200, 15800, 17500, 18900],
          label: 'الإيرادات (جنيه)',
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 3,
          fill: true,
          tension: 0.4,
          yAxisID: 'y1'
        }
      ],
      labels: ['ديسمبر', 'يناير', 'فبراير', 'مارس', 'أبريل', 'مايو']
    };
  }

  // Helper methods for formatting
  formatCurrency(amount: number): string {
    return new Intl.NumberFormat('ar-EG', {
      style: 'currency',
      currency: 'EGP'
    }).format(amount);
  }

  formatNumber(num: number): string {
    return new Intl.NumberFormat('ar-EG').format(num);
  }

  // Export data functionality
  exportData(type: string) {
    console.log(`Exporting ${type} data...`);
    // Here you would implement actual export functionality
    alert(`سيتم تصدير بيانات ${type} قريباً`);
  }

  // Refresh data
  refreshData() {
    console.log('Refreshing analytics data...');
    this.loadChartData();
    // Add loading state and success message if needed
  }
}