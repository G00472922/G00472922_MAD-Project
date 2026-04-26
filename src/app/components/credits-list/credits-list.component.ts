import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { IonItem, IonLabel, IonThumbnail } from '@ionic/angular/standalone';

@Component({
  selector: 'app-credits-list',
  templateUrl: './credits-list.component.html',
  styleUrls: ['./credits-list.component.scss'],
  imports: [RouterLink, IonItem, IonLabel, IonThumbnail],
})
export class CreditsListComponent {
  id = input.required<number>();
  title = input.required<string>();
  poster = input<string>();
  isLastItem = input.required<boolean>();

  constructor() {}
}
