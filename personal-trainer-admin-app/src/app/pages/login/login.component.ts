import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';  // IonicModule
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [IonicModule],  // IonicModule
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  toastVisible: boolean = false;
  toastMessage: string = '';

  /**
   * Constructor for the class.
   * @param {HttpClient} http - An instance of the HttpClient service.
   */
  constructor(private http: HttpClient) { }

  login() {
    const apiUrl = "https://nehemia.it.scu.edu.au/personaltrainer/personaltrainer/login";
    const loginData = {
      email: this.email,
      password: this.password,
    };

    this.http.post(apiUrl, loginData).subscribe(
      (response: any) => {
        if (response.success) {
          this.toastMessage = 'Login successful!';
        } else {
          this.toastMessage = 'Invalid username or password.';
        }
        this.showToast();
      },
      (error) => {
        console.error('API error:', error);
        this.toastMessage = 'An error occurred. Please try again.';
        this.showToast();
      }
    );
  }

  showToast() {
    this.toastVisible = true;
    setTimeout(() => {
      this.toastVisible = false;
    }, 2000);
  }

}
