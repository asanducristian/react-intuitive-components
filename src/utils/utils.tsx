export function timeout(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  
  export function getString(key: string): string {
    return localStorage.getItem(key) || '';
  }
  
  export function setString(key: string, value: string): void {
    localStorage.setItem(key, value);
  }
  
  export function getLanguage(): string {
    return localStorage.getItem('sandu:language') || 'en';
  }
  
  export function setLanguage(language: string): void {
    localStorage.setItem('sandu:language', language);
  }
  
  export function getRandomInt(max: number): number {
    return Math.floor(Math.random() * max);
  }
  
  export function getRandomArbitrary(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min) + min);
  }
  
  export function getFormattedBirthdate(date: Date): string {
    return `${('0' + date.getDate()).slice(-2)}.${('0' + (date.getMonth() + 1)).slice(-2)}.${date.getFullYear()}`;
  }
  
  export function isValidDate(date: unknown): boolean {
    return date instanceof Date && !isNaN(date.getTime());
  }
  
  export function shuffle<T>(array: T[]): T[] {
    let currentIndex = array.length;
    let randomIndex: number;
  
    while (currentIndex > 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }

  export const formatSelectedDate = (selectedDate: Date, dateFormat: 'normal' | 'retarded'): string => {
    const day = selectedDate.getDate().toString().padStart(2, '0');
    const month = (selectedDate.getMonth() + 1).toString().padStart(2, '0');
    const year = selectedDate.getFullYear();

    return dateFormat === 'normal'
        ? `${day}.${month}.${year}`
        : `${month}.${day}.${year}`;
};