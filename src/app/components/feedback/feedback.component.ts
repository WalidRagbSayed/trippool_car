import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface Review {
  id: number;
  name: string;
  email?: string;
  phone?: string;
  message: string;
  rating: number;
  avatarUrl?: string;
  date: Date;
}

@Component({
  selector: 'app-feedback',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
})
export class FeedbackComponent implements OnInit {
  feedbackForm: FormGroup;
  reviews: Review[] = [];
  submitted = false;
  currentPage = 1;
  pageSize = 3;
  totalReviews = 0;
  loading = false;
  showForm: boolean = false;
  maxMessageLength = 500;

  constructor(private fb: FormBuilder) {
    this.feedbackForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.pattern(/^\+?\d{7,15}$/)]],
      message: ['', [Validators.required, Validators.maxLength(this.maxMessageLength)]],
      rating: [0, [Validators.required, Validators.min(1)]]
    });
  }

  ngOnInit() {
    this.loadReviews();
  }

  loadReviews() {
    this.loading = true;
    setTimeout(() => {
      const allReviews: Review[] = [
        {
          id: 1,
          name: 'Ahmed',
          email: 'ahmed@example.com',
          phone: '+201234567890',
          message: 'Excellent and fast service, thank you!',
          rating: 5,
          avatarUrl: 'https://i.pravatar.cc/60?img=1',
          date: new Date(2025, 4, 1)
        },
        {
          id: 2,
          name: 'Sarah',
          email: 'sarah@example.com',
          message: 'The experience was wonderful, I recommend everyone.',
          rating: 4,
          avatarUrl: 'https://i.pravatar.cc/60?img=2',
          date: new Date(2025, 3, 28)
        },
        {
          id: 3,
          name: 'Walid',
          message: 'Great experience, highly recommended.',
          rating: 5,
          avatarUrl: 'https://i.pravatar.cc/60?img=3',
          date: new Date(2025, 3, 28)
        },
        {
          id: 4,
          name: 'Lara',
          message: 'Could improve delivery time but overall good.',
          rating: 3,
          avatarUrl: 'https://i.pravatar.cc/60?img=4',
          date: new Date(2025, 2, 15)
        },
        {
          id: 5,
          name: 'Omar',
          message: 'Customer support was very helpful.',
          rating: 4,
          avatarUrl: 'https://i.pravatar.cc/60?img=5',
          date: new Date(2025, 1, 10)
        }
      ];

      this.totalReviews = allReviews.length;
      const start = (this.currentPage - 1) * this.pageSize;
      const end = start + this.pageSize;
      this.reviews = this.reviews.concat(allReviews.slice(start, end));
      this.loading = false;
    }, 800);
  }

  loadMore() {
    if (this.reviews.length < this.totalReviews) {
      this.currentPage++;
      this.loadReviews();
    }
  }

  setRating(rating: number) {
    this.feedbackForm.get('rating')?.setValue(rating);
  }

  toggleForm() {
    this.showForm = !this.showForm;
    if (!this.showForm) {
      this.feedbackForm.reset({ rating: 0 });
      this.submitted = false;
    }
  }

  get messageLength() {
    return this.feedbackForm.get('message')?.value?.length || 0;
  }

  onSubmit() {
    if (this.feedbackForm.valid) {
      const formValue = this.feedbackForm.value;

      const newReview: Review = {
        id: Date.now(),
        ...formValue,
        date: new Date(),
        avatarUrl: `https://i.pravatar.cc/60?u=${formValue.email || formValue.name}`
      };
      this.reviews.unshift(newReview);

      this.submitted = true;
      this.showForm = false;
      this.feedbackForm.reset({ rating: 0 });
    } else {
      this.feedbackForm.markAllAsTouched();
    }
  }
}
