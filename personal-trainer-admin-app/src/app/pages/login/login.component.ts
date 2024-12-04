import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';  // IonicModule
import { HttpClient } from '@angular/common/http';
import { ToastController } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { lastValueFrom } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [IonicModule, FormsModule],  // IonicModule
  schemas: [],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  /**
   * Constructor for the class.
   * @param {HttpClient} http - An instance of the HttpClient service.
   */
  constructor(
    private http: HttpClient, 
    private toastController: ToastController,
    private authService: AuthService,
    private router: Router
  ) { }

 
  /**
   * Asynchronously logs in the user by sending a POST request to the specified API endpoint with login data.
   * Shows a success message if login is successful, otherwise shows an error message.
   * @returns None
   */
  async login() {
    const apiUrl = "https://nehemia.it.scu.edu.au/personaltrainer/personaltrainer/login";
    const loginData = {
      email: this.email,
      password: this.password,
    };
    try {
      const response: any = await lastValueFrom(this.http.post(apiUrl, loginData));
      
      // Log the entire response
      console.log('Login Response:', response);
  
      const trainerId = response.user?.personaltrainer_id;
      if (trainerId) {
        this.authService.setTrainerId(trainerId);
        await this.showToast('Login successful!', 'success');
        this.router.navigate(['/tabs/tab2']); // Redirect to tab2 after successful login
      } else {
        console.error('Trainer ID not found in response.');
        await this.showToast('Error: Trainer ID missing.', 'danger');
      }
    } catch (error) {
      console.error('Login unsuccessful:', error);
      await this.showToast('An error occurred. Username or password is invalid. Please try again.', 'danger');
    }
  }

  /**
   * Displays a toast message with the given message and color.
   * @param {string} message - The message to display in the toast.
   * @param {string} color - The color of the toast message.
   * @returns None
   */
  async showToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      color,
      position: 'middle',  // Display the toast at the top
    });
    await toast.present();
  }
}
