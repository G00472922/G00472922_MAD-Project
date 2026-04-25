import { Component, OnInit } from '@angular/core';
import {
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonList,
  IonCard,
  IonCardHeader,
  IonCardTitle,
} from '@ionic/angular/standalone';
import { ActivatedRoute } from '@angular/router';
import { MoviesService } from 'src/app/services/movies.service';
import { DetailsCardComponent } from '../../components/details-card/details-card.component';
import { CreditsListComponent } from 'src/app/components/credits-list/credits-list.component';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
  imports: [
    IonCard,
    IonList,
    IonRow,
    IonGrid,
    IonContent,
    DetailsCardComponent,
    IonCol,
    CreditsListComponent,
    IonCardHeader,
    IonCardTitle,
  ],
})
export class DetailsPage implements OnInit {
  routeId: string | null;
  personId: string;
  personName: string;
  profile: string;
  aka: string[];
  birthday: string;
  deathday: string;
  birthplace: string;
  biography: string;
  castCredits: any;
  crewCredits: any;

  constructor(
    private route: ActivatedRoute,
    private ms: MoviesService,
  ) {
    this.routeId = this.route.snapshot.paramMap.get('id');
    this.personId = '';
    this.personName = '';
    this.profile = '';
    this.aka = [];
    this.birthday = '';
    this.deathday = '';
    this.birthplace = '';
    this.biography = '';
  }

  ngOnInit() {
    this.personInfo();
    this.personCredits();
  }

  async personInfo() {
    if (!this.routeId) return;

    const objDetails = await this.ms.getPersonDetails(this.routeId);

    const {
      id,
      name,
      profile_path,
      also_known_as,
      birthday,
      deathday,
      place_of_birth,
      biography,
    } = objDetails;

    this.personId = id;
    this.personName = name;
    this.profile = profile_path;
    this.aka = also_known_as;
    this.birthday = birthday;
    this.deathday = deathday;
    this.birthplace = place_of_birth;
    this.biography = biography;
  }

  async personCredits() {
    if (!this.routeId) return;

    const objCredits = await this.ms.getPersonCredits(this.routeId);

    const { cast, crew } = objCredits;

    console.log(cast, crew);

    this.castCredits = cast;
    this.crewCredits = crew;
  }
}
