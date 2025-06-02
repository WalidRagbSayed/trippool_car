import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Trip } from '../models/trip.model';
import { Driver } from '../models/driver.model';
import { Payment } from '../models/payment.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = environment.apiUrl; // استخدام الـ API URL من environment

  constructor(private http: HttpClient) {}

  getDashboardStats(): Observable<any> {
    return this.http.get(`${this.baseUrl}/dashboard/stats`);
  }

  getTrips(): Observable<Trip[]> {
    return this.http.get<Trip[]>(`${this.baseUrl}/trips`);
  }

  getDrivers(): Observable<Driver[]> {
    return this.http.get<Driver[]>(`${this.baseUrl}/drivers`);
  }

  approveDriver(driverId: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/drivers/${driverId}/approve`, {});
  }

  rejectDriver(driverId: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/drivers/${driverId}/reject`, {});
  }

  getPayments(): Observable<Payment[]> {
    return this.http.get<Payment[]>(`${this.baseUrl}/payments`);
  }

  getAnalytics(): Observable<any> {
    return this.http.get(`${this.baseUrl}/analytics`);
  }

  // دالة تسجيل الدخول الجديدة
  login(email: string, password: string): Observable<any> {
    const body = { email, password };
    return this.http.post(`${this.baseUrl}/api/auth/login`, body).pipe(
      catchError((error) => {
        console.error('مشكلة في تسجيل الدخول:', error);
        return throwError(() => new Error('فشل تسجيل الدخول'));
      })
    );
  }
}