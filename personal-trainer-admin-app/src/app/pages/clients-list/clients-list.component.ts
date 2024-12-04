import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';  // Ionic module
import { CommonModule } from '@angular/common'; // CommonModule for ngIf, ngFor, etc.
import { FormsModule } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service'; // Import AuthService
import { add, createOutline, trashOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { ToastController } from '@ionic/angular'; //success and error messages
import { AlertController } from '@ionic/angular'; //Alerts

@Component({
  selector: 'app-clients-list',
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
  templateUrl: './clients-list.component.html',
  styleUrls: ['./clients-list.component.scss'],
})
export class ClientListComponent implements OnInit {
  clients: any[] = [];
  personalTrainerId: number | null = null; // Null until the trainer is logged in

  constructor(
    private toastController: ToastController,
    private alertController: AlertController,
    private apiService: ApiService,
    private authService: AuthService,
    private router: Router
  ) {
    addIcons({createOutline, trashOutline, add});
    }

  ngOnInit() {
    this.personalTrainerId = this.authService.getTrainerId();

    if (this.personalTrainerId !== null) {
      this.fetchClients();
    } else {
      console.error('Trainer ID not found!');
    }
  }

  fetchClients() {
    if (this.personalTrainerId !== null) {
      this.apiService.getClients(this.personalTrainerId).subscribe({
        next: (data) => (this.clients = data),
        error: (err) => console.error('Error fetching clients:', err),
      });
    }
  }
  
  /**
   * Navigates to the edit client page with client details.
   */
  editClient(clientId: number): void {
    console.log('Edit Client:', clientId);
    this.router.navigate(['/edit-client', clientId]);
  }

  /**
   * Displays a confirmation dialog before deleting the client.
   */
  async deleteClient(clientId: number): Promise<void> {
    if (!clientId) {
      console.error('Client ID is undefined');
      this.showToast('Failed to delete client. Please try again.', 'danger');
      return;
    }

    // Show confirmation dialog
    const alert = await this.alertController.create({
      header: 'Confirm Delete',
      message: 'Are you sure you want to delete this client?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Delete cancelled');
          },
        },
        {
          text: 'Delete',
          handler: () => {
            // Proceed with deletion if confirmed
            console.log('Delete Client ID:', clientId);
            this.apiService.deleteClient(clientId).subscribe({
              next: () => {
                // Remove the client from the local list
                this.clients = this.clients.filter(client => client.client_id !== clientId);
                this.showToast('Client deleted successfully!', 'success');
              },
              error: (err) => {
                console.error('Error deleting client:', err);
                this.showToast('Failed to delete client. Please try again.', 'danger');
              },
            });
          },
        },
      ],
    });

    await alert.present();
  }

  /**
   * Navigates to the add client page.
   */
  addClient(): void {
    console.log('Add Client');
    this.router.navigate(['/add-client']);
  }

  async showToast(message: string, color: 'success' | 'danger' | 'warning' = 'success') {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      color,
      position: 'middle',
    });
    await toast.present();
  }
}
