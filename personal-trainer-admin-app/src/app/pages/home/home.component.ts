import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { help } from 'ionicons/icons';
import { addIcons } from 'ionicons';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [IonicModule], 
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  trainerName=""
  constructor() {
    addIcons({help})
  }
}
