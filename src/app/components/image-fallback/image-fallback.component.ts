import { NgOptimizedImage } from '@angular/common';
import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-image-fallback',
  templateUrl: './image-fallback.component.html',
  styleUrls: ['./image-fallback.component.scss'],
  imports: [NgOptimizedImage],
  host: { class: 'contents' },
})
export class ImageFallbackComponent {
  public readonly imageSrc = input<string>();
  public readonly fullSrc = input<boolean>(false);
  public readonly format = input<'portrait' | 'landscape'>('portrait');
  public readonly hasPriority = input<boolean>(false);
  public readonly imageClasses = input<string>('');
  public readonly fallbackClasses = input<string>('');
  protected readonly dimensions = computed<{ width: number; height: number }>(() =>
    this.format() === 'portrait' ? { width: 210, height: 295 } : { width: 250, height: 140 },
  );
}
