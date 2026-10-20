import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonContent, IonButtons, IonMenuButton } from '@ionic/angular';
import { SideMenuComponent } from './components/side-menu/side-menu.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [
    IonButtons,
    IonHeader,
    IonToolbar,
    IonContent,
    IonButtons,
    IonMenuButton,
    SideMenuComponent,
  ],
})
export class HomePage {}
