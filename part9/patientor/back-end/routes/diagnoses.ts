import express from "express";
import diagnosesService from "../src/services/diagnosesService";

const router = express.Router();

router.get("/", (_req, res) => {
    res.status(200).send(diagnosesService.getEntries());
});

router.post("/", (_req, res) => {
    res.send("saving...");
});

export default router;
