import { Component, inject, OnInit, OnDestroy, ViewChild, ElementRef, Inject, PLATFORM_ID } from '@angular/core';
import { ViewportScroller, isPlatformBrowser } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgClass } from '@angular/common';
import { fromEvent, Subscription } from 'rxjs';
import { throttleTime } from 'rxjs/operators';

declare const bootstrap: any; // للتعامل مع Bootstrap Collapse JS

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, NgClass],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  isScrolled = false;
  private scrollSubscription?: Subscription;
  private viewportScroller = inject(ViewportScroller);
  @ViewChild('navbarCollapse') navbarCollapse!: ElementRef<HTMLDivElement>;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.scrollSubscription = fromEvent(window, 'scroll')
        .pipe(throttleTime(100))
        .subscribe(() => {
          this.isScrolled = window.scrollY > 50;
        });
    }
  }

  ngOnDestroy(): void {
    if (this.scrollSubscription) {
      this.scrollSubscription.unsubscribe();
    }
  }

  scrollTo(section: string): void {
    this.viewportScroller.scrollToAnchor(section);
    this.closeNavbar();
  }

  closeNavbar(): void {
    if (this.navbarCollapse) {
      const collapseElement = this.navbarCollapse.nativeElement;
      if (collapseElement.classList.contains('show')) {
        const bsCollapse = bootstrap.Collapse.getInstance(collapseElement);
        if (bsCollapse) {
          bsCollapse.hide();
        }
      }
    }
  }
}
