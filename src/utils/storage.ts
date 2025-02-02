import { ObjectWithId } from '../types/common';

class LocalStorageUtil {
  getObject<T>(key: string) {
    const itemString = localStorage.getItem(key);
    if (!itemString) {
      return;
    }
    return JSON.parse(itemString) as T;
  }

  setArray<T>(key: string, item: T[]) {
    localStorage.setItem(key, JSON.stringify(item));
  }

  addObject<T>(key: string, item: T) {
    const existingItem = this.getObject<T[]>(key) || [];
    existingItem.push(item);
    this.setArray(key, existingItem);
  }

  updateObject<T extends ObjectWithId>(key: string, itemId: string, update: Partial<T>) {
    const existingItems = this.getObject<T[]>(key) || [];
    const existingItem = existingItems.find((item) => item.id === itemId);
    if (!existingItem) {
      throw new Error(`Item with id ${itemId} does not exist!`);
    }

    const existingItemIndex = existingItems.indexOf(existingItem);
    existingItems[existingItemIndex] = {
      ...existingItem,
      ...update,
    };

    this.setArray(key, existingItems);

    return existingItems[existingItemIndex];
  }
}

export const localStorageUtil = new LocalStorageUtil();