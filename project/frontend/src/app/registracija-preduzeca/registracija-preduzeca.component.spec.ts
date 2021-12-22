import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistracijaPreduzecaComponent } from './registracija-preduzeca.component';

describe('RegistracijaPreduzecaComponent', () => {
  let component: RegistracijaPreduzecaComponent;
  let fixture: ComponentFixture<RegistracijaPreduzecaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistracijaPreduzecaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistracijaPreduzecaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
