export interface diagnosesEntry {
    code: string;
    name: string;
    latin?: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Entry {}

export interface patientsEntry {
    id: string;
    name: string;
    dateOfBirth: string;
    gender: gender;
    occupation: string;
    ssn: string;
    entries: Entry[];
}

export enum gender {
    MALE = "male",
    FEMALE = "female",
    OTHER = "other",
}

export type newPatientEntry = Omit<patientsEntry, "id">;

export type nonSensitivePatientsEntry = Omit<patientsEntry, "ssn" | "entries">;
