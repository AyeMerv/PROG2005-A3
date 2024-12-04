import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private personalTrainerId: number | null = null;

  constructor() {
    // On initialization, load the trainer ID from localStorage if it exists
    const storedTrainerId = localStorage.getItem('trainerId');
    this.personalTrainerId = storedTrainerId ? parseInt(storedTrainerId, 10) : null;
  }

  /**
   * Sets the trainer's ID after successful login and persists it in localStorage.
   * @param {number} trainerId - The ID of the logged-in trainer.
   */
  setTrainerId(trainerId: number): void {
    console.log('AuthService - Setting Trainer ID:', trainerId);
    this.personalTrainerId = trainerId;
    localStorage.setItem('trainerId', trainerId.toString()); // Save to localStorage
  }

  /**
   * Gets the trainer's ID from memory or localStorage.
   * @returns {number | null} The trainer's ID or null if not logged in.
   */
  getTrainerId(): number | null {
    if (!this.personalTrainerId) {
      // Fallback: Check localStorage if memory value is missing
      const storedTrainerId = localStorage.getItem('trainerId');
      this.personalTrainerId = storedTrainerId ? parseInt(storedTrainerId, 10) : null;
    }
    console.log('AuthService - Getting Trainer ID:', this.personalTrainerId); 
    return this.personalTrainerId;
  }

  /**
   * Clears the trainer's ID from memory and localStorage during logout.
   */
  clearTrainerId(): void {
    console.log('AuthService - Clearing Trainer ID');
    this.personalTrainerId = null;
    localStorage.removeItem('trainerId'); // Clear from localStorage
  }
}
