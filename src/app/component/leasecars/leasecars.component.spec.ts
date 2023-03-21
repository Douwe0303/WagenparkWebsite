import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeasecarsComponent } from './leasecars.component';

describe('LeasecarsComponent', () => {
  let component: LeasecarsComponent;
  let fixture: ComponentFixture<LeasecarsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeasecarsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeasecarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
