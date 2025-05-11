// src/app/services/api.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Trip } from '../models/trip.model';
import { Driver } from '../models/driver.model';
import { Payment } from '../models/payment.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost:3000';

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
}
