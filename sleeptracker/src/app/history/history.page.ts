
import { Component } from '@angular/core';

import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonBackButton,
  IonSegment,
  IonSegmentButton,
  IonLabel
} from '@ionic/angular/standalone';

import { SleepService } from '../services/sleep.service';
import { SleepData } from '../data/sleep-data';
import { OvernightSleepData } from '../data/overnight-sleep-data';
import { StanfordSleepinessData } from '../data/stanford-sleepiness-data';

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButtons,
    IonBackButton,
    IonSegment,
    IonSegmentButton,
    IonLabel
  ]
})
export class HistoryPage {

  selectedFilter: string = 'all';

  constructor(public sleepService: SleepService) {}

  // Return entries based on the selected filter.
  get filteredSleepData(): SleepData[] {
    let entries: SleepData[] = [];

    if (this.selectedFilter === 'overnight') {
      entries = SleepService.AllOvernightData;
    } else if (this.selectedFilter === 'sleepiness') {
      entries = SleepService.AllSleepinessData;
    } else {
      entries = SleepService.AllSleepData;
    }

    // Sort by the date the entry was recorded.
    return [...entries].sort((a, b) => {
      return b.loggedAt.getTime() - a.loggedAt.getTime();
    });
  }

  // Change the selected history filter.
  changeFilter(value: string | number | undefined) {
    if (typeof value === 'string') {
      this.selectedFilter = value;
    }
  }

  isOvernightSleep(entry: SleepData): boolean {
    return entry instanceof OvernightSleepData;
  }

  isSleepiness(entry: SleepData): boolean {
    return entry instanceof StanfordSleepinessData;
  }

  // Format the timestamp for the history list.
  formatTime(date: Date): string {
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit'
    });
  }

  // Format the date for the history list.
  formatDate(date: Date): string {
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  }

  // Get bedtime for overnight sleep entries.
  getBedtime(entry: SleepData): string {
    if (entry instanceof OvernightSleepData) {
      return this.formatTime(entry.sleepStartTime);
    }

    return '';
  }

  // Get wake-up time for overnight sleep entries.
  getWakeTime(entry: SleepData): string {
    if (entry instanceof OvernightSleepData) {
      return this.formatTime(entry.sleepEndTime);
    }

    return '';
  }
}
