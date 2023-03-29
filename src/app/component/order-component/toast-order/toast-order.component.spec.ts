import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToastOrderComponent } from './toast-order.component';

describe('ToastOrderComponent', () => {
  let component: ToastOrderComponent;
  let fixture: ComponentFixture<ToastOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToastOrderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToastOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
