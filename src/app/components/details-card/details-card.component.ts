import { Component, OnInit, input } from '@angular/core';
import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonAccordion,
  IonAccordionGroup,
  IonItem,
  IonLabel,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-details-card',
  templateUrl: './details-card.component.html',
  styleUrls: ['./details-card.component.scss'],
  imports: [
    IonLabel,
    IonItem,
    IonAccordionGroup,
    IonCardContent,
    IonCardSubtitle,
    IonCardTitle,
    IonCardHeader,
    IonCard,
    IonAccordion,
  ],
})
export class DetailsCardComponent implements OnInit {
  id = input.required<number>();
  name = input.required<string>();
  profile = input.required<string | null>();
  aka = input.required<string[]>();
  birthday = input.required<string>();
  deathday = input.required<string>();
  birthplace = input.required<string>();
  biography = input.required<string>();
  profileUrl: string;

  constructor() {
    this.profileUrl = '';
  }

  ngOnInit() {
    this.profileUrl =
      this.profile() === ''
        ? 'https://ionicframework.com/docs/img/demos/avatar.svg'
        : `https://image.tmdb.org/t/p/w500${this.profile()}`;
  }
}
