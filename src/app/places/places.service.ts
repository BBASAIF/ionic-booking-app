import { Injectable } from '@angular/core';
import { Place } from './place.model';

@Injectable({
  providedIn: 'root',
})
export class PlacesService {
  private placesArray: Place[] = [
    new Place(
      'p1',
      'Manhattan Mansion',
      'In the heart of New York City.',
      'https://imgs.6sqft.com/wp-content/uploads/2014/06/21042534/Felix_Warburg_Mansion_007.jpg',
      149.99
    ),
    new Place(
      'p2',
      'Malibu Beach House',
      'A night with the Stars.',
      'https://i.pinimg.com/originals/61/0e/87/610e87b0783cd8dfa511f567cfc1b31e.jpg',
      249.99
    ),
    new Place(
      'p3',
      'Beverly Hills Mansion',
      'A Luxuries night up the Mountain.',
      'https://homesoftherich.net/wp-content/uploads/2021/03/Screen-Shot-2021-03-18-at-11.04.11-AM.png',
      189.99
    ),
  ];

  constructor() {}

  get places() {
    return [...this.placesArray];
  }

  getPlace(id: string){
    return {...this.placesArray.find(p => p.id === id)};

  }
}
