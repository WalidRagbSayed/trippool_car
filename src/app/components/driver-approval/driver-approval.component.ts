import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { Driver } from '../../models/driver.model';

@Component({
  selector: 'app-driver-approval',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './driver-approval.component.html',
  styleUrls: ['./driver-approval.component.scss']
})
export class DriverApprovalComponent implements OnInit {
  drivers: Driver[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.apiService.getDrivers().subscribe({
      next: (data) => {
        this.drivers = data;
      },
      error: (err) => {
        console.error('Error fetching drivers:', err);
      }
    });
  }

  approveDriver(driverId: number) {
    this.apiService.approveDriver(driverId).subscribe({
      next: () => {
        this.drivers = this.drivers.filter(driver => driver.id !== driverId);
        alert('Driver approved!');
      },
      error: (err) => {
        console.error('Error approving driver:', err);
        alert('Failed to approve driver.');
      }
    });
  }

  rejectDriver(driverId: number) {
    this.apiService.rejectDriver(driverId).subscribe({
      next: () => {
        this.drivers = this.drivers.filter(driver => driver.id !== driverId);
        alert('Driver rejected!');
      },
      error: (err) => {
        console.error('Error rejecting driver:', err);
        alert('Failed to reject driver.');
      }
    });
  }
}