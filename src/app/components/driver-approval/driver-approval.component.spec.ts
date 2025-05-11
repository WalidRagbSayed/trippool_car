import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverApprovalComponent } from './driver-approval.component';

describe('DriverApprovalComponent', () => {
  let component: DriverApprovalComponent;
  let fixture: ComponentFixture<DriverApprovalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DriverApprovalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DriverApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
