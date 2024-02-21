import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PvcValidationRequestsComponent } from './pvc-validation-requests.component';

describe('PvcValidationRequestsComponent', () => {
  let component: PvcValidationRequestsComponent;
  let fixture: ComponentFixture<PvcValidationRequestsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PvcValidationRequestsComponent]
    });
    fixture = TestBed.createComponent(PvcValidationRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
