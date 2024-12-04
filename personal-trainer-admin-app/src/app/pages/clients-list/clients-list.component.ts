import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';  // Ionic module
import { CommonModule } from '@angular/common'; // CommonModule for ngIf, ngFor, etc.
import { FormsModule } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service'; // Import AuthService

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
    private apiService: ApiService,
    private authService: AuthService // Inject AuthService
  ) {}

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
}
