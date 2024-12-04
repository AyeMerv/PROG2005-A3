import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private personalTrainerId: number | null = null;

  constructor() {}

  /**
   * Sets the trainer's ID after successful login.
   * @param {number} trainerId - The ID of the logged-in trainer.
   */
  setTrainerId(trainerId: number): void {
    console.log('AuthService - Setting Trainer ID:', trainerId);
    this.personalTrainerId = trainerId;
  }

  /**
   * Gets the trainer's ID.
   * @returns {number | null} The trainer's ID or null if not logged in.
   */
  getTrainerId(): number | null {
    console.log('AuthService - Getting Trainer ID:', this.personalTrainerId); 
    return this.personalTrainerId;
  }
}
