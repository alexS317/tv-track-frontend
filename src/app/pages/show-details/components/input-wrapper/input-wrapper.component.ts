import { Component, input } from '@angular/core';
import { IonText } from '@ionic/angular';

@Component({
  selector: 'app-input-wrapper',
  templateUrl: './input-wrapper.component.html',
  styleUrls: ['./input-wrapper.component.scss'],
  imports: [IonText],
})
export class InputWrapperComponent {
  public readonly label = input<string>();
}
