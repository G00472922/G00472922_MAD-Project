import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCol,
  IonContent,
  IonGrid,
  IonList,
  IonRow,
} from '@ionic/angular/standalone';

import { CreditsListComponent } from 'src/app/components/credits-list/credits-list.component';
import { DetailsCardComponent } from 'src/app/components/details-card/details-card.component';

import { MoviesService } from 'src/app/services/movies.service';

import { MemberDetails, Movie } from 'src/app/models/Movie.model';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
  imports: [
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCol,
    IonContent,
    IonGrid,
    IonList,
    IonRow,
    CreditsListComponent,
    DetailsCardComponent,
  ],
})
export class DetailsPage implements OnInit {
  personId: number;
  member: MemberDetails;
  castCredits: Movie[];
  crewCredits: Movie[];

  constructor(
    private route: ActivatedRoute,
    private ms: MoviesService,
  ) {
    const routeId = this.route.snapshot.paramMap.get('id');
    this.personId = -1;
    if (routeId) this.personId = parseInt(routeId);

    this.member = { id: -1, memberName: '' };

    this.castCredits = [];
    this.crewCredits = [];
  }

  ngOnInit() {
    this.memberInfo();
    this.personCredits();
  }

  async memberInfo() {
    this.member = await this.ms.getPersonDetails(this.personId);
  }

  async personCredits() {
    const retrievedData = await this.ms.getPersonCredits(this.personId);
    const { mappedCastMovies, mappedCrewMovies } = retrievedData;

    this.castCredits = mappedCastMovies;
    this.crewCredits = mappedCrewMovies;
  }
}
