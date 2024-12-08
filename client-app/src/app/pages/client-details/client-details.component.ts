import { Component, Input, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';

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
  clientData: any[] = [];
  trainerData: any[] = [];

  @Input() client: any;  // Accept the entire client object passed from the parent
  @Input() trainer: any;

  constructor(
    private apiService: ApiService,
    private authService: AuthService,
  ) {}

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

  fetchClientDetails() {
    if (this.clientId !== null) {
      this.apiService.getClientByNameOrId(this.trainerId, this.clientId).subscribe({
        next: (data) => {
          this.clientData = data;
          this.client = data[0];
        },
        error: (err) => console.error('Error fetching clients:', err),
      });
    }
  }

  fetchTrainerDetails() {
    if (this.trainerId !== null) {
      this.apiService.getPersonalTrainerData(this.trainerId).subscribe({
        next: (data) => {
          this.trainerData = data;
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
