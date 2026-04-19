import { Component, OnInit } from '@angular/core';
import { IonContent, IonButton } from '@ionic/angular/standalone';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.page.html',
  styleUrls: ['./movie-details.page.scss'],
  imports: [IonButton, IonContent],
})
export class MovieDetailsPage implements OnInit {
  constructor() {}

  ngOnInit() {}
}
