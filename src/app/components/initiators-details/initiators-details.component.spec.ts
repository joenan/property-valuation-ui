import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InitiatorsDetailsComponent } from './initiators-details.component';

describe('InitiatorsDetailsComponent', () => {
  let component: InitiatorsDetailsComponent;
  let fixture: ComponentFixture<InitiatorsDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InitiatorsDetailsComponent]
    });
    fixture = TestBed.createComponent(InitiatorsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
