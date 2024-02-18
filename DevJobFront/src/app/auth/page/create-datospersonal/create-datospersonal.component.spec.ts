import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDatospersonalComponent } from './create-datospersonal.component';

describe('CreateDatospersonalComponent', () => {
  let component: CreateDatospersonalComponent;
  let fixture: ComponentFixture<CreateDatospersonalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateDatospersonalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateDatospersonalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
