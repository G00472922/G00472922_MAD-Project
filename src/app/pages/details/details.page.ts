import { Component, OnInit } from '@angular/core';
import { IonContent, IonButton } from '@ionic/angular/standalone';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
  imports: [IonButton, IonContent],
})
export class DetailsPage implements OnInit {
  constructor() {}

  ngOnInit() {}
}
