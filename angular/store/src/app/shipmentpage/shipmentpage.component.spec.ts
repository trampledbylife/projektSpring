import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShipmentpageComponent } from './shipmentpage.component';

describe('ShipmentpageComponent', () => {
  let component: ShipmentpageComponent;
  let fixture: ComponentFixture<ShipmentpageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShipmentpageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShipmentpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
