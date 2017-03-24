import { GET_TICKETS_BASECERTA } from "../constants/constantsBaseCerta";

export function getTicketsBaseCerta() {
    return {
        type: GET_TICKETS_BASECERTA,
        payload: "tickets"
    }
}