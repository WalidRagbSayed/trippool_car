import { Component, HostListener, Output, EventEmitter, Inject, PLATFORM_ID, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  sidebarCollapsed: boolean = false; // افتراضيًا مفتوح على الشاشات الكبيرة
  isMobile: boolean = false;

  @Output() sidebarToggled = new EventEmitter<boolean>();

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.checkScreenSize();
      console.log('Initial isMobile:', this.isMobile, 'sidebarCollapsed:', this.sidebarCollapsed); // للتصحيح
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    if (isPlatformBrowser(this.platformId)) {
      this.checkScreenSize();
    }
  }

  private checkScreenSize() {
    const previousIsMobile: boolean = this.isMobile;
    this.isMobile = window.innerWidth < 768;

    // إذا كان على شاشة صغيرة، الـ sidebar يتقلّص افتراضيًا
    if (this.isMobile && !previousIsMobile) {
      this.sidebarCollapsed = true;
    } else if (!this.isMobile && previousIsMobile) {
      // إذا انتقلنا من شاشة صغيرة لكبيرة، الـ sidebar يتوسع
      this.sidebarCollapsed = window.innerWidth > 1200 ? false : this.sidebarCollapsed;
    } else if (!this.isMobile && window.innerWidth > 1200) {
      // تأكد إن الـ sidebar مفتوح على الشاشات الكبيرة
      this.sidebarCollapsed = false;
    }

    this.sidebarToggled.emit(this.sidebarCollapsed);
    console.log('isMobile:', this.isMobile, 'sidebarCollapsed:', this.sidebarCollapsed); // للتصحيح
  }

  toggleSidebar(): void {
    this.sidebarCollapsed = !this.sidebarCollapsed;
    this.sidebarToggled.emit(this.sidebarCollapsed);
    console.log('Toggled sidebar, collapsed:', this.sidebarCollapsed); // للتصحيح
  }

  onMobileNavClick(): void {
    if (this.isMobile) {
      this.sidebarCollapsed = true;
      this.sidebarToggled.emit(this.sidebarCollapsed);
    }
  }
}