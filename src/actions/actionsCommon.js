import ajax from "superagent";

import {
    CHANGE_COLOR_MENU,
    INFO_URL,
    INFO_ERROR,
    INFO_SUCCESS
} from "../constants/utils";

export function changeColorMenu(color) {
    return {
        type: CHANGE_COLOR_MENU,
        payload: color
    }
}

export function getUserData() {
	return (dispatch) => {
		ajax.get(INFO_URL)
            .query({keySession: localStorage.getItem("token")})
			.end(function(err, res) {
				if (err || !res.ok) {
					dispatch({type: INFO_ERROR, payload: res.body})
				} else {
					dispatch({type: INFO_SUCCESS, payload: res.body})
				}
			})
	}
}