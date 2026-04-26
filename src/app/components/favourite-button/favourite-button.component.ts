import { Component, OnInit, input } from '@angular/core';
import { IonButton, IonIcon } from '@ionic/angular/standalone';
import { map, Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { FavouritesService } from 'src/app/services/favourites.service';
import { addIcons } from 'ionicons';
import { heartOutline, heart } from 'ionicons/icons';

@Component({
  selector: 'app-favourite-button',
  templateUrl: './favourite-button.component.html',
  styleUrls: ['./favourite-button.component.scss'],
  imports: [IonButton, IonIcon, AsyncPipe],
})
export class FavouriteButtonComponent implements OnInit {
  btnType = input.required<string>();
  id = input.required<number>();
  title = input.required<string>();
  poster = input.required<string>();
  favorites$ = this.fs.favorites$;
  isFaved: boolean;

  constructor(private fs: FavouritesService) {
    this.isFaved = false;

    addIcons({ heartOutline, heart });
  }

  ngOnInit() {
    this.fs.favorites$.subscribe((faves) => {
      this.isFaved = faves.includes(this.id());
    });
  }

  get isFavorite(): Observable<boolean> {
    return this.fs.favorites$.pipe(
      map((favs: { id: any }[]) =>
        favs.some((m: { id: any }) => m.id === this.id()),
      ),
    );
  }

  toggle() {
    const movie = {
      id: this.id(),
      title: this.title(),
      poster: this.poster(),
    };
    this.fs.toggleFavorite(movie);
  }
}
