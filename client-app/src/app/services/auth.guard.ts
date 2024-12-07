import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
    private toastController: ToastController
  ) {}

  async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    const clientId = this.authService.getClientId(); // Get the personalTrainerId from AuthService

    console.log('AuthGuard - Checking Client ID:', clientId);

    if (clientId) {
      console.log('AuthGuard - Client ID found, access granted.');
      return true;
    } else {
      console.log('AuthGuard - Client ID not found, redirecting to login.');
      await this.showToast('You need to be logged in to access this page.', 'danger');
      this.router.navigate(['/tabs/tab4']);
      return false;
    }
  }

  async showToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      color,
      position: 'middle',
    });
    await toast.present();
  }
}
