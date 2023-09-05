import { LOGIN_ERROR, LOGIN_SUCCESS, LOGOUT_SUCCESS, REGISTER_ERROR, REGISTER_SUCCESS } from "../actions/actionType";

const initialState = {
    role: [],
    errorLogin: [],
    errorRegister: [],
    isLogin: false,
    username: [],
    favorite: []
}

const userReducer = (state = initialState, action) => {
    if (action.type === LOGIN_SUCCESS) {
        return {
            ...state,
            role: action.payload.role,
            errorLogin: [],
            errorRegister: [],
            isLogin: true,
            username: action.payload.username,
            favorite: action.payload.favorite
        }
    } else if (action.type === LOGIN_ERROR) {
        return {
            ...state,
            errorLogin: action.error,
            errorRegister: [],
            isLogin: false
        }
    } else if (action.type === REGISTER_SUCCESS) {
        return {
            ...state,
            errorLogin: [],
            errorRegister: []
        }
    } else if (action.type === REGISTER_ERROR) {
        return {
            ...state,
            errorRegister: action.error,
            errorLogin: [],
        }
    } else if (action.type === LOGOUT_SUCCESS) {
        return {
            ...state,
            role: [],
            isLogin: false,
            favorite: []
        }
    }

    return state
}

export default userReducer