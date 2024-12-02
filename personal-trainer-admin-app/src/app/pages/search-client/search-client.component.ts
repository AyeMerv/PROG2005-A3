import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';  //IonicModule

@Component({
  selector: 'app-search-client',
  standalone: true,
  imports: [IonicModule],  //IonicModule
  templateUrl: './search-client.component.html',
  styleUrls: ['./search-client.component.scss'],
})
export class SearchClientComponent {
  constructor() {}
}
