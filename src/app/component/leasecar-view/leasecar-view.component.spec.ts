import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeasecarViewComponent } from './leasecar-view.component';

describe('LeasecarViewComponent', () => {
  let component: LeasecarViewComponent;
  let fixture: ComponentFixture<LeasecarViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeasecarViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeasecarViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
