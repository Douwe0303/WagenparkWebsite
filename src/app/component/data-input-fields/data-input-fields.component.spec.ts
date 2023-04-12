import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataInputFieldsComponent } from './data-input-fields.component';

describe('DataInputFieldsComponent', () => {
  let component: DataInputFieldsComponent;
  let fixture: ComponentFixture<DataInputFieldsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataInputFieldsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DataInputFieldsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
