import { Component, OnInit, input } from '@angular/core';
import { IonItem, IonLabel, IonThumbnail } from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-credits-list',
  templateUrl: './credits-list.component.html',
  styleUrls: ['./credits-list.component.scss'],
  imports: [IonItem, IonLabel, IonThumbnail, RouterLink],
})
export class CreditsListComponent implements OnInit {
  id = input.required<string>();
  title = input.required<string>();
  poster = input.required<string>();
  isLastItem = input.required<boolean>();

  constructor() {}

  ngOnInit() {}
}
