import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEducacionComponent } from './create-educacion.component';

describe('CreateEducacionComponent', () => {
  let component: CreateEducacionComponent;
  let fixture: ComponentFixture<CreateEducacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateEducacionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateEducacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
