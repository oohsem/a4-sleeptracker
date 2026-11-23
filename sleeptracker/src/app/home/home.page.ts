import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import { SleepService } from '../services/sleep.service';
import { SleepData } from '../data/sleep-data';
import { OvernightSleepData } from '../data/overnight-sleep-data';
import { StanfordSleepinessData } from '../data/stanford-sleepiness-data';
import { RouterLink } from "@angular/router";
import { IonButton } from '@ionic/angular/standalone';
import { IonToast } from '@ionic/angular/standalone';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, RouterLink, IonButton, IonToast],
})
export class HomePage {

  constructor(
    public sleepService: SleepService,
    private router: Router
  ) {}

  // Get the latest overnight sleep entry.

  get latestOvernightData(): OvernightSleepData | undefined {
    return [...SleepService.AllOvernightData]
      .sort((a, b) =>
        b.loggedAt.getTime() - a.loggedAt.getTime()
      )[0];
  }

  get latestSleepinessData(): StanfordSleepinessData | undefined {
    return [...SleepService.AllSleepinessData]
      .sort((a, b) =>
        b.loggedAt.getTime() - a.loggedAt.getTime()
      )[0];
  }

  get recentSleepData(): SleepData[] {
    return [...SleepService.AllSleepData]
      .sort((a, b) =>
        b.loggedAt.getTime() - a.loggedAt.getTime()
      )
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

  isLoading: boolean = true;

  async ngOnInit() {
    try {
      await this.sleepService.ready();
    } catch (error) {
      console.error('Unable to load sleep records:', error);
    } finally {
      this.isLoading = false;
    }
  }

  toastOpen: boolean = false;
  toastMessage: string = '';

  showToast(message: string) {
    this.toastMessage = message;
    this.toastOpen = true;
  }

  ionViewWillEnter() {
  const message = history.state?.successMessage;

  if (typeof message === 'string') {
    this.showToast(message);

    // Prevent the message from appearing again after refresh.
    window.history.replaceState(
      {},
      '',
      this.router.url
    );
  }
}
}
