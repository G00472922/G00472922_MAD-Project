import { Component, input, OnInit } from '@angular/core';
import {
  IonCard,
  IonCardContent,
  IonLabel,
  IonThumbnail,
} from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-short-person-card',
  templateUrl: './short-person-card.component.html',
  styleUrls: ['./short-person-card.component.scss'],
  imports: [IonLabel, IonCardContent, IonCard, IonThumbnail, RouterLink],
})
export class ShortPersonCardComponent implements OnInit {
  id = input.required<string>();
  name = input.required<string>();
  role = input.required<string>();
  profile = input.required<string | null>();
  profileUrl: string;

  constructor() {
    this.profileUrl = '';
  }

  ngOnInit() {
    this.profileUrl =
      this.profile() === null
        ? 'https://ionicframework.com/docs/img/demos/avatar.svg'
        : `https://image.tmdb.org/t/p/w500${this.profile()}`;
  }
}
