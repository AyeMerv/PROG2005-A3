import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';  //IonicModule

@Component({
  selector: 'app-privacy-security',
  standalone: true,
  imports: [IonicModule],  //IonicModule
  templateUrl: './privacy.component.html',
  styleUrls: ['./privacy.component.scss'],
})
export class PrivacySecurityComponent {
  constructor() {}
}
