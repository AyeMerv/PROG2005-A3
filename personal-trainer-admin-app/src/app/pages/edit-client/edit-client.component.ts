import { Component, OnInit } from '@angular/core';
import { IonicModule, ToastController, AlertController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { CommonModule } from '@angular/common';
import { arrowBackOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';

@Component({
  selector: 'app-edit-client',
  standalone: true,
  imports: [IonicModule, FormsModule, CommonModule],
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.scss'],
})
export class EditClientComponent implements OnInit {
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
    personaltrainer_id: null,
  };

  clientId: number | null = null;
  personalTrainerId: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService,
    private toastController: ToastController,
    private alertController: AlertController
  ) {addIcons({ arrowBackOutline });}

  ngOnInit() {
    // Get clientId from the URL
    this.clientId = Number(this.route.snapshot.paramMap.get('id'));
    if (!this.clientId) {
      this.showToast('Error: Invalid client ID.', 'danger');
      this.router.navigate(['/tabs/tab2']);
      return;
    }

    // Get personalTrainerId from localStorage
    this.personalTrainerId = Number(localStorage.getItem('trainerId'));
    if (!this.personalTrainerId) {
      this.showToast('Error: Trainer not logged in!', 'danger');
      this.router.navigate(['/tabs/tab2']);
      return;
    }

    // Fetch client data to populate the form
    this.loadClientData();
  }

  goBack() {
    this.router.navigate(['/tabs/tab2']);
  }

  /**
   * Fetches client data and populates the form.
   */
  private loadClientData() {
    this.apiService
      .getClientByNameOrId(this.personalTrainerId!, this.clientId!)
      .subscribe({
        next: (response) => {
          // Assuming the response is an array
          if (Array.isArray(response) && response.length > 0) {
            const client = response[0];
  
            // Adjust dates by adding one day
            this.clientData = {
              ...client,
              dob: this.adjustDateByOneDay(client.dob),
              joined_date: this.adjustDateByOneDay(client.joined_date),
              ending_date: this.adjustDateByOneDay(client.ending_date)
            };
  
            console.log('Client data loaded:', this.clientData);
          } else {
            this.showToast('Client not found.', 'danger');
            this.router.navigate(['/tabs/tab2']);
          }
        },
        error: (err) => {
          console.error('Error fetching client data:', err);
          this.showToast('Failed to load client data. Please try again.', 'danger');
          this.router.navigate(['/tabs/tab2']);
        },
      });
  }
  
  /**
   * Adjusts a date by adding one day.
   * @param date The date string in 'yyyy-mm-dd' or ISO format.
   * @returns Adjusted date string in 'yyyy-mm-dd' format.
   */
  private adjustDateByOneDay(date: string): string {
    const parsedDate = new Date(date);
    parsedDate.setDate(parsedDate.getDate() + 1); // Add one day
    const formattedDate = parsedDate.toISOString().split('T')[0]; // 'yyyy-mm-dd'
    return formattedDate;
  }
  

  /**
   * Updates client data.
   */
  updateClient() {
    if (this.clientId) {
      const updatedData = {
        ...this.clientData,
        dob: this.clientData.dob || null,
        joined_date: this.clientData.joined_date || null,
        ending_date: this.clientData.ending_date || null,
      };
  
      this.apiService.editClient(this.clientId, updatedData).subscribe({
        next: () => {
          this.showToast('Client updated successfully!', 'success');
          this.router.navigate(['/tabs/tab2']);
        },
        error: (err) => {
          console.error('Error updating client:', err);
          this.showToast('Failed to update client. Please try again.', 'danger');
        },
      });
    }
  }

  /**
   * Displays a toast message.
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
