import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreduzeceDetaljiComponent } from './preduzece-detalji.component';

describe('PreduzeceDetaljiComponent', () => {
  let component: PreduzeceDetaljiComponent;
  let fixture: ComponentFixture<PreduzeceDetaljiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreduzeceDetaljiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreduzeceDetaljiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
