import { Component, OnInit } from '@angular/core';
import { NgChartsModule } from 'ng2-charts';
import { ChartConfiguration } from 'chart.js';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-analytics-reports',
  standalone: true,
  imports: [NgChartsModule],
  templateUrl: './analytics-reports.component.html',
  styleUrls: ['./analytics-reports.component.scss']
})
export class AnalyticsReportsComponent implements OnInit {
  totalRidesChart: ChartConfiguration['data'] = {
    datasets: [{ data: [], label: 'Total Rides', backgroundColor: '#007bff' }],
    labels: []
  };

  revenueChart: ChartConfiguration['data'] = {
    datasets: [{ data: [], label: 'Revenue', backgroundColor: ['#007bff', '#28a745', '#dc3545'] }],
    labels: []
  };

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.apiService.getAnalytics().subscribe({
      next: (data) => {
        this.totalRidesChart = {
          datasets: [{ data: data.totalRides.data, label: 'Total Rides', backgroundColor: '#007bff' }],
          labels: data.totalRides.labels
        };
        this.revenueChart = {
          datasets: [{ data: data.revenue.data, label: 'Revenue', backgroundColor: ['#007bff', '#28a745', '#dc3545'] }],
          labels: data.revenue.labels
        };
      },
      error: (err) => {
        console.error('Error fetching analytics:', err);
      }
    });
  }
}