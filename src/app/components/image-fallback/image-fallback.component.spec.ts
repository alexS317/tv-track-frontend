import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageFallbackComponent } from './image-fallback.component';

describe('ImageFallbackComponent', () => {
  let component: ImageFallbackComponent;
  let fixture: ComponentFixture<ImageFallbackComponent>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageFallbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
