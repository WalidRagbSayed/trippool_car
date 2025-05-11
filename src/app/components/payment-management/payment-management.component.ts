import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { Payment } from '../../models/payment.model';

@Component({
  selector: 'app-payment-management',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './payment-management.component.html',
  styleUrls: ['./payment-management.component.scss']
})
export class PaymentManagementComponent implements OnInit {
  payments: Payment[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.apiService.getPayments().subscribe({
      next: (data) => {
        this.payments = data;
      },
      error: (err) => {
        console.error('Error fetching payments:', err);
      }
    });
  }
}