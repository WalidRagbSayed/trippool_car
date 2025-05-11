import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { Trip } from '../../models/trip.model';

@Component({
  selector: 'app-trip-management',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './trip-management.component.html',
  styleUrls: ['./trip-management.component.scss']
})
export class TripManagementComponent implements OnInit {
  trips: Trip[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.apiService.getTrips().subscribe({
      next: (data) => {
        this.trips = data;
      },
      error: (err) => {
        console.error('Error fetching trips:', err);
      }
    });
  }
}