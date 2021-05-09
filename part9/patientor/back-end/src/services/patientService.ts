import {
    patientsEntry,
    nonSensitivePatientsEntry,
    newPatientEntry,
} from "../types";
import patientsData from "../../data/patients.json";
import { v1 as uuid } from "uuid";

const patients: Array<patientsEntry> = patientsData as Array<patientsEntry>;

const getEntries = (): patientsEntry[] => {
    return patients;
};

const getNonSensitiveEntries = (): nonSensitivePatientsEntry[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
    }));
};

const createNewId = (): string => {
    const id = uuid();
    return id;
};

const addPatient = (entry: newPatientEntry): patientsEntry => {
    const newPatient = {
        ...entry,
        id: createNewId(),
    };
    patients.push(newPatient);
    return newPatient;
};

export default { getEntries, getNonSensitiveEntries, addPatient };
