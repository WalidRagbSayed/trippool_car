// services/payment.service.ts (Optional - for future API integration)
import { Injectable } from '@angular/core';
import { Observable, of, delay, throwError } from 'rxjs';
import { Payment } from '../models/payment.model';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private mockPayments: Payment[] = [
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

  constructor() { }

  /**
   * Get all payments
   * @returns Observable<Payment[]>
   */
  getPayments(): Observable<Payment[]> {
    // Simulate API delay
    return of([...this.mockPayments]).pipe(delay(500));
  }

  /**
   * Get payment by ID
   * @param id Payment ID
   * @returns Observable<Payment>
   */
  getPaymentById(id: string): Observable<Payment> {
    const payment = this.mockPayments.find(p => p.id === id);
    if (payment) {
      return of({ ...payment }).pipe(delay(300));
    } else {
      return throwError(() => new Error(`Payment with ID ${id} not found`));
    }
  }

  /**
   * Get payments by status
   * @param status Payment status
   * @returns Observable<Payment[]>
   */
  getPaymentsByStatus(status: Payment['status']): Observable<Payment[]> {
    const filteredPayments = this.mockPayments.filter(p => p.status === status);
    return of([...filteredPayments]).pipe(delay(400));
  }

  /**
   * Get payments by payment method
   * @param method Payment method
   * @returns Observable<Payment[]>
   */
  getPaymentsByMethod(method: string): Observable<Payment[]> {
    const filteredPayments = this.mockPayments.filter(p => p.paymentMethod === method);
    return of([...filteredPayments]).pipe(delay(400));
  }

  /**
   * Get payments by rider ID
   * @param riderId Rider ID
   * @returns Observable<Payment[]>
   */
  getPaymentsByRiderId(riderId: string): Observable<Payment[]> {
    const filteredPayments = this.mockPayments.filter(p => p.riderId === riderId);
    return of([...filteredPayments]).pipe(delay(400));
  }

  /**
   * Get payments by driver ID
   * @param driverId Driver ID
   * @returns Observable<Payment[]>
   */
  getPaymentsByDriverId(driverId: string): Observable<Payment[]> {
    const filteredPayments = this.mockPayments.filter(p => p.driverId === driverId);
    return of([...filteredPayments]).pipe(delay(400));
  }

  /**
   * Update payment status
   * @param id Payment ID
   * @param status New status
   * @returns Observable<Payment>
   */
  updatePaymentStatus(id: string, status: Payment['status']): Observable<Payment> {
    const payment = this.mockPayments.find(p => p.id === id);
    if (payment) {
      payment.status = status;
      return of({ ...payment }).pipe(delay(600));
    } else {
      return throwError(() => new Error(`Payment with ID ${id} not found`));
    }
  }

  /**
   * Retry failed payment
   * @param id Payment ID
   * @returns Observable<Payment>
   */
  retryPayment(id: string): Observable<Payment> {
    const payment = this.mockPayments.find(p => p.id === id);
    if (payment && payment.status === 'Failed') {
      payment.status = 'Pending';
      return of({ ...payment }).pipe(delay(800));
    } else {
      return throwError(() => new Error(`Cannot retry payment ${id}`));
    }
  }

  /**
   * Refund completed payment
   * @param id Payment ID
   * @returns Observable<Payment>
   */
  refundPayment(id: string): Observable<Payment> {
    const payment = this.mockPayments.find(p => p.id === id);
    if (payment && payment.status === 'Completed') {
      payment.status = 'Refunded';
      return of({ ...payment }).pipe(delay(1000));
    } else {
      return throwError(() => new Error(`Cannot refund payment ${id}`));
    }
  }

  /**
   * Get payment statistics
   * @returns Observable<PaymentStats>
   */
  

}