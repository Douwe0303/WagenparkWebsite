import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeasecarFormComponent } from './leasecar-form.component';

describe('LeasecarFormComponent', () => {
  let component: LeasecarFormComponent;
  let fixture: ComponentFixture<LeasecarFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeasecarFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeasecarFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
