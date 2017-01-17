import {
    SEE_FOCOFISCAL_MODEL,
    CLOSE_FOCOFISCAL_MODEL,
} from "../constants/constantsFocoFiscal";

export function seeModel() {
    return {
        type: SEE_FOCOFISCAL_MODEL,
        payload: ""
    }
}

export function closeModel() {
    return {
        type: CLOSE_FOCOFISCAL_MODEL,
        payload: ""
    }
}