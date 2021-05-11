import React from "react";
import { Formik, Form, Field } from "formik";
import { useStateValue } from "../state";
import {
    DiagnosisSelection,
    NumberField,
    TextField,
} from "../AddPatientModal/FormField";
import {
    HealthCheckEntry,
    HospitalEntry,
    OccupationalHealthcareEntry,
} from "../types";
import { Button, Grid } from "semantic-ui-react";

export type EntryFormType =
    | Omit<HealthCheckEntry, "id">
    | Omit<HospitalEntry, "id">
    | Omit<OccupationalHealthcareEntry, "id">;

interface Props {
    onSubmit: (data: EntryFormType) => void;
    onCancel: () => void;
}

type hospital = "Hospital";
type occupationalHealthcare = "OccupationalHealthcare";
type healthCheck = "HealthCheck";

const initialValues = {
    base: {
        date: "",
        specialist: "",
        description: "",
    },
    healthCheck: {
        type: "HealthCheck" as healthCheck,
        healthCheckRating: 0,
    },
    hospital: {
        type: "Hospital" as hospital,
        discharge: {
            date: "",
            criteria: "",
        },
    },
    occupationalHealthcare: {
        type: "OccupationalHealthcare" as occupationalHealthcare,
        employerName: "",
        sickLeave: {
            startDate: "",
            endDate: "",
        },
    },
};

const initialValuesHealthCheck = {
    ...initialValues.base,
    ...initialValues.healthCheck,
};
const initialValuesHospital = {
    ...initialValues.base,
    ...initialValues.hospital,
};
const initialValuesOccupationalHealthcare = {
    ...initialValues.base,
    ...initialValues.occupationalHealthcare,
};

type setFieldValueType = (
    field: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    value: any,
    shouldValidate?: boolean | undefined
) => void;
type setFieldTouchedValue = (
    field: string,
    isTouched?: boolean | undefined,
    shouldValidate?: boolean | undefined
) => void;

export const BaseForm = ({
    setFieldValue,
    setFieldTouched,
}: {
    setFieldValue: setFieldTouchedValue;
    setFieldTouched: setFieldValueType;
}) => {
    const [{ diagnosis }] = useStateValue();
    return (
        <>
            <DiagnosisSelection
                setFieldValue={setFieldValue}
                setFieldTouched={setFieldTouched}
                diagnoses={diagnosis}
            />
            <Field
                label="Specialist"
                placeholder="Specialist"
                name="specialist"
                component={TextField}
            />
            <Field
                label="Description"
                placeholder="Description"
                name="description"
                component={TextField}
            />
        </>
    );
};

interface FormType extends Props {
    show: boolean;
}

export const HealthCheckForm = ({ show, onSubmit, onCancel }: FormType) => {
    if (!show) return null;
    return (
        <Formik
            initialValues={initialValuesHealthCheck}
            onSubmit={onSubmit}
            validate={(values) => {
                const requiredError = "Field is required";
                const errors: { [field: string]: string } = {};
                if (!values.description) errors.description = requiredError;
                if (!values.specialist) errors.specialist = requiredError;
                return errors;
            }}>
            {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
                return (
                    <div>
                        <Form className="form ui">
                            <BaseForm
                                setFieldTouched={setFieldTouched}
                                setFieldValue={setFieldValue}
                            />
                            <Field
                                label="Health Check Rating"
                                placeholder="Health Check Rating"
                                name="healthCheckRating"
                                component={NumberField}
                                min={0}
                                max={3}
                            />
                            <Grid>
                                <Grid.Column floated="left" width={5}>
                                    <Button onClick={onCancel} color="red">
                                        cancel
                                    </Button>
                                </Grid.Column>
                                <Grid.Column floated="right" width={5}>
                                    <Button
                                        type="submit"
                                        disabled={!isValid || !dirty}
                                        color="green"
                                        floated="right">
                                        submit
                                    </Button>
                                </Grid.Column>
                            </Grid>
                        </Form>
                    </div>
                );
            }}
        </Formik>
    );
};

