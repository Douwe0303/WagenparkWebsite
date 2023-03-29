import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractDataComponent } from './contract-data.component';

describe('ContractDataComponent', () => {
  let component: ContractDataComponent;
  let fixture: ComponentFixture<ContractDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContractDataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContractDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
