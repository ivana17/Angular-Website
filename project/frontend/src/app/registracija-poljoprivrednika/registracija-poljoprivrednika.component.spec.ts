import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistracijaPoljoprivrednikaComponent } from './registracija-poljoprivrednika.component';

describe('RegistracijaPoljoprivrednikaComponent', () => {
  let component: RegistracijaPoljoprivrednikaComponent;
  let fixture: ComponentFixture<RegistracijaPoljoprivrednikaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistracijaPoljoprivrednikaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistracijaPoljoprivrednikaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
