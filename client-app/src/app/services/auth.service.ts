import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private clientId: number | null = null;
  private trainerId: number | null = null;

  constructor() {
    // On initialization, load the client ID from localStorage if it exists
    const storedClientId = localStorage.getItem('clientId');
    this.clientId = storedClientId ? parseInt(storedClientId, 10) : null;
  }

  /**
   * Sets the client's ID after successful login and persists it in localStorage.
   * @param {number} clientId - The ID of the logged-in client.
   */
  setClientId(clientId: number): void {
    console.log('AuthService - Setting Client ID:', clientId);
    this.clientId = clientId;
    localStorage.setItem('clientId', clientId.toString()); // Save to localStorage
  }

    /**
   * Sets the client's ID after successful login and persists it in localStorage.
   * @param {number} clientId - The ID of the logged-in client.
   */
    setTrainerId(trainerId: number): void {
      console.log('AuthService - Setting Trainer ID:', trainerId); // I don't think this is secure... 
      this.trainerId = trainerId;
      localStorage.setItem('trainerId', trainerId.toString());
    }

  /**
   * Gets the client's ID from memory or localStorage.
   * @returns {number | null} The client's ID or null if not logged in.
   */
  getClientId(): number | null {
    if (!this.clientId) {
      // Fallback: Check localStorage if memory value is missing
      const storedClientId = localStorage.getItem('clientId');
      this.clientId = storedClientId ? parseInt(storedClientId, 10) : null;
    }
    console.log('AuthService - Getting Client ID:', this.clientId); 
    return this.clientId;
  }

    /**
   * Gets the trainer's ID from memory or localStorage.
   * @returns {number | null} The trainer's ID or null if not logged in.
   */
    getTrainerId(): number | null {
      if (!this.trainerId) {
        // Fallback: Check localStorage if memory value is missing
        const storedtrainerId = localStorage.getItem('trainerId');
        this.trainerId = storedtrainerId ? parseInt(storedtrainerId, 10) : null;
      }
      console.log('AuthService - Getting Trainer ID:', this.trainerId); 
      return this.trainerId;
    }

  /**
   * Clears the client's ID from memory and localStorage during logout.
   */
  clearClientId(): void {
    console.log('AuthService - Clearing Client ID');
    this.clientId = null;
    localStorage.removeItem('clientId'); // Clear from localStorage
  }
}
