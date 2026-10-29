import {
  afterNextRender,
  Component,
  ElementRef,
  input,
  signal,
  viewChild,
  OnDestroy,
} from '@angular/core';
import { IonButton, IonIcon, IonText } from '@ionic/angular';

@Component({
  selector: 'app-read-more',
  templateUrl: './read-more.component.html',
  styleUrls: ['./read-more.component.scss'],
  imports: [IonIcon, IonButton, IonText],
})
export class ReadMoreComponent implements OnDestroy {
  public readonly text = input.required<string>();
  public readonly lines = input<number>(5);
  protected readonly collapsed = signal<boolean>(true);
  protected readonly hasOverflow = signal<boolean>(false);
  private readonly summary = viewChild('summary', { read: ElementRef });
  private resizeObserver?: ResizeObserver;

  constructor() {
    afterNextRender(() => {
      if (!this.summary()) {
        return;
      }
      this.resizeObserver = new ResizeObserver(() => {
        if (!this.collapsed()) {
          return;
        }
        this.hasOverflow.set(
          this.summary()?.nativeElement.scrollHeight > this.summary()?.nativeElement.clientHeight,
        );
      });

      this.resizeObserver.observe(this.summary()?.nativeElement);
    });
  }

  ngOnDestroy() {
    this.resizeObserver?.disconnect();
  }

  protected onToggle(): void {
    this.collapsed.set(!this.collapsed());
  }
}
