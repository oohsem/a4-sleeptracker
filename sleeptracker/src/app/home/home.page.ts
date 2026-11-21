import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import { SleepService } from '../services/sleep.service';
import { SleepData } from '../data/sleep-data';
import { OvernightSleepData } from '../data/overnight-sleep-data';
import { StanfordSleepinessData } from '../data/stanford-sleepiness-data';
import { RouterLink } from "@angular/router";
import { IonButton } from '@ionic/angular/standalone';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, RouterLink, IonButton],
})
export class HomePage {

  constructor(public sleepService: SleepService) {}

  // Get the latest overnight sleep entry.
  get latestOvernightData(): OvernightSleepData | undefined {
    const allOvernightData = SleepService.AllOvernightData;

    if (allOvernightData.length === 0) {
      return undefined;
    }

    return allOvernightData[allOvernightData.length - 1];
  }

  // Get the latest sleepiness entry.
  get latestSleepinessData(): StanfordSleepinessData | undefined {
    const allSleepinessData = SleepService.AllSleepinessData;

    if (allSleepinessData.length === 0) {
      return undefined;
    }

    return allSleepinessData[allSleepinessData.length - 1];
  }

  // Get the five most recent entries, regardless of type.
  get recentSleepData(): SleepData[] {
    return [...SleepService.AllSleepData]
      .reverse()
      .slice(0, 5);
  }

  // Determine whether an entry is overnight sleep.
  isOvernightSleep(entry: SleepData): boolean {
    return entry instanceof OvernightSleepData;
  }

  // Determine whether an entry is a sleepiness rating.
  isSleepiness(entry: SleepData): boolean {
    return entry instanceof StanfordSleepinessData;
  }

  // Display a greeting based on the current time.
  get greeting(): string {
    const currentHour = new Date().getHours();

    if (currentHour < 12) {
      return 'Good morning';
    } else if (currentHour < 18) {
      return 'Good afternoon';
    } else {
      return 'Good evening';
    }
  }
}
