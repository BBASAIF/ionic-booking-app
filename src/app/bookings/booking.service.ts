import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { take, tap, delay } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { Booking } from './booking.model';

@Injectable({ providedIn: 'root' })
export class BookingService {
  private bookings = new BehaviorSubject<Booking[]>([]);

  constructor(private authService: AuthService) {}

  getBookings() {
    return this.bookings.asObservable();
  }

  addBooking(
    placeId: string,
    placeTitle: string,
    placeImage: string,
    firstName: string,
    lastName: string,
    guestNumber: number,
    dateFrom: Date,
    dateTo: Date
  ) {
    const newBooking = new Booking(
      Math.random().toString(),
      placeId,
      this.authService.getUserId(),
      placeTitle,
      placeImage,
      firstName,
      lastName,
      guestNumber,
      dateFrom,
      dateTo
    );
    return this.bookings.pipe(
      take(1),
      delay(1500),
      tap((bookings) => {
        this.bookings.next(bookings.concat(newBooking));
      })
    );
  }

  cancelBooking(bookingId: string) {}
}
