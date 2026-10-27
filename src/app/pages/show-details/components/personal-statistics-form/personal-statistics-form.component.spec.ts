import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalStatisticsFormComponent } from './personal-statistics-form.component';

describe('PersonalStatisticsFormComponent', () => {
  let component: PersonalStatisticsFormComponent;
  let fixture: ComponentFixture<PersonalStatisticsFormComponent>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalStatisticsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
