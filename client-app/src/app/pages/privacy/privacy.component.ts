import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { help } from 'ionicons/icons';
import { addIcons } from 'ionicons';

@Component({
  selector: 'app-privacy',
  standalone: true,
  templateUrl: './privacy.component.html',
  styleUrls: ['./privacy.component.scss'],
  imports: [IonicModule]
})
export class PrivacyComponent {

  constructor() {
    addIcons({help});
  }

}
