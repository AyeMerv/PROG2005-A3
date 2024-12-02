import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';  //IonicModule

@Component({
  selector: 'app-add-client',
  standalone: true,
  imports: [IonicModule],  //IonicModule
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.scss'],
})
export class AddClientComponent {
  constructor() {}
}
