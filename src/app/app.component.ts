import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular';
import { addIcons } from 'ionicons';
import {
  add,
  arrowDown,
  arrowUp,
  checkmarkCircle,
  chevronDown,
  chevronForward,
  chevronUp,
  film,
  heart,
  logOut,
  moon,
  refresh,
  star,
  sunny,
  swapVertical,
  time,
  trash,
} from 'ionicons/icons';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent {
  constructor() {
    addIcons({
      sunny,
      moon,
      film,
      logOut,
      star,
      trash,
      chevronUp,
      chevronDown,
      add,
      heart,
      time,
      refresh,
      checkmarkCircle,
      swapVertical,
      arrowUp,
      arrowDown,
      chevronForward,
    });
  }
}
