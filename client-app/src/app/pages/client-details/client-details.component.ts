import { Component, Input, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { help } from 'ionicons/icons';
import { addIcons } from 'ionicons';

@Component({
  selector: 'app-client-details',
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.scss'],
})
export class ClientDetailsComponent implements OnInit {
  clientId: number | null = null; 
  trainerId: number | null = null;

  @Input() client: any;  // Accept the entire client object passed from the parent
  @Input() trainer: any;

  constructor(
    private apiService: ApiService,
    private authService: AuthService,
  ) {
    addIcons({help});
  }

  /**
   * Initializes the component by setting the client and trainer IDs using the
   * authentication service. It then fetches client details and trainer details
   * based on the client ID. If the client ID is not found, it logs an error message.
   * @returns None
   */
  ngOnInit() {
    this.clientId = this.authService.getClientId();
    this.trainerId = this.authService.getTrainerId();
    if (this.clientId !== null) {
      this.fetchClientDetails();
      this.fetchTrainerDetails();

    } else {
      console.error('Trainer ID not found!');
    }
  }

  /**
   * Fetches client details from the API service based on the trainerId and clientId.
   * If the clientId is not null, it makes a request to the API and updates the client data.
   * @returns None
   */
  fetchClientDetails() {
    if (this.clientId !== null) {
      this.apiService.getClientByNameOrId(this.trainerId, this.clientId).subscribe({
        next: (data) => {
          this.client = data[0];
        },
        error: (err) => console.error('Error fetching clients:', err),
      });
    }
  }

  /**
   * Fetches details of a personal trainer using the trainerId property.
   * Makes an API call to retrieve the trainer data and assigns it to the trainer property.
   * If the trainerId is a number, it fetches the trainer data based on the incremented trainerId.
   * Logs an error message if there is an issue fetching the data.
   * @returns None
   */
  fetchTrainerDetails() {
    if (this.trainerId !== null) {
      this.apiService.getPersonalTrainerData(this.trainerId).subscribe({
        next: (data) => {
          if (typeof(this.trainerId) == "number") {
           let trainerObjectNum = this.trainerId + 1;
           this.trainer = data[trainerObjectNum];
          }
          
        },
        error: (err) => console.error('Error fetching clients:', err),
      });
    }
  }

}
