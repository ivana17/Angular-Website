import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RasadnikDetaljiComponent } from './rasadnik-detalji.component';

describe('RasadnikDetaljiComponent', () => {
  let component: RasadnikDetaljiComponent;
  let fixture: ComponentFixture<RasadnikDetaljiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RasadnikDetaljiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RasadnikDetaljiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
