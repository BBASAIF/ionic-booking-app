import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { take, map, tap, delay } from 'rxjs/operators';

import { AuthService } from '../auth/auth.service';
import { Place } from './place.model';

@Injectable({
  providedIn: 'root',
})
export class PlacesService {
  private placesArray = new BehaviorSubject<Place[]>([
    new Place(
      'p1',
      'Manhattan Mansion',
      'In the heart of New York City.',
      'https://imgs.6sqft.com/wp-content/uploads/2014/06/21042534/Felix_Warburg_Mansion_007.jpg',
      149.99,
      new Date('2021-01-01'),
      new Date('2022-12-31'),
      'usr1'
    ),
    new Place(
      'p2',
      'Malibu Beach House',
      'A night with the Stars.',
      'https://i.pinimg.com/originals/61/0e/87/610e87b0783cd8dfa511f567cfc1b31e.jpg',
      249.99,
      new Date('2021-05-01'),
      new Date('2022-12-31'),
      'usr1'
    ),
    new Place(
      'p3',
      'Beverly Hills Mansion',
      'A Luxuries night up the Mountain.',
      'https://homesoftherich.net/wp-content/uploads/2021/03/Screen-Shot-2021-03-18-at-11.04.11-AM.png',
      189.99,
      new Date('2021-09-01'),
      new Date('2022-12-31'),
      'usr2'
    ),
  ]);

  constructor(private authService: AuthService) {}

  get places() {
    return this.placesArray.asObservable();
  }

  getPlace(id: string) {
    return this.placesArray.pipe(
      take(1),
      map((placess) => ({ ...placess.find((p) => p.id === id) }))
    );
  }

  addPlace(
    title: string,
    description: string,
    price: number,
    dateFrom: Date,
    dateTo: Date
  ) {
    const newPlace = new Place(
      Math.random().toString(),
      title,
      description,
      'https://cdn3.dpmag.com/2021/07/Landscape-Tips-Mike-Mezeul-II.jpg',
      price,
      dateFrom,
      dateTo,
      this.authService.getUserId()
    );
    return this.placesArray.pipe(
      take(1),
      delay(1500),
      tap((places) => {
        this.placesArray.next(places.concat(newPlace));
      })
    );
  }

  updatePlace(placeId: string, title: string, description: string) {
    return this.places.pipe(
      take(1),
      delay(1500),
      tap((places) => {
        const updatedPlaceIndex = places.findIndex((pl) => pl.id === placeId);
        const updatedPlaces = [...places];
        const oldPlace = updatedPlaces[updatedPlaceIndex];
        updatedPlaces[updatedPlaceIndex] = new Place(
          oldPlace.id,
          title,
          description,
          oldPlace.imageUrl,
          oldPlace.price,
          oldPlace.availableFrom,
          oldPlace.availableTo,
          oldPlace.userId
        );
        this.placesArray.next(updatedPlaces);
      })
    );
  }
}
