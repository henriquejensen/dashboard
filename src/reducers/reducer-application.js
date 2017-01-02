import { LOGIN_SUCCESS, LOGIN_ERROR } from "../constants/utils";

export default function(state=[], action) {
    console.log("APP", action)
    switch(action.type) {
        case LOGIN_SUCCESS:
            console.log(action.payload);
            return state;
    }

    return state;
}