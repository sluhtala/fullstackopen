import React, { useState } from "react";
import { Button } from "semantic-ui-react";
import {
    HealthCheckForm,
    HospitalForm,
    OccupationalHealthcareForm,
} from "./EntryForms";

import {
    HealthCheckEntry,
    HospitalEntry,
    OccupationalHealthcareEntry,
} from "../types";

export type EntryFormType =
    | Omit<HealthCheckEntry, "id">
    | Omit<HospitalEntry, "id">
    | Omit<OccupationalHealthcareEntry, "id">;

interface Props {
    onSubmit: (data: EntryFormType) => void;
    onCancel: () => void;
}

const NewEntryForm = ({ onSubmit, onCancel }: Props) => {
    const [selectedForm, setSelectedForm] = useState<number>(1);

    return (
        <div>
            <Button.Group>
                <Button
                    active={selectedForm === 1}
                    type="button"
                    onClick={() => {
                        setSelectedForm(1);
                    }}>
                    Health Check
                </Button>
                <Button
                    active={selectedForm === 2}
                    type="button"
                    onClick={() => {
                        setSelectedForm(2);
                    }}>
                    Hospital
                </Button>
                <Button
                    active={selectedForm === 3}
                    type="button"
                    onClick={() => {
                        setSelectedForm(3);
                    }}>
                    Occupational Healthcare
                </Button>
            </Button.Group>
            <HealthCheckForm
                show={selectedForm === 1}
                onCancel={onCancel}
                onSubmit={onSubmit}
            />
            <HospitalForm
                show={selectedForm === 2}
                onCancel={onCancel}
                onSubmit={onSubmit}
            />
            <OccupationalHealthcareForm
                show={selectedForm === 3}
                onCancel={onCancel}
                onSubmit={onSubmit}
            />
        </div>
    );
};

export default NewEntryForm;
