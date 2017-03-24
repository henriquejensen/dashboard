import { GET_TICKETS_VENDAMAIS } from "../constants/constantsVendaMais";

import vendamais from "./data/vendamais/tickets.json";

const getInitialState = {
    tickets: [],
}

export default function(state=getInitialState, action) {
    switch(action.type) {
        case GET_TICKETS_VENDAMAIS:
            return {
                tickets: vendamais.tickets
            }
    }

    return state;
}