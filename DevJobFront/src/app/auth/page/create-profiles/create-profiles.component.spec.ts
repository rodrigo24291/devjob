import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateProfilesComponent } from './create-profiles.component';

describe('CreateProfilesComponent', () => {
  let component: CreateProfilesComponent;
  let fixture: ComponentFixture<CreateProfilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateProfilesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateProfilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
