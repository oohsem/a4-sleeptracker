
import { Component } from '@angular/core';
import { Router } from '@angular/router';

import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonBackButton,
  IonButton,
  IonDatetime,
  IonDatetimeButton,
  IonModal
} from '@ionic/angular/standalone';

import { SleepService } from '../services/sleep.service';
import { StanfordSleepinessData } from '../data/stanford-sleepiness-data';

@Component({
  selector: 'app-log-sleepiness',
  templateUrl: './log-sleepiness.page.html',
  styleUrls: ['./log-sleepiness.page.scss'],
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButtons,
    IonBackButton,
    IonButton,
    IonDatetime,
    IonDatetimeButton,
    IonModal
  ]
})
export class LogSleepinessPage {

  selectedRating: number = 4;
  loggedAt: string;
  errorMessage: string = '';

  scaleValues = StanfordSleepinessData.ScaleValues;

  constructor(
    private sleepService: SleepService,
    private router: Router
  ) {
    this.loggedAt = this.toLocalISOString(new Date());
  }

  // Format the current date for Ionic's datetime component.
  toLocalISOString(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${year}-${month}-${day}T${hours}:${minutes}:00`;
  }

  // Update the selected sleepiness rating.
  selectRating(rating: number) {
    this.selectedRating = rating;
    this.errorMessage = '';
  }

  // Update the selected date and time.
  updateLoggedAt(value: string | string[] | null | undefined) {
    if (typeof value === 'string') {
      this.loggedAt = value;
      this.errorMessage = '';
    }
  }

  // Save the sleepiness entry.
  saveSleepiness() {
    const date = new Date(this.loggedAt);

    if (!Number.isFinite(date.getTime())) {
      this.errorMessage = 'Please select a valid date and time.';
      return;
    }

    if (date.getTime() > Date.now()) {
      this.errorMessage = 'You cannot log sleepiness in the future.';
      return;
    }

    if (this.selectedRating < 1 || this.selectedRating > 7) {
      this.errorMessage = 'Please select a rating between 1 and 7.';
      return;
    }

    const sleepinessData = new StanfordSleepinessData(
      this.selectedRating,
      date
    );

    this.sleepService.logSleepinessData(sleepinessData);

    this.errorMessage = '';

    // Return to the dashboard.
    this.router.navigateByUrl('/home');
  }
}
