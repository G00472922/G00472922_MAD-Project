import { Component, OnInit } from '@angular/core';
import { IonContent, IonButton } from '@ionic/angular/standalone';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.page.html',
  styleUrls: ['./favourites.page.scss'],
  imports: [IonButton, IonContent],
})
export class FavouritesPage implements OnInit {
  constructor() {}

  ngOnInit() {}
}
