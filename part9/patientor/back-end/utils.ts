import { newPatientEntry, gender as Gender } from "./src/types";

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
    if (!value) throw new Error(error);
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
    };
    return newEntry;
};
