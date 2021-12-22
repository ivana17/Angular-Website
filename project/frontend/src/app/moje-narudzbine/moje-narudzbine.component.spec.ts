import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MojeNarudzbineComponent } from './moje-narudzbine.component';

describe('MojeNarudzbineComponent', () => {
  let component: MojeNarudzbineComponent;
  let fixture: ComponentFixture<MojeNarudzbineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MojeNarudzbineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MojeNarudzbineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
