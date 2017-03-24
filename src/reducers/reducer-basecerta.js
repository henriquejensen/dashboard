import { GET_TICKETS_BASECERTA } from "../constants/constantsBaseCerta";

import basecerta from "./data/basecerta/tickets.json";

const getInitialState = {
    tickets: [],
}

export default function(state=getInitialState, action) {
    switch(action.type) {
        case GET_TICKETS_BASECERTA:
            return {
                tickets: basecerta.tickets
            }
    }

    return state;
}