import { EntryWithoutId, HealthCheckRating } from "../types";
import { isString, isDate } from "./patientParser";

const assertNever = (value: any): never => {
  throw new Error(`Unhandled entry type: ${JSON.stringify(value)}`);
};

const parseDescription = (description: unknown): string => {
  if (!description || !isString(description))
    throw new Error(`Missing or incorrect description: ${description}`);
  return description;
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date))
    throw new Error(`Missing or incorrect date: ${date}`);
  return date;
};

const parseSpecialist = (specialist: unknown): string => {
  if (!specialist || !isString(specialist))
    throw new Error(`Unhandled or incorrect specialist: ${specialist}`);
  return specialist;
};

const parseBaseEntry = (requestBody: any) => {
  return {
    description: parseDescription(requestBody.description),
    date: parseDate(requestBody.date),
    specialist: parseSpecialist(requestBody.specialist),
  };
};

const parseName = (name: unknown): string => {
  if (!name || !isString(name))
    throw new Error(`Unhandled or incorrect name: ${name}`)
  return name
}

const isHealthCheckRating = (param: any): param is HealthCheckRating => {
  return Object.keys(HealthCheckRating).includes(param);
};

const parseHealthCheckRating = (rating: any): HealthCheckRating => {
  if (!rating || isHealthCheckRating(rating))
    throw new Error(`Unhandled or incorrect HealthCheckRating: ${rating}`);
  return rating === "healthy" ? HealthCheckRating["Healthy"]
    : rating === "LowRisk" ? HealthCheckRating["LowRisk"]
    : rating === "HighRisk" ? HealthCheckRating["HighRisk"]
    : HealthCheckRating["CriticalRisk"]
};

const getEntryFromRequest = (requestBody: any): EntryWithoutId => {
  const baseEntryFields = parseBaseEntry(requestBody);
  switch (requestBody.type) {
    case "Hospital":
      return {
        ...baseEntryFields,
        type: "Hospital",
      };
    case "OccupationalHealthcare":
      return {
        ...baseEntryFields,
        type: "OccupationalHealthcare",
        employerName: parseName(requestBody.employerName)
      };
    case "HealthCheck":
      return {
        ...baseEntryFields,
        type: "HealthCheck",
        healthCheckRating: parseHealthCheckRating(
          requestBody.healthCheckRating
        ),

      };
    default:
      return assertNever(requestBody);
  }
};

export default {
  getEntryFromRequest,
}