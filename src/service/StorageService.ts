import type { StorageKey } from "./Storage";

export class StorageService {
  /**
   * Saves any data to a specific key
   */
  static save<T>(key: StorageKey, data: T): void {
    try {
      const serializedData = JSON.stringify(data);
      localStorage.setItem(key, serializedData);
    } catch (error) {
      console.error(`Error saving to LocalStorage (${key}):`, error);
    }
  }

  /**
   * Retrieves data and parses it back to the original type
   */
  static get<T>(key: StorageKey): T | null {
    try {
      const data = localStorage.getItem(key);
      return data ? (JSON.parse(data) as T) : null;
    } catch (error) {
      console.error(`Error reading from LocalStorage (${key}):`, error);
      return null;
    }
  }

  /**
   * Removes a specific item
   */
  static remove(key: StorageKey): void {
    localStorage.removeItem(key);
  }

  /**
   * Clears all Quatara related data (safe clear)
   */
  static clearQuataraData(): void {
    const keys: StorageKey[] = ['quatara_current_project', 'quatara_settings', 'quatara_history'];
    keys.forEach(key => localStorage.removeItem(key));
  }
}