import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';  //IonicModule
import { Router } from '@angular/router';

@Component({
  selector: 'app-clients-list',
  standalone: true,
  imports: [IonicModule],
  templateUrl: './clients-list.component.html',
  styleUrls: ['./clients-list.component.scss'],
})
export class ClientsListComponent {
  constructor(private router: Router) {}

  goToEditClient(clientId: number) {
    this.router.navigate([`/tabs/edit-client`, clientId]);
  }
}
