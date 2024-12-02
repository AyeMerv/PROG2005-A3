import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';  // IonicModule

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [IonicModule],  // IonicModule
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor() {}
}
