import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

import {
  IonCard,
  IonCardContent,
  IonLabel,
  IonThumbnail,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-short-person-card',
  templateUrl: './short-person-card.component.html',
  styleUrls: ['./short-person-card.component.scss'],
  imports: [RouterLink, IonCardContent, IonCard, IonLabel, IonThumbnail],
})
export class ShortPersonCardComponent {
  id = input.required<number>();
  name = input.required<string>();
  role = input<string>();
  profile = input<string | null>();

  constructor() {}
}
