import {
    CHANGE_COLOR_MENU,
    GET_NOTIFICATIONS
} from "../constants/utils";

export function changeColorMenu(color) {
    return {
        type: CHANGE_COLOR_MENU,
        payload: color
    }
}

export function getNotifications() {
    return {
        type: GET_NOTIFICATIONS,
        payload: ""
    }
}