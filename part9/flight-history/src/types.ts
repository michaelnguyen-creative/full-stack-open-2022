export enum Weather {
  Sunny = "sunny",
  Rainny = "rainy",
  Cloudy = "cloudy",
  Stormy = "stormy",
  Windy = "windy",
}

export enum Visibility {
  Great = "great",
  Good = "good",
  Ok = "ok",
  Poor = "poor",
}

export interface DiaryEntry {
  id: number;
  date: string;
  weather: Weather;
  visibility: Visibility;
  comment?: string;
}

export type newDiaryEntry = Omit<DiaryEntry, "id">;

export type NonSensitiveEntries = Omit<DiaryEntry, "comment">;
