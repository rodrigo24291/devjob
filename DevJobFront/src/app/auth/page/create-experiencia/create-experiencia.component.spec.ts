import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateExperienciaComponent } from './create-experiencia.component';

describe('CreateExperienciaComponent', () => {
  let component: CreateExperienciaComponent;
  let fixture: ComponentFixture<CreateExperienciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateExperienciaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateExperienciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
