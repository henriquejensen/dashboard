import states from "./data/states.json";

import { LOAD_STATES } from "../constants/utils";

const initialStates = states.UF;

export default function(state=[], action) {
    switch(action.type) {
        case LOAD_STATES:
            return initialStates;
    }

    return state;
}