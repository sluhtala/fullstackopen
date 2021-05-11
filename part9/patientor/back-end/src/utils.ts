import { newPatientEntry, Gender, Entry } from "./types";
import { v1 as uuid } from "uuid";
import { diagnosesEntry as Diagnosis } from "./types";

type ruleType = (value: unknown) => boolean;

//eslint-disable-next-line @typescript-eslint/no-explicit-any
const isString = (value: unknown): value is string => {
    return typeof value === "string" || value instanceof String;
};

//eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (value: any): value is Gender => {
    return Object.values(Gender).includes(value);
};

const isDate = (value: string): boolean => {
    return Boolean(Date.parse(value));
};

const parser = <T>(value: unknown, rule: ruleType, error: string): T => {
    if (!rule(value)) {
        throw new Error(error);
    }
    return value as T;
};

type Fields = {
    name: unknown;
    dateOfBirth: unknown;
    gender: unknown;
    occupation: unknown;
    ssn: unknown;
};

export const toNewPatientEntry = ({
    name,
    dateOfBirth,
    gender,
    occupation,
    ssn,
}: Fields): newPatientEntry => {
    const newEntry: newPatientEntry = {
        name: parser<string>(
            name,
            (val) => isString(val),
            "incorrect or missing name"
        ),
        dateOfBirth: parser<string>(
            dateOfBirth,
            (val) => isString(val) && isDate(val),
            "incorrect or missing date of birth"
        ),
        gender: parser<Gender>(
            gender,
            (val) => isString(val) && isGender(val),
            "incorrect or missing gender"
        ),
        occupation: parser<string>(
            occupation,
            (val) => isString(val),
            "incorrect or missing occupation"
        ),
        ssn: parser<string>(
            ssn,
            (val) => isString(val),
            "incorrect or missing sosial security number"
        ),
        entries: [],
    };
    return newEntry;
};

type EntryFields = {
    date: string;
    specialist: string;
    description: string;
    diagnosisCodes?: Array<Diagnosis["code"]>;
    type: "Hospital" | "HealthCheck" | "OccupationalHealthcare";
    healthCheckRating: number;
    discharge: { date: string; criteria: string };
    employerName: string;
    sickLeave: { startDate: string; endDate: string };
};

export const toNewEntry = ({
    date,
    specialist,
    description,
    type,
    diagnosisCodes,
    discharge,
    sickLeave,
    healthCheckRating,
    employerName,
}: EntryFields): Entry => {
    const newEntryBase = {
        id: uuid(),
        date: parser<string>(
            date,
            (val) => isString(val),
            "incorrect or missing date"
        ),
        specialist: parser<string>(
            specialist,
            (val) => isString(val),
            "incorrect or missing specialist"
        ),
        description: parser<string>(
            description,
            (val) => isString(val),
            "incorrect or missing description"
        ),
        diagnosisCodes: diagnosisCodes,
    };
    let newEntry: Entry;
    switch (type) {
        case "Hospital":
            newEntry = {
                ...newEntryBase,
                type: parser<"Hospital">(
                    type,
                    (val) => isString(val),
                    "incorrect or missing type"
                ),
                discharge: discharge,
            };
            return newEntry;
        case "OccupationalHealthcare":
            newEntry = {
                type: parser<"OccupationalHealthcare">(
                    type,
                    (val) => isString(val),
                    "incorrect or missing type"
                ),
                ...newEntryBase,
                sickLeave: sickLeave,
                employerName: employerName,
            };
            return newEntry;
        case "HealthCheck":
            newEntry = {
                type: parser<"HealthCheck">(
                    type,
                    (val) => isString(val),
                    "incorrect or missing type"
                ),
                ...newEntryBase,
                healthCheckRating: healthCheckRating,
            };
            return newEntry;
        default:
            throw new Error(`error never: ${JSON.stringify(newEntryBase)}`);
    }
};
