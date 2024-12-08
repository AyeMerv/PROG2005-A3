import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = 'https://nehemia.it.scu.edu.au/personaltrainer';

  constructor(private http: HttpClient) {}

  // Get all personal trainers
  getPersonalTrainers(): Observable<any> {
    return this.http.get(`${this.baseUrl}/personaltrainer`);
  }

  // Get all personal trainers
  getPersonalTrainerData(trainerId: any): Observable<any> {
    const allTrainers = this.http.get(`${this.baseUrl}/personaltrainer`);
    return this.http.get(`${this.baseUrl}/personaltrainer`);
  }

  // Get all clients by personal trainer ID
  getClients(personalTrainerId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/client/${personalTrainerId}`);
  }

  // Personal trainer login
  personalTrainerLogin(email: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/personaltrainer/login`, {
      email,
      password,
    });
  }

  // Client login
  clientLogin(email: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/client/login`, {
      email,
      password,
    });
  }

  // Get specific client by name or ID
  getClientByNameOrId(personalTrainerId: number | null, clientId: number | null): Observable<any> {
    return this.http.get(`${this.baseUrl}/client/${personalTrainerId}/${clientId}`);
  }

  // Create a new client
  createClient(clientData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/client`, clientData);
  }

  // Edit an existing client
  editClient(clientId: number, clientData: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/client/${clientId}`, clientData);
  }

  // Delete a client
  deleteClient(clientId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/client/${clientId}`);
  }

  // Get workout plan by client ID
  getWorkoutPlan(clientId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/workoutplan/${clientId}`);
  }
}
