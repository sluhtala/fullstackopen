import {
    Patient,
    nonSensitivePatientsEntry,
    newPatientEntry,
    Entry,
} from "../types";
import patientsData from "../data/patients";
import { v1 as uuid } from "uuid";

const patients: Array<Patient> = patientsData as Array<Patient>;

const getEntries = (): Patient[] => {
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

const addPatient = (entry: newPatientEntry): Patient => {
    const newPatient = {
        ...entry,
        id: createNewId(),
    };
    patients.push(newPatient);
    return newPatient;
};

const findPatient = (id: string): Patient => {
    const result = patients.find((p) => p.id === id);
    let patient: Patient;
    if (!result) throw new Error(`no patients with this id: ${id}`);
    patient = result;
    return patient;
};

const addEntry = (entry: Entry, id: string): Entry => {
    const patient = findPatient(id);
    patient.entries.push(entry);
    return entry;
};

export default {
    getEntries,
    getNonSensitiveEntries,
    addPatient,
    findPatient,
    addEntry,
};
