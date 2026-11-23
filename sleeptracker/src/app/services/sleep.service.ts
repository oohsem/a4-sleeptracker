import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { SleepData } from '../data/sleep-data';
import { OvernightSleepData } from '../data/overnight-sleep-data';
import { StanfordSleepinessData } from '../data/stanford-sleepiness-data';

@Injectable({
  providedIn: 'root'
})
export class SleepService {
  public static AllSleepData: SleepData[] = [];
  public static AllOvernightData: OvernightSleepData[] = [];
  public static AllSleepinessData: StanfordSleepinessData[] = [];

  private storage: Storage;
  private storageReady: Promise<void>;

  constructor() {
    this.storage = new Storage();
    this.storageReady = this.initializeStorage();
  }

  // Initialize storage and load previously saved records.
  private async initializeStorage(): Promise<void> {
    await this.storage.create();
    await this.loadSleepData();
  }

  // Allow other pages to wait until stored records are loaded.
  public async ready(): Promise<void> {
    await this.storageReady;
  }

  // Load records from local storage.
  private async loadSleepData(): Promise<void> {

    const savedOvernight = await this.storage.get('overnightData');
    const savedSleepiness = await this.storage.get('sleepinessData');

    SleepService.AllOvernightData = [];
    SleepService.AllSleepinessData = [];

    if (Array.isArray(savedOvernight)) {
      for (const entry of savedOvernight) {

        const sleepData = new OvernightSleepData(
          new Date(entry.sleepStart),
          new Date(entry.sleepEnd)
        );

        sleepData.id = entry.id;
        sleepData.loggedAt = new Date(entry.loggedAt);

        SleepService.AllOvernightData.push(sleepData);
      }
    }

    if (Array.isArray(savedSleepiness)) {
      for (const entry of savedSleepiness) {

        const sleepData = new StanfordSleepinessData(
          entry.loggedValue,
          new Date(entry.loggedAt)
        );

        sleepData.id = entry.id;

        SleepService.AllSleepinessData.push(sleepData);
      }
    }

    SleepService.AllSleepData = [
      ...SleepService.AllOvernightData,
      ...SleepService.AllSleepinessData
    ];
  }

  // Save all records to local storage.
  private async saveSleepData(): Promise<void> {

    const overnightData = SleepService.AllOvernightData.map(entry => ({
      id: entry.id,
      loggedAt: entry.loggedAt.toISOString(),
      sleepStart: entry.sleepStartTime.toISOString(),
      sleepEnd: entry.sleepEndTime.toISOString()
    }));

    const sleepinessData = SleepService.AllSleepinessData.map(entry => ({
      id: entry.id,
      loggedAt: entry.loggedAt.toISOString(),
      loggedValue: entry.sleepinessValue
    }));

    await this.storage.set('overnightData', overnightData);
    await this.storage.set('sleepinessData', sleepinessData);
  }

  // Add and save an overnight sleep record.
  public async logOvernightData(
    sleepData: OvernightSleepData
  ): Promise<void> {

    await this.ready();

    SleepService.AllOvernightData.push(sleepData);
    SleepService.AllSleepData.push(sleepData);

    await this.saveSleepData();
  }

  // Add and save a sleepiness record.
	public async logSleepinessData(
		sleepData: StanfordSleepinessData
	): Promise<void> {

		await this.ready();

		SleepService.AllSleepinessData.push(sleepData);
		SleepService.AllSleepData.push(sleepData);

		await this.saveSleepData();
	}


	public async deleteSleepData(id: string): Promise<void> {
	await this.ready();

	// Save the original arrays in case storage fails.
	const previousAll = SleepService.AllSleepData;
	const previousOvernight = SleepService.AllOvernightData;
	const previousSleepiness = SleepService.AllSleepinessData;

	SleepService.AllSleepData =
		SleepService.AllSleepData.filter(entry => entry.id !== id);

	SleepService.AllOvernightData =
		SleepService.AllOvernightData.filter(entry => entry.id !== id);

	SleepService.AllSleepinessData =
		SleepService.AllSleepinessData.filter(entry => entry.id !== id);

	try {
		await this.saveSleepData();
	} catch (error) {
		// Restore the entries if saving fails.
		SleepService.AllSleepData = previousAll;
		SleepService.AllOvernightData = previousOvernight;
		SleepService.AllSleepinessData = previousSleepiness;
		throw error;
	}
	}

}
