import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Patient, Entry as EntryType } from "../types";
import { apiBaseUrl } from "../constants";
import { useStateValue, addPatientInfo, setDiagnosis } from "../state";
import { Icon, Modal, Button } from "semantic-ui-react";
import Entries from "./Entries";
import NewEntryForm from "./NewEntryForm";
import { EntryFormType } from "./NewEntryForm";
import { updatePatient } from "../state";

const findPatientById = async (id: string): Promise<Patient> => {
    const response = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
    return response.data;
};

const PatientInfo = (): JSX.Element => {
    const [{ patientInfo }, dispatch] = useStateValue();
    const { id } = useParams<{ id: string }>();
    const [patient, setPatient] = useState<Patient | null>(null);
    const [modalOpen, setModalOpen] = useState<boolean>(false);

    useEffect(() => {
        const search = patientInfo.find((p) => p.id === id);
        if (search) setPatient(search);
        else {
            findPatientById(id)
                .then((respond) => {
                    dispatch(addPatientInfo(respond));
                    setPatient(respond);
                })
                .catch((e) => {
                    console.error(e);
                });
        }
    }, [dispatch]);

    useEffect(() => {
        axios
            .get(`${apiBaseUrl}/diagnosis`)
            .then((response) => {
                dispatch(setDiagnosis(response.data));
            })
            .catch((e) => {
                console.error(e);
            });
    }, [dispatch]);

    const isEntryType = (obj: EntryType | undefined): obj is EntryType => {
        if (typeof obj === "undefined") return false;
        else return true;
    };
    const addNewEntry = (data: EntryFormType) => {
        const d = new Date();
        data.date = `${d.getFullYear().toString()}-${d.getDay().toString()}-${d
            .getMonth()
            .toString()}`;
        axios
            .post(`${apiBaseUrl}/patients/${id}/entries`, data)
            .then((response) => {
                if (!response || !isEntryType(response.data)) {
                    throw new Error(`response is not Entry type`);
                    return;
                }
                if (!patient) throw new Error("patient not defined");
                const body = response.data;
                const updatedPatient: Patient = {
                    ...patient,
                    entries: [...patient.entries, body],
                };
                dispatch(updatePatient(updatedPatient));
                setModalOpen(false);
                setPatient(updatedPatient);
                setModalOpen(false);
            })
            .catch((e) => {
                console.log(e);
            });
    };

    if (!patient) return <div>...loading</div>;
    return (
        <div>
            <h2>
                {patient.name}
                <Icon
                    name={
                        patient.gender === "other"
                            ? "genderless"
                            : patient.gender === "male"
                            ? "man"
                            : "woman"
                    }
                />
            </h2>
            <div>ssn: {patient.ssn}</div>
            <div>occupation: {patient.occupation}</div>
            <Entries entries={patient.entries} />
            <Button
                onClick={() => {
                    setModalOpen(true);
                }}>
                New Entry
            </Button>
            <Modal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                closeIcon>
                <Modal.Header>New Health Check Entry</Modal.Header>
                <Modal.Content>
                    <NewEntryForm
                        onSubmit={(data: EntryFormType) => {
                            console.log("submit");
                            addNewEntry(data);
                        }}
                        onCancel={() => {
                            console.log("cancel");
                            setModalOpen(false);
                        }}
                    />
                </Modal.Content>
            </Modal>
        </div>
    );
};

export default PatientInfo;
