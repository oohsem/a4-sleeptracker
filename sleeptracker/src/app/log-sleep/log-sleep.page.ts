
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonBackButton,
  IonButtons,
  IonDatetime,
  IonDatetimeButton,
  IonModal
} from '@ionic/angular/standalone';

import { SleepService } from '../services/sleep.service';
import { OvernightSleepData } from '../data/overnight-sleep-data';

@Component({
  selector: 'app-log-sleep',
  templateUrl: './log-sleep.page.html',
  styleUrls: ['./log-sleep.page.scss'],
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButton,
    IonBackButton,
    IonButtons,
    IonDatetime,
    IonDatetimeButton,
    IonModal
  ]
})
export class LogSleepPage {

  bedtime: string;
  wakeTime: string;
  errorMessage: string = '';

  constructor(
    private sleepService: SleepService,
    private router: Router
  ) {
    // Default to 11 PM yesterday and 7 AM today.
    const now = new Date();

    const bed = new Date(now);
    bed.setDate(bed.getDate() - 1);
    bed.setHours(23, 0, 0, 0);

    const wake = new Date(bed);
    wake.setDate(wake.getDate() + 1);
    wake.setHours(7, 0, 0, 0);

    this.bedtime = this.toLocalISOString(bed);
    this.wakeTime = this.toLocalISOString(wake);
  }

  // Format a local date for the Ionic date picker.
  toLocalISOString(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${year}-${month}-${day}T${hours}:${minutes}:00`;
  }

  // Update bedtime when the user selects a new value.
  updateBedtime(value: string | string[] | null | undefined) {
    if (typeof value === 'string') {
      this.bedtime = value;
      this.errorMessage = '';
    }
  }

  // Update wake-up time.
  updateWakeTime(value: string | string[] | null | undefined) {
    if (typeof value === 'string') {
      this.wakeTime = value;
      this.errorMessage = '';
    }
  }

  // Calculate the sleep duration in minutes.
  get durationMinutes(): number {
    const start = new Date(this.bedtime);
    const end = new Date(this.wakeTime);

    return Math.floor((end.getTime() - start.getTime()) / 60000);
  }

  // Display a readable duration.
  get durationString(): string {
    const minutes = this.durationMinutes;

    if (!Number.isFinite(minutes) || minutes <= 0) {
      return '--';
    }

    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    return `${hours}h ${remainingMinutes}m`;
  }

  // Save the overnight sleep record.
  saveSleep() {
    const start = new Date(this.bedtime);
    const end = new Date(this.wakeTime);

    if (
      !Number.isFinite(start.getTime()) ||
      !Number.isFinite(end.getTime())
    ) {
      this.errorMessage = 'Please select valid dates and times.';
      return;
    }

    if (end <= start) {
      this.errorMessage = 'Wake-up time must be after bedtime.';
      return;
    }

    if (end.getTime() > Date.now()) {
      this.errorMessage = 'Wake-up time cannot be in the future.';
      return;
    }

    // Prevent accidentally recording more than 24 hours.
    if (this.durationMinutes > 24 * 60) {
      this.errorMessage = 'Sleep duration cannot exceed 24 hours.';
      return;
    }

    const sleepData = new OvernightSleepData(start, end);

    this.sleepService.logOvernightData(sleepData);

    this.errorMessage = '';

    // Return to the dashboard after saving.
    this.router.navigateByUrl('/home');
  }
}
