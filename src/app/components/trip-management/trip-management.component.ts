import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface Trip {
  id: string;
  riderId: string;
  driverId: string;
  startLocation: string;
  endLocation: string;
  status: 'pending' | 'in-progress' | 'completed' | 'cancelled';
  fare: number;
  createdAt: Date;
  distance?: number;
  duration?: number;
}

@Component({
  selector: 'app-trip-management',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './trip-management.component.html',
  styleUrls: ['./trip-management.component.scss']
})
export class TripManagementComponent implements OnInit {
  trips: Trip[] = [];
  filteredTrips: Trip[] = [];
  selectedStatus: string = 'all';

  constructor() {}

  ngOnInit() {
    // Mock data instead of API call
    this.loadMockTrips();
    this.filteredTrips = this.trips;
  }

  private loadMockTrips() {
    this.trips = [
      {
        id: 'TRP001',
        riderId: 'RDR001',
        driverId: 'DRV001',
        startLocation: 'Downtown Plaza',
        endLocation: 'Airport Terminal 1',
        status: 'completed',
        fare: 25.50,
        createdAt: new Date('2024-01-15T10:30:00'),
        distance: 12.5,
        duration: 35
      },
      {
        id: 'TRP002',
        riderId: 'RDR002',
        driverId: 'DRV002',
        startLocation: 'City Mall',
        endLocation: 'University Campus',
        status: 'in-progress',
        fare: 15.75,
        createdAt: new Date('2024-01-15T11:15:00'),
        distance: 8.2,
        duration: 20
      },
      {
        id: 'TRP003',
        riderId: 'RDR003',
        driverId: 'DRV001',
        startLocation: 'Train Station',
        endLocation: 'Business District',
        status: 'pending',
        fare: 18.25,
        createdAt: new Date('2024-01-15T12:00:00'),
        distance: 9.8,
        duration: 25
      },
      {
        id: 'TRP004',
        riderId: 'RDR004',
        driverId: 'DRV003',
        startLocation: 'Hotel Grand',
        endLocation: 'Shopping Center',
        status: 'cancelled',
        fare: 12.00,
        createdAt: new Date('2024-01-15T09:45:00'),
        distance: 5.5,
        duration: 15
      },
      {
        id: 'TRP005',
        riderId: 'RDR005',
        driverId: 'DRV002',
        startLocation: 'Residential Area',
        endLocation: 'Medical Center',
        status: 'completed',
        fare: 22.80,
        createdAt: new Date('2024-01-15T08:20:00'),
        distance: 11.2,
        duration: 30
      }
    ];
  }

  filterByStatus(status: string) {
    this.selectedStatus = status;
    if (status === 'all') {
      this.filteredTrips = this.trips;
    } else {
      this.filteredTrips = this.trips.filter(trip => trip.status === status);
    }
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'completed': return 'badge-success';
      case 'in-progress': return 'badge-primary';
      case 'pending': return 'badge-warning';
      case 'cancelled': return 'badge-danger';
      default: return 'badge-secondary';
    }
  }

  formatDate(date: Date): string {
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
  }
}