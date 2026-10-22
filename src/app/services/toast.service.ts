import { inject, Service } from '@angular/core';
import { ToastController, ToastOptions } from '@ionic/angular';

@Service()
export class ToastService {
  private toastController = inject(ToastController);

  public async success(message: string): Promise<void> {
    await this.generic({
      message: message,
      duration: 3000,
      color: 'success',
      position: 'top',
    });
  }

  public async error(message: string): Promise<void> {
    await this.generic({
      message: message,
      duration: 3000,
      color: 'danger',
      position: 'top',
    });
  }

  public async generic(options: ToastOptions) {
    const toast = await this.toastController.create(options);

    await toast.present();
  }
}
