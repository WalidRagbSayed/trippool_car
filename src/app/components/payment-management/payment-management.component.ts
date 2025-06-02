// payment-management.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Payment } from '../../models/payment.model';

@Component({
  selector: 'app-payment-management',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './payment-management.component.html',
  styleUrls: ['./payment-management.component.scss']
})
export class PaymentManagementComponent implements OnInit {
  payments: Payment[] = [];
  filteredPayments: Payment[] = [];
  selectedStatus: string = '';
  selectedMethod: string = '';

  ngOnInit() {
    this.loadMockData();
    this.filteredPayments = [...this.payments];
  }

  private loadMockData() {
    // Mock payment data
    this.payments = [
      {
        id: 'PAY-001',
        tripId: 'TRP-2024-001',
        riderId: 'RDR-001',
        driverId: 'DRV-001',
        amount: 25.50,
        paymentMethod: 'Credit Card',
        status: 'Completed',
        createdAt: new Date('2024-12-01T10:30:00'),
        riderName: 'John Doe',
        driverName: 'Mike Johnson'
      },
      {
        id: 'PAY-002',
        tripId: 'TRP-2024-002',
        riderId: 'RDR-002',
        driverId: 'DRV-002',
        amount: 18.75,
        paymentMethod: 'PayPal',
        status: 'Failed',
        createdAt: new Date('2024-12-01T14:15:00'),
        riderName: 'Jane Smith',
        driverName: 'Sarah Wilson'
      },
      {
        id: 'PAY-003',
        tripId: 'TRP-2024-003',
        riderId: 'RDR-003',
        driverId: 'DRV-003',
        amount: 32.25,
        paymentMethod: 'Debit Card',
        status: 'Pending',
        createdAt: new Date('2024-12-02T09:20:00'),
        riderName: 'Bob Brown',
        driverName: 'Tom Davis'
      },
      {
        id: 'PAY-004',
        tripId: 'TRP-2024-004',
        riderId: 'RDR-004',
        driverId: 'DRV-004',
        amount: 15.00,
        paymentMethod: 'Cash',
        status: 'Completed',
        createdAt: new Date('2024-12-02T16:45:00'),
        riderName: 'Alice Green',
        driverName: 'Chris Lee'
      },
      {
        id: 'PAY-005',
        tripId: 'TRP-2024-005',
        riderId: 'RDR-005',
        driverId: 'DRV-005',
        amount: 42.80,
        paymentMethod: 'Credit Card',
        status: 'Refunded',
        createdAt: new Date('2024-12-03T11:10:00'),
        riderName: 'David Miller',
        driverName: 'Emma Taylor'
      },
      {
        id: 'PAY-006',
        tripId: 'TRP-2024-006',
        riderId: 'RDR-006',
        driverId: 'DRV-006',
        amount: 29.90,
        paymentMethod: 'Credit Card',
        status: 'Completed',
        createdAt: new Date('2024-12-03T13:25:00'),
        riderName: 'Lisa Wang',
        driverName: 'Alex Thompson'
      },
      {
        id: 'PAY-007',
        tripId: 'TRP-2024-007',
        riderId: 'RDR-007',
        driverId: 'DRV-007',
        amount: 12.30,
        paymentMethod: 'PayPal',
        status: 'Pending',
        createdAt: new Date('2024-12-04T08:15:00'),
        riderName: 'Michael Chen',
        driverName: 'Rachel Adams'
      },
      {
        id: 'PAY-008',
        tripId: 'TRP-2024-008',
        riderId: 'RDR-008',
        driverId: 'DRV-008',
        amount: 38.75,
        paymentMethod: 'Debit Card',
        status: 'Failed',
        createdAt: new Date('2024-12-04T15:40:00'),
        riderName: 'Sophie Martinez',
        driverName: 'James Wilson'
      }
    ];
  }

  filterPayments() {
    this.filteredPayments = this.payments.filter(payment => {
      const statusMatch = !this.selectedStatus || payment.status === this.selectedStatus;
      const methodMatch = !this.selectedMethod || payment.paymentMethod === this.selectedMethod;
      return statusMatch && methodMatch;
    });
  }

  getStatusClass(status: string): string {
    return `status-${status.toLowerCase()}`;
  }

  getTotalPayments(): number {
    return this.payments.length;
  }

  getTotalAmount(): number {
    return this.payments
      .filter(p => p.status === 'Completed')
      .reduce((sum, payment) => sum + payment.amount, 0);
  }

  getCompletedPayments(): number {
    return this.payments.filter(p => p.status === 'Completed').length;
  }

  getPendingPayments(): number {
    return this.payments.filter(p => p.status === 'Pending').length;
  }

  getFailedPayments(): number {
    return this.payments.filter(p => p.status === 'Failed').length;
  }

  viewDetails(payment: Payment) {
    console.log('Viewing payment details:', payment);
    alert(`Payment Details:\nID: ${payment.id}\nAmount: $${payment.amount}\nStatus: ${payment.status}`);
  }

  downloadReceipt(payment: Payment) {
    console.log('Downloading receipt for payment:', payment.id);
    alert(`Downloading receipt for payment: ${payment.id}`);
  }

  retryPayment(payment: Payment) {
    if (payment.status === 'Failed') {
      payment.status = 'Pending';
      console.log(`Retrying payment: ${payment.id}`);
      alert(`Payment ${payment.id} has been queued for retry.`);
    }
  }

  refundPayment(payment: Payment) {
    if (payment.status === 'Completed') {
      payment.status = 'Refunded';
      console.log(`Refunding payment: ${payment.id}`);
      alert(`Payment ${payment.id} has been refunded.`);
    }
  }
}