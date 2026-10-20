import { Service } from '@angular/core';
import { Preferences } from '@capacitor/preferences';

@Service()
export class UserPreferencesService {
  async get(key: string): Promise<string | null> {
    const { value } = await Preferences.get({ key: key });
    return value;
  }

  async set(key: string, value: string): Promise<void> {
    await Preferences.set({
      key: key,
      value: value,
    });
  }

  async remove(key: string): Promise<void> {
    await Preferences.remove({ key: key });
  }
}
