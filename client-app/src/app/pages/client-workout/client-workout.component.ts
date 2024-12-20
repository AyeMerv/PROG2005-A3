import { NgFor, NgIf } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { help } from 'ionicons/icons';
import { addIcons } from 'ionicons';


@Component({
  selector: 'app-client-workout',
  standalone: true,
  templateUrl: './client-workout.component.html',
  styleUrls: ['./client-workout.component.scss'],
  imports: [IonicModule, NgFor, NgIf],
})
export class ClientWorkoutComponent implements OnInit {
  clientId: number | null = null; 
  workoutPlan: any[] | null = null;  

  constructor(
    private apiService: ApiService,
    private authService: AuthService,
  ) {
    addIcons({help});
  }

  /**
   * Initializes the component by retrieving the client ID from the authentication service,
   * and then fetching the workout plan for the client using the API service.
   * If the client ID is not found, an error message is logged.
   * @returns None
   */
  ngOnInit() {
    this.clientId = this.authService.getClientId();
    if (this.clientId !== null) {
      this.apiService.getWorkoutPlan(this.clientId).subscribe({
        next: (data) => {
          console.log(data)
          this.workoutPlan = data;
        },
        error: (err) => console.error('Error fetching workout plan:', err),
      });
    } else {
      console.error('Client ID not found!');
    }
  }

}
