import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TripManagementComponent } from './components/trip-management/trip-management.component';
import { DriverApprovalComponent } from './components/driver-approval/driver-approval.component';
import { PaymentManagementComponent } from './components/payment-management/payment-management.component';
import { AnalyticsReportsComponent } from './components/analytics-reports/analytics-reports.component';
import { authGuard } from './auth.guard';
import { LayoutComponent } from './components/layout/layout.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },

  {
    path: '',
    component: LayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'trips', component: TripManagementComponent },
      { path: 'drivers', component: DriverApprovalComponent },
      { path: 'payments', component: PaymentManagementComponent },
      { path: 'analytics', component: AnalyticsReportsComponent },
    ]
  },

  { path: '**', redirectTo: '' }
];
