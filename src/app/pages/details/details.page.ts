import { Component, OnInit } from '@angular/core';
import { IonContent, IonButton } from '@ionic/angular/standalone';
import { ActivatedRoute } from '@angular/router';
import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
  imports: [IonButton, IonContent],
})
export class DetailsPage implements OnInit {
  routeId: string | null;
  personData: any;
  personCredits: any;

  constructor(
    private route: ActivatedRoute,
    private ms: MoviesService,
  ) {
    this.routeId = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    this.personInfo();
  }

  async personInfo() {
    if (!this.routeId) return;

    this.personData = await this.ms.getPersonDetails(this.routeId);
    this.personCredits = await this.ms.getPersonCredits(this.routeId);

    // console.log(this.personData);
    // console.log(this.personCredits);
  }
}
