import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextNoWrapComponent } from './text-no-wrap.component';

describe('TextNoWrapComponent', () => {
  let component: TextNoWrapComponent;
  let fixture: ComponentFixture<TextNoWrapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TextNoWrapComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TextNoWrapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
