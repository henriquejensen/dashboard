import { GET_TICKETS_VENDAMAIS } from "../constants/constantsVendaMais";

export function getTicketsVendaMais() {
    return {
        type: GET_TICKETS_VENDAMAIS,
        payload: "tickets"
    }
}