import { Component } from '@angular/core';
import { IonicModule, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { arrowBackOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { ApiService } from 'src/app/services/api.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

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
    private apiService: ApiService
  ) {
    addIcons({ arrowBackOutline });
  }

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
   * Submits the form to add a new client.
   */
  submitForm() {
    if (!this.clientData.name || !this.clientData.email || !this.clientData.password) {
      this.showToast('Please fill out all required fields.', 'danger');
      return;
    }

    this.apiService.createClient(this.clientData).subscribe({
      next: () => {
        this.showToast('Client added successfully!', 'success');
        this.goBack();
      },
      error: (err) => {
        console.error('Error adding client:', err);
        this.showToast('Failed to add client. Please try again.', 'danger');
      },
    });
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