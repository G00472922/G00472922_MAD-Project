import { Component, OnInit, input } from '@angular/core';

import {
  IonAccordion,
  IonAccordionGroup,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonItem,
  IonLabel,
} from '@ionic/angular/standalone';

import { MemberDetails } from 'src/app/models/Movie.model';

@Component({
  selector: 'app-details-card',
  templateUrl: './details-card.component.html',
  styleUrls: ['./details-card.component.scss'],
  imports: [
    IonAccordion,
    IonAccordionGroup,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonItem,
    IonLabel,
  ],
})
export class DetailsCardComponent implements OnInit {
  member = input.required<MemberDetails>();

  id: number;
  name: string;
  profile?: string;
  aka?: string[];
  birthday?: string;
  deathday?: string;
  birthplace?: string;
  biography?: string;

  constructor() {
    this.id = -1;
    this.name = '';
    this.profile = '';
    this.aka = [];
    this.birthday = '';
    this.deathday = '';
    this.birthplace = '';
    this.biography = '';
  }

  ngOnInit() {
    this.id = this.member().id;
    this.name = this.member().memberName;
    this.profile = this.member().profile;
    this.aka = this.member().aka;
    this.birthday = this.member().birthday;
    this.deathday = this.member().deathday;
    this.birthplace = this.member().birthplace;
    this.biography = this.member().biography;
  }
}
