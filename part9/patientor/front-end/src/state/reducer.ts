import { State } from "./state";
import { Diagnosis, Patient } from "../types";

export type Action =
    | {
          type: "SET_PATIENT_LIST";
          payload: Patient[];
      }
    | {
          type: "ADD_PATIENT";
          payload: Patient;
      }
    | {
          type: "ADD_PATIENTINFO";
          payload: Patient;
      }
    | {
          type: "SET_DIAGNOSIS";
          payload: Diagnosis[];
      }
    | {
          type: "UPDATE_PATIENT";
          payload: Patient;
      };

export const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case "SET_PATIENT_LIST":
            return {
                ...state,
                patients: {
                    ...action.payload.reduce(
                        (memo, patient) => ({ ...memo, [patient.id]: patient }),
                        {}
                    ),
                    ...state.patients,
                },
            };
        case "ADD_PATIENT":
            return {
                ...state,
                patients: {
                    ...state.patients,
                    [action.payload.id]: action.payload,
                },
            };
        case "ADD_PATIENTINFO":
            return {
                ...state,
                patientInfo: [...state.patientInfo, action.payload],
            };
        case "SET_DIAGNOSIS":
            return {
                ...state,
                diagnosis: [...action.payload],
            };
        case "UPDATE_PATIENT":
            let index = 0;
            state.patientInfo.forEach((p, i) => {
                if (p.id === action.payload.id) index = i;
            });
            const newPatientInfo = [...state.patientInfo];
            newPatientInfo.splice(index, 1, action.payload);
            return {
                ...state,
                patientInfo: [...newPatientInfo],
            };
        default:
            return state;
    }
};

export const setPatientList = (payLoad: Patient[]): Action => ({
    type: "SET_PATIENT_LIST",
    payload: payLoad,
});

export const setDiagnosis = (payLoad: Diagnosis[]): Action => ({
    type: "SET_DIAGNOSIS",
    payload: payLoad,
});

export const addPatient = (payload: Patient): Action => ({
    type: "ADD_PATIENT",
    payload: payload,
});

export const updatePatient = (payload: Patient): Action => ({
    type: "UPDATE_PATIENT",
    payload: payload,
});

export const addPatientInfo = (payload: Patient): Action => ({
    type: "ADD_PATIENTINFO",
    payload: payload,
});
