import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';  //IonicModule
import { Router } from '@angular/router';
import { arrowBackOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';

@Component({
  selector: 'app-add-client',
  standalone: true,
  imports: [IonicModule],  //IonicModule
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.scss'],
})
export class AddClientComponent {
  constructor(private router: Router) {addIcons({arrowBackOutline})}
  
  goBack(){
    this.router.navigate(['/tabs/tab2']);
  }
}
