import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PoljoprivrednikDetaljiComponent } from './poljoprivrednik-detalji.component';

describe('PoljoprivrednikDetaljiComponent', () => {
  let component: PoljoprivrednikDetaljiComponent;
  let fixture: ComponentFixture<PoljoprivrednikDetaljiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PoljoprivrednikDetaljiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PoljoprivrednikDetaljiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
