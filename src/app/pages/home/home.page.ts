import { Component } from '@angular/core';
import { IonContent, IonButton } from '@ionic/angular/standalone';
import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonButton, IonContent],
})
export class HomePage {
  data: any;

  constructor(private ms: MoviesService) {}

  ngOnInit() {
    this.getData();
  }

  async getData() {
    this.data = await this.ms.getTrendingToday();
    console.log(this.data);
  }
}
