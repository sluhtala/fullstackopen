import diagnosesData from "../data/diagnoses.json";
import { diagnosesEntry } from "../types";

const diagnoses: Array<diagnosesEntry> = diagnosesData as Array<diagnosesEntry>;

const getEntries = (): Array<diagnosesEntry> => {
    return diagnoses;
};

const addEntry = () => {
    return null;
};

export default {
    getEntries,
    addEntry,
};
