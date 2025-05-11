import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { NgChartsModule } from 'ng2-charts';
import { ChartConfiguration } from 'chart.js';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NgChartsModule, SidebarComponent,RouterOutlet],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  stats: any = {};

  userGrowthChart: ChartConfiguration['data'] = {
    datasets: [
      {
        data: [100, 200, 300, 400, 500],
        label: 'User Growth',
        borderColor: '#007bff',
        fill: false
      }
    ],
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May']
  };

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.apiService.getDashboardStats().subscribe({
      next: (data) => {
        this.stats = data;
      },
      error: (err) => {
        console.error('Error fetching stats:', err);
      }
    });
  }
}
RouterOutlet