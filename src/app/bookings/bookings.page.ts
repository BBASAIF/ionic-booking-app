import { Component, OnDestroy, OnInit } from '@angular/core';
import { IonItemSliding } from '@ionic/angular';
import { Subscription } from 'rxjs';

import { Booking } from './booking.model';
import { BookingService } from './booking.service';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.page.html',
  styleUrls: ['./bookings.page.scss'],
})
export class BookingsPage implements OnInit, OnDestroy {
  loadedBookings: Booking[];
  private bookingSub: Subscription;

  constructor(private bookingService: BookingService) { }

  ngOnInit() {
    this.bookingSub = this.bookingService.getBookings().subscribe(bookings => {
      this.loadedBookings = bookings;
    });
  }

  onCancelBooking(offerId: string, slidingEl: IonItemSliding) {
    slidingEl.close();
    //cancel booking with id offerId
  }

  ngOnDestroy() {
    this.bookingSub.unsubscribe();
  }

}
