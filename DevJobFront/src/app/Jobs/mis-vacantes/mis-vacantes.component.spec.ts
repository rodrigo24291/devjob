import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MisVacantesComponent } from './mis-vacantes.component';

describe('MisVacantesComponent', () => {
  let component: MisVacantesComponent;
  let fixture: ComponentFixture<MisVacantesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MisVacantesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MisVacantesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
