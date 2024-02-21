import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BorrowersDetailsComponent } from './borrowers-details.component';

describe('BorrowersDetailsComponent', () => {
  let component: BorrowersDetailsComponent;
  let fixture: ComponentFixture<BorrowersDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BorrowersDetailsComponent]
    });
    fixture = TestBed.createComponent(BorrowersDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
