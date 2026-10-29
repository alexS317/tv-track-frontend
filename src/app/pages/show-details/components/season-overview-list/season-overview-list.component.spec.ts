import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeasonOverviewListComponent } from './season-overview-list.component';

describe('SeasonOverviewListComponent', () => {
  let component: SeasonOverviewListComponent;
  let fixture: ComponentFixture<SeasonOverviewListComponent>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SeasonOverviewListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
