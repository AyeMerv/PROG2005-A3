import { Component } from '@angular/core';
import { IonicModule, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { arrowBackOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { ApiService } from 'src/app/services/api.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AlertController } from '@ionic/angular'; //Alerts

@Component({
  selector: 'app-add-client',
  standalone: true,
  imports: [IonicModule, FormsModule, CommonModule],
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.scss'],
})
export class AddClientComponent {
  clientData: any = {
    name: '',
    email: '',
    password: '',
    dob: '',
    gender: '',
    fitness_program: '',
    special_health_notes: '',
    joined_date: '',
    ending_date: '',
    personaltrainer_id: null, // Assigned in `ngOnInit`
  };

  constructor(
    private router: Router,
    private toastController: ToastController,
    private alertController: AlertController,
    private apiService: ApiService
  ) {addIcons({ arrowBackOutline });}

  ngOnInit() {
    // Assign personal trainer ID from AuthService
    const trainerId = Number(localStorage.getItem('trainerId'));
    if (!trainerId) {
      this.showToast('Error: Trainer not logged in!', 'danger');
      this.goBack();
    } else {
      this.clientData.personaltrainer_id = trainerId;
    }
  }

  goBack() {
    this.router.navigate(['/tabs/tab2']);
  }

  /**
   * Adds a new client to the system after confirmation.
   */
  async addClient() {
    // Show confirmation alert
    const alert = await this.alertController.create({
      header: 'Confirm Add Client',
      message: 'Are you sure you want to add this client?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Add',
          handler: () => {
            // Call the API to create the client
            this.apiService.createClient(this.clientData).subscribe({
              next: (response) => {
                this.showToast('Client added successfully!', 'success');
                this.router.navigate(['/tabs/tab2']); // Redirect to client list
              },
              error: (err) => {
                console.error('Error adding client:', err);
                this.showToast('Failed to add client. Please try again.', 'danger');
              },
            });
          },
        },
      ],
    });

    await alert.present(); // Show the confirmation alert
  }

  /**
   * Shows a toast message.
   */
  async showToast(message: string, color: 'success' | 'danger' | 'warning' = 'success') {
    const toast = await this.toastController.create({
      message,
      duration: 3000,
      color,
      position: 'middle',
    });
    await toast.present();
  }
}