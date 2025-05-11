import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  // Copyright text
  copyrightText: string = '© 2025 TripPool. All rights reserved';
  
  // Social media links
  socialLinks: { platform: string, url: string, icon: string }[] = [
    { platform: 'Facebook', url: 'https://facebook.com', icon: 'bi-facebook' },
    { platform: 'Twitter', url: 'https://twitter.com', icon: 'bi-twitter' },
    { platform: 'Instagram', url: 'https://instagram.com', icon: 'bi-instagram' },
    { platform: 'LinkedIn', url: 'https://linkedin.com', icon: 'bi-linkedin' }
  ];
  
  // Current year for dynamic copyright
  currentYear: number = new Date().getFullYear();
  
  constructor() {
    // Update copyright year dynamically
    this.copyrightText = `© ${this.currentYear} TripPool. All rights reserved`;
  }
}