import { State } from "./state";
import { Patient } from "../types";

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
    type: "UPDATE_PATIENT"
    payload: Patient
  }

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
          ...state.patients
        }
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case "UPDATE_PATIENT":
      const updatePatient = () => {
        const newStatePatients = {
          ...state.patients,
        }
        console.log('b:nsp', newStatePatients)
        newStatePatients[action.payload.id] = action.payload
        console.log('a:nsp', newStatePatients)
        return newStatePatients
      }
      console.log('s', state)
      return {
        ...state,
        patients: updatePatient()
      }
      // return {
      //   ...state,
      //   patients: {
      //     ...state.patients,
      //     state.patients[action.payload.id] = action.payload
      //   }
      // }
    default:
      return state;
  }
};
