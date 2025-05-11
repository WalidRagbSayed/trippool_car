import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { HeroComponent } from '../hero/hero.component';
import { FeaturesComponent } from '../features/features.component';
import { DownloadComponent } from '../download/download.component';
import { LoginComponent } from '../login/login.component';
import { FeedbackComponent } from '../feedback/feedback.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    HeroComponent,
    
    FeaturesComponent,
    DownloadComponent,
    FeedbackComponent,
    FooterComponent
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {}