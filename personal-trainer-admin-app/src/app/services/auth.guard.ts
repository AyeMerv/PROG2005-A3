import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
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
    const trainerId = this.authService.getTrainerId();  // Get trainer ID

    if (trainerId) {
      // If the trainer is logged in, allow access
      return true;
    } else {
      // If not logged in, show a toast and redirect
      await this.showToast('You need to be logged in to access this page.', 'danger');
      this.router.navigate(['/tabs/tab4']);
      return false;
    }
  }

  // Method to display the toast
  private async showToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message,
      duration: 3000,  // Duration of the toast message
      color,
      position: 'top',  // Display the toast at the top
    });
    await toast.present();
  }
}
