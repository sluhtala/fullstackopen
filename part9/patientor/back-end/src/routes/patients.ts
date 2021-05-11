import express from "express";
import patientsService from "../services/patientService";
import { toNewPatientEntry, toNewEntry } from "../utils";

const router = express.Router();

router.get("/", (_req, res) => {
    const patients = patientsService.getNonSensitiveEntries();
    console.log("getting patients");
    res.status(200).send(patients);
});

router.post("/", (req, res) => {
    try {
        const newPatient = toNewPatientEntry(req.body);
        const newPatientEntry = patientsService.addPatient(newPatient);
        res.status(201).json(newPatientEntry);
    } catch (e) {
        if (e instanceof Error) {
            console.log(e.message);
            res.status(400).send({ error: e.message });
        }
    }
});

router.get("/:id", (req, res) => {
    const id: string = req.params.id;
    try {
        const patient = patientsService.findPatient(id);
        res.status(200).json(patient);
    } catch (e) {
        if (e instanceof Error) res.status(400).send({ error: e.message });
    }
});

router.post("/:id/entries", (req, res) => {
    const id = req.params.id;
    console.log("trying to add new entry..");
    try {
        const newEntry = toNewEntry(req.body);
        const entry = patientsService.addEntry(newEntry, id);
        res.status(200).json(entry);
    } catch (e) {
        if (e instanceof Error) res.status(400).send({ error: e.message });
    }
});

export default router;