export const HospitalForm = ({ show, onCancel, onSubmit }: FormType) => {
    if (!show) return null;

    return (
        <Formik
            initialValues={initialValuesHospital}
            onSubmit={onSubmit}
            validate={(values) => {
                const requiredError = "Field is required";
                const errors: {
                    [field: string]: string | { [field: string]: string };
                } = {};
                if (!values.description) errors.description = requiredError;
                if (!values.specialist) errors.specialist = requiredError;
                if (values.type === "Hospital") {
                    if (!values.discharge.date) {
                        errors.discharge = {};
                        errors.discharge.date = requiredError;
                    }
                    if (!values.discharge.criteria) {
                        errors.discharge = {};
                        errors.discharge.criteria = requiredError;
                    }
                }
                return errors;
            }}>
            {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
                return (
                    <div>
                        <Form className="form ui">
                            <BaseForm
                                setFieldTouched={setFieldTouched}
                                setFieldValue={setFieldValue}
                            />
                            <Grid>
                                <Grid.Row columns={2}>
                                    <Grid.Column>
                                        <Field
                                            label="Discharge date"
                                            placeholder="Discharge date"
                                            name="discharge.date"
                                            component={TextField}
                                        />
                                    </Grid.Column>
                                    <Grid.Column>
                                        <Field
                                            label="Discharge criteria"
                                            placeholder="Discharge criteria"
                                            name="discharge.criteria"
                                            component={TextField}
                                        />
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                            <Grid>
                                <Grid.Column floated="left" width={5}>
                                    <Button onClick={onCancel} color="red">
                                        cancel
                                    </Button>
                                </Grid.Column>
                                <Grid.Column floated="right" width={5}>
                                    <Button
                                        type="submit"
                                        disabled={!isValid || !dirty}
                                        color="green"
                                        floated="right">
                                        submit
                                    </Button>
                                </Grid.Column>
                            </Grid>
                        </Form>
                    </div>
                );
            }}
        </Formik>
    );
};

export const OccupationalHealthcareForm = ({
    show,
    onSubmit,
    onCancel,
}: FormType) => {
    if (!show) return null;

    return (
        <Formik
            initialValues={initialValuesOccupationalHealthcare}
            onSubmit={onSubmit}
            validate={(values) => {
                const requiredError = "Field is required";
                const errors: { [field: string]: string } = {};
                if (!values.description) errors.description = requiredError;
                if (!values.specialist) errors.specialist = requiredError;
                if (values.type === "OccupationalHealthcare") {
                    if (!values.employerName)
                        errors.employerName = requiredError;
                }
                return errors;
            }}>
            {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
                return (
                    <div>
                        <Form className="form ui">
                            <BaseForm
                                setFieldTouched={setFieldTouched}
                                setFieldValue={setFieldValue}
                            />
                            <Field
                                label="Employer name"
                                placeholder="Employer name"
                                name="employerName"
                                component={TextField}
                            />
                            <Grid>
                                <Grid.Row columns={2}>
                                    <Grid.Column>
                                        <Field
                                            label="Sick Leave  Start Date"
                                            placeholder="Sick Leave Start Date"
                                            name="sickLeave startDate"
                                            component={TextField}
                                        />
                                    </Grid.Column>
                                    <Grid.Column>
                                        <Field
                                            label="Sick Leave  End Date"
                                            placeholder="Sick Leave End Date"
                                            name="sickLeave endDate"
                                            component={TextField}
                                        />
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                            <Grid>
                                <Grid.Column floated="left" width={5}>
                                    <Button onClick={onCancel} color="red">
                                        cancel
                                    </Button>
                                </Grid.Column>
                                <Grid.Column floated="right" width={5}>
                                    <Button
                                        type="submit"
                                        disabled={!isValid || !dirty}
                                        color="green"
                                        floated="right">
                                        submit
                                    </Button>
                                </Grid.Column>
                            </Grid>
                        </Form>
                    </div>
                );
            }}
        </Formik>
    );
};
