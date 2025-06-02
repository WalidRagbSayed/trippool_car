// payment-management.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { PaymentManagementComponent } from './payment-management.component';
import { Payment } from '../../models/payment.model';

describe('PaymentManagementComponent', () => {
  let component: PaymentManagementComponent;
  let fixture: ComponentFixture<PaymentManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymentManagementComponent, FormsModule]
    }).compileComponents();
    
    fixture = TestBed.createComponent(PaymentManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load mock data on init', () => {
    expect(component.payments.length).toBeGreaterThan(0);
    expect(component.filteredPayments.length).toBe(component.payments.length);
  });

  it('should filter payments by status', () => {
    component.selectedStatus = 'Completed';
    component.filterPayments();
    
    const completedPayments = component.filteredPayments.filter(p => p.status === 'Completed');
    expect(component.filteredPayments.length).toBe(completedPayments.length);
  });

  it('should filter payments by payment method', () => {
    component.selectedMethod = 'Credit Card';
    component.filterPayments();
    
    const creditCardPayments = component.filteredPayments.filter(p => p.paymentMethod === 'Credit Card');
    expect(component.filteredPayments.length).toBe(creditCardPayments.length);
  });

  it('should filter payments by both status and method', () => {
    component.selectedStatus = 'Completed';
    component.selectedMethod = 'Credit Card';
    component.filterPayments();
    
    const filteredPayments = component.filteredPayments.filter(
      p => p.status === 'Completed' && p.paymentMethod === 'Credit Card'
    );
    expect(component.filteredPayments.length).toBe(filteredPayments.length);
  });

  it('should return correct status class', () => {
    expect(component.getStatusClass('Completed')).toBe('status-completed');
    expect(component.getStatusClass('Failed')).toBe('status-failed');
    expect(component.getStatusClass('Pending')).toBe('status-pending');
    expect(component.getStatusClass('Refunded')).toBe('status-refunded');
  });

  it('should calculate total payments correctly', () => {
    const totalPayments = component.getTotalPayments();
    expect(totalPayments).toBe(component.payments.length);
  });

  it('should calculate total amount for completed payments', () => {
    const completedPayments = component.payments.filter(p => p.status === 'Completed');
    const expectedTotal = completedPayments.reduce((sum, payment) => sum + payment.amount, 0);
    expect(component.getTotalAmount()).toBe(expectedTotal);
  });

  it('should calculate completed payments count', () => {
    const completedCount = component.payments.filter(p => p.status === 'Completed').length;
    expect(component.getCompletedPayments()).toBe(completedCount);
  });

  it('should calculate pending payments count', () => {
    const pendingCount = component.payments.filter(p => p.status === 'Pending').length;
    expect(component.getPendingPayments()).toBe(pendingCount);
  });

  it('should calculate failed payments count', () => {
    const failedCount = component.payments.filter(p => p.status === 'Failed').length;
    expect(component.getFailedPayments()).toBe(failedCount);
  });

  it('should handle view details action', () => {
    spyOn(console, 'log');
    spyOn(window, 'alert');
    
    const testPayment: Payment = component.payments[0];
    component.viewDetails(testPayment);
    
    expect(console.log).toHaveBeenCalledWith('Viewing payment details:', testPayment);
    expect(window.alert).toHaveBeenCalled();
  });

  it('should handle download receipt action', () => {
    spyOn(console, 'log');
    spyOn(window, 'alert');
    
    const testPayment: Payment = component.payments[0];
    component.downloadReceipt(testPayment);
    
    expect(console.log).toHaveBeenCalledWith('Downloading receipt for payment:', testPayment.id);
    expect(window.alert).toHaveBeenCalled();
  });

  it('should retry failed payments', () => {
    spyOn(console, 'log');
    spyOn(window, 'alert');
    
    const failedPayment: Payment = {
      id: 'TEST-001',
      tripId: 'TRP-TEST-001',
      riderId: 'RDR-TEST-001',
      driverId: 'DRV-TEST-001',
      amount: 20.00,
      paymentMethod: 'Credit Card',
      status: 'Failed',
      createdAt: new Date(),
      riderName: 'Test Rider',
      driverName: 'Test Driver'
    };
    
    component.retryPayment(failedPayment);
    
    expect(failedPayment.status).toBe('Pending');
    expect(console.log).toHaveBeenCalledWith('Retrying payment:', failedPayment.id);
    expect(window.alert).toHaveBeenCalled();
  });

  it('should not retry non-failed payments', () => {
    spyOn(console, 'log');
    spyOn(window, 'alert');
    
    const completedPayment: Payment = {
      id: 'TEST-002',
      tripId: 'TRP-TEST-002',
      riderId: 'RDR-TEST-002',
      driverId: 'DRV-TEST-002',
      amount: 25.00,
      paymentMethod: 'Credit Card',
      status: 'Completed',
      createdAt: new Date(),
      riderName: 'Test Rider',
      driverName: 'Test Driver'
    };
    
    const originalStatus = completedPayment.status;
    component.retryPayment(completedPayment);
    
    expect(completedPayment.status).toBe(originalStatus);
    expect(console.log).not.toHaveBeenCalled();
    expect(window.alert).not.toHaveBeenCalled();
  });

  it('should refund completed payments', () => {
    spyOn(console, 'log');
    spyOn(window, 'alert');
    
    const completedPayment: Payment = {
      id: 'TEST-003',
      tripId: 'TRP-TEST-003',
      riderId: 'RDR-TEST-003',
      driverId: 'DRV-TEST-003',
      amount: 30.00,
      paymentMethod: 'Credit Card',
      status: 'Completed',
      createdAt: new Date(),
      riderName: 'Test Rider',
      driverName: 'Test Driver'
    };
    
    component.refundPayment(completedPayment);
    
    expect(completedPayment.status).toBe('Refunded');
    expect(console.log).toHaveBeenCalledWith('Refunding payment:', completedPayment.id);
    expect(window.alert).toHaveBeenCalled();
  });

  it('should not refund non-completed payments', () => {
    spyOn(console, 'log');
    spyOn(window, 'alert');
    
    const pendingPayment: Payment = {
      id: 'TEST-004',
      tripId: 'TRP-TEST-004',
      riderId: 'RDR-TEST-004',
      driverId: 'DRV-TEST-004',
      amount: 15.00,
      paymentMethod: 'PayPal',
      status: 'Pending',
      createdAt: new Date(),
      riderName: 'Test Rider',
      driverName: 'Test Driver'
    };
    
    const originalStatus = pendingPayment.status;
    component.refundPayment(pendingPayment);
    
    expect(pendingPayment.status).toBe(originalStatus);
    expect(console.log).not.toHaveBeenCalled();
    expect(window.alert).not.toHaveBeenCalled();
  });

  it('should clear filters and show all payments', () => {
    // First apply some filters
    component.selectedStatus = 'Completed';
    component.selectedMethod = 'Credit Card';
    component.filterPayments();
    
    expect(component.filteredPayments.length).toBeLessThan(component.payments.length);
    
    // Clear filters
    component.selectedStatus = '';
    component.selectedMethod = '';
    component.filterPayments();
    
    expect(component.filteredPayments.length).toBe(component.payments.length);
  });

  it('should show empty state when no payments match filters', () => {
    component.selectedStatus = 'NonExistentStatus' as any;
    component.filterPayments();
    
    expect(component.filteredPayments.length).toBe(0);
  });
});