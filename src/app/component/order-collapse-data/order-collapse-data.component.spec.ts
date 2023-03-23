import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderCollapseDataComponent } from './order-collapse-data.component';

describe('OrderCollapseDataComponent', () => {
  let component: OrderCollapseDataComponent;
  let fixture: ComponentFixture<OrderCollapseDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderCollapseDataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderCollapseDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
