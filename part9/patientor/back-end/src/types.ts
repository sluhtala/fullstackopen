export interface diagnosesEntry {
    code: string;
    name: string;
    latin?: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface EntryBase {
    id: string;
    date: string;
    specialist: string;
    diagnosisCodes?: string[];
    description: string;
}

interface HospitalEntry extends EntryBase {
    type: "Hospital";
    discharge: { date: string; criteria: string };
}

interface OccupationalHealthcareEntry extends EntryBase {
    type: "OccupationalHealthcare";
    employerName: string;
    sickLeave?: { startDate: string; endDate: string };
}

interface HealthCheckEntry extends EntryBase {
    type: "HealthCheck";
    healthCheckRating: number;
}

export type Entry =
    | HospitalEntry
    | OccupationalHealthcareEntry
    | HealthCheckEntry;

export interface Patient {
    id: string;
    name: string;
    dateOfBirth: string;
    gender: Gender;
    occupation: string;
    ssn: string;
    entries: Entry[];
}

export enum Gender {
    Male = "male",
    Female = "female",
    Other = "other",
}

export type newPatientEntry = Omit<Patient, "id">;

export type nonSensitivePatientsEntry = Omit<Patient, "ssn" | "entries">;
