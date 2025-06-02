import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Driver {
  id: number;
  name: string;
  email: string;
  phone: string;
  vehicleType: string;
  vehicleModel: string;
  plateNumber: string;
  licenseNumber: string;
  licenseExpiry: string;
  registrationDate: string;
  status: 'pending' | 'approved' | 'rejected';
  profileImage: string;
  rating?: number;
  documentsVerified: boolean;
}

@Component({
  selector: 'app-driver-approval',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './driver-approval.component.html',
  styleUrls: ['./driver-approval.component.scss']
})
export class DriverApprovalComponent implements OnInit {
  drivers: Driver[] = [];
  filteredDrivers: Driver[] = [];
  selectedStatus: string = 'all';
  searchTerm: string = '';
  loading: boolean = false;

  constructor() {}

  ngOnInit() {
    this.loadMockData();
  }

  loadMockData() {
    this.loading = true;
    
    // Simulate API call delay
    setTimeout(() => {
      this.drivers = [
        {
          id: 1,
          name: 'Ahmed Mohamed Ali',
          email: 'ahmed.ali@email.com',
          phone: '+20 123 456 7890',
          vehicleType: 'Sedan',
          vehicleModel: 'Toyota Corolla 2020',
          plateNumber: 'ABC 1234',
          licenseNumber: 'DL12345678',
          licenseExpiry: '2026-12-15',
          registrationDate: '2024-01-15',
          status: 'pending',
          profileImage: 'https://i.pravatar.cc/150?img=1',
          rating: 4.5,
          documentsVerified: true
        },
        {
          id: 2,
          name: 'Sara Hassan Ibrahim',
          email: 'sara.hassan@email.com',
          phone: '+20 101 234 5678',
          vehicleType: 'SUV',
          vehicleModel: 'Honda CR-V 2021',
          plateNumber: 'XYZ 5678',
          licenseNumber: 'DL87654321',
          licenseExpiry: '2025-08-20',
          registrationDate: '2024-02-01',
          status: 'pending',
          profileImage: 'https://i.pravatar.cc/150?img=2',
          rating: 4.8,
          documentsVerified: true
        },
        {
          id: 3,
          name: 'Omar Khaled Mahmoud',
          email: 'omar.khaled@email.com',
          phone: '+20 112 345 6789',
          vehicleType: 'Hatchback',
          vehicleModel: 'Nissan Sunny 2019',
          plateNumber: 'DEF 9012',
          licenseNumber: 'DL11223344',
          licenseExpiry: '2027-03-10',
          registrationDate: '2024-02-10',
          status: 'pending',
          profileImage: 'https://i.pravatar.cc/150?img=3',
          rating: 4.2,
          documentsVerified: false
        },
        {
          id: 4,
          name: 'Fatima Nour El-Din',
          email: 'fatima.nour@email.com',
          phone: '+20 128 765 4321',
          vehicleType: 'Sedan',
          vehicleModel: 'Hyundai Elantra 2022',
          plateNumber: 'GHI 3456',
          licenseNumber: 'DL55667788',
          licenseExpiry: '2026-11-05',
          registrationDate: '2024-02-12',
          status: 'pending',
          profileImage: 'https://i.pravatar.cc/150?img=4',
          rating: 4.7,
          documentsVerified: true
        },
        {
          id: 5,
          name: 'Youssef Ahmed Farouk',
          email: 'youssef.farouk@email.com',
          phone: '+20 155 987 6543',
          vehicleType: 'Compact',
          vehicleModel: 'Kia Rio 2021',
          plateNumber: 'JKL 7890',
          licenseNumber: 'DL99887766',
          licenseExpiry: '2025-09-18',
          registrationDate: '2024-02-14',
          status: 'pending',
          profileImage: 'https://i.pravatar.cc/150?img=5',
          rating: 4.1,
          documentsVerified: true
        }
      ];
      
      this.filteredDrivers = [...this.drivers];
      this.loading = false;
    }, 1000);
  }

  approveDriver(driverId: number) {
    const driver = this.drivers.find(d => d.id === driverId);
    if (driver) {
      driver.status = 'approved';
      this.showSuccessMessage(`${driver.name} has been approved successfully!`);
      this.filterDrivers();
    }
  }

  rejectDriver(driverId: number) {
    const driver = this.drivers.find(d => d.id === driverId);
    if (driver) {
      driver.status = 'rejected';
      this.showErrorMessage(`${driver.name} has been rejected.`);
      this.filterDrivers();
    }
  }

  filterDrivers() {
    this.filteredDrivers = this.drivers.filter(driver => {
      const matchesStatus = this.selectedStatus === 'all' || driver.status === this.selectedStatus;
      const matchesSearch = driver.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                           driver.email.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                           driver.plateNumber.toLowerCase().includes(this.searchTerm.toLowerCase());
      return matchesStatus && matchesSearch;
    });
  }

  onStatusFilterChange(event: any) {
    this.selectedStatus = event.target.value;
    this.filterDrivers();
  }

  onSearchChange(event: any) {
    this.searchTerm = event.target.value;
    this.filterDrivers();
  }

  getStatusBadgeClass(status: string): string {
    switch (status) {
      case 'approved': return 'badge bg-success';
      case 'rejected': return 'badge bg-danger';
      case 'pending': return 'badge bg-warning text-dark';
      default: return 'badge bg-secondary';
    }
  }

  getDocumentStatusClass(verified: boolean): string {
    return verified ? 'text-success' : 'text-danger';
  }

  getDocumentStatusIcon(verified: boolean): string {
    return verified ? '✓' : '✗';
  }

  showSuccessMessage(message: string) {
    // In a real app, you might use a toast notification service
    alert(message);
  }

  showErrorMessage(message: string) {
    // In a real app, you might use a toast notification service
    alert(message);
  }

  getPendingDriversCount(): number {
    return this.drivers.filter(d => d.status === 'pending').length;
  }

  getApprovedDriversCount(): number {
    return this.drivers.filter(d => d.status === 'approved').length;
  }

  getRejectedDriversCount(): number {
    return this.drivers.filter(d => d.status === 'rejected').length;
  }
}