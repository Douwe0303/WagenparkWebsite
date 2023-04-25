import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RotateArrowComponent } from './rotate-arrow.component';

describe('RotateArrowComponent', () => {
  let component: RotateArrowComponent;
  let fixture: ComponentFixture<RotateArrowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RotateArrowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RotateArrowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
