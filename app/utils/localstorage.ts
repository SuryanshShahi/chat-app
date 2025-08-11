export function getLocalItem<T>(key: string): T | null {
  try {
    if (typeof window !== "undefined") {
      const item = window.localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : null;
    }
    return null;
  } catch (error) {
    console.error(`Error getting localStorage key “${key}”:`, error);
    return null;
  }
}

export function setLocalItem<T>(key: string, value: T): void {
  try {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(key, JSON.stringify(value));
    }
  } catch (error) {
    console.error(`Error setting localStorage key “${key}”:`, error);
  }
}

export function removeLocalItem(key: string): void {
  try {
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(key);
    }
  } catch (error) {
    console.error(`Error removing localStorage key “${key}”:`, error);
  }
}

export function clearLocalStorage(): void {
  try {
    if (typeof window !== "undefined") {
      window.localStorage.clear();
    }
  } catch (error) {
    console.error("Error clearing localStorage:", error);
  }
}
export function clearLocalStorageExcept(keysToKeep: string[]) {
  const savedValues: Record<string, string | null> = {};
  keysToKeep.forEach((key) => {
    savedValues[key] = localStorage.getItem(key);
  });

  localStorage.clear();

  Object.keys(savedValues).forEach((key) => {
    if (savedValues[key] !== null) {
      localStorage.setItem(key, savedValues[key] || "");
    }
  });
}
