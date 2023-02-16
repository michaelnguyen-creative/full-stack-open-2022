import diaryData from "../../data/diaries";
import { DiaryEntry, NonSensitiveEntries, newDiaryEntry } from "../types";

const diaries: Array<DiaryEntry> = diaryData;
const getEntries = (): Array<DiaryEntry> => {
  return diaries;
};
const getNonSensitiveEntries = (): NonSensitiveEntries[] => {
  return diaries.map(({ id, date, weather, visibility }) => ({
    id,
    date,
    weather,
    visibility,
  }));
};

const addDiary = (
  entry: newDiaryEntry
): DiaryEntry => {
  const newDiaryEntry = {
    id: Math.max(...diaries.map((d) => d.id)) + 1,
    ...entry
  };
  diaries.push(newDiaryEntry);
  return newDiaryEntry;
};

const findById = (id: number): DiaryEntry | undefined => {
  const entry = diaries.find((d) => d.id === id);
  return entry;
};

export default {
  getEntries,
  addDiary,
  getNonSensitiveEntries,
  findById,
};
