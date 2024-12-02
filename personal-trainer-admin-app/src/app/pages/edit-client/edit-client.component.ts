import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';  //IonicModule

@Component({
  selector: 'app-edit-client',
  standalone: true,
  imports: [IonicModule],  //IonicModule
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.scss'],
})
export class EditClientComponent {
  constructor() {}
}
