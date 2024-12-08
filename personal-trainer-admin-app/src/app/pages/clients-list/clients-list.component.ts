import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular'; 
import { CommonModule } from '@angular/common'; 
import { FormsModule } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service'; 
import { add, createOutline, help, trashOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { ToastController } from '@ionic/angular'; 
import { AlertController } from '@ionic/angular';
import { ModalController } from '@ionic/angular/standalone'; 
import { ClientDetailModalComponent } from '../client-detail-modal/client-detail-modal.component';

@Component({
  selector: 'app-clients-list',
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
  templateUrl: './clients-list.component.html',
  styleUrls: ['./clients-list.component.scss'],
})
export class ClientListComponent implements OnInit {
  clients: any[] = [];
  filteredClients: any[] = []; // To store the filtered clients
  searchTerm: string = ''; // For the search bar
  personalTrainerId: number | null = null; 

  constructor(
    private toastController: ToastController,
    private alertController: AlertController,
    private modalController: ModalController,
    private apiService: ApiService,
    private authService: AuthService,
    private router: Router
  ) {
    addIcons({createOutline, trashOutline, add, help});
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
        next: (data) => {
          this.clients = data;
          this.filteredClients = data; // Initialize with all clients
        },
        error: (err) => console.error('Error fetching clients:', err),
      });
    }
  }

  filterClients() {
    // If searchTerm is empty, show all clients
    if (!this.searchTerm.trim()) {
      this.filteredClients = this.clients;
    } else {
      // Filter clients based on the name matching the search term (case-insensitive)
      this.filteredClients = this.clients.filter(client =>
        client.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  }

  /**
   * Opens a modal for viewing the client.
   */
  async viewClient(clientId: number) {
    const selectedClient = this.clients.find(client => client.client_id === clientId);
  
    if (selectedClient) {
      const modal = await this.modalController.create({
        component: ClientDetailModalComponent,
        componentProps: { client: selectedClient }
      });
      await modal.present();
    } else {
      console.error('Client not found!');
    }
  }

    /**
   * Navigates to the add client page.
   */
    addClient(): void {
      console.log('Add Client');
      this.router.navigate(['/add-client']);
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

    const alert = await this.alertController.create({
      header: 'Confirm Delete',
      message: 'Are you sure you want to delete this client?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => console.log('Delete cancelled'),
        },
        {
          text: 'Delete',
          handler: () => {
            this.apiService.deleteClient(clientId).subscribe({
              next: () => {
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
