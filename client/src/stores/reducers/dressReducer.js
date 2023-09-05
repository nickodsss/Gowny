import { DRESS_FETCH_SUCCESS, DRESS_DETAIL_FETCH_SUCCESS, LOADING, ADD_DRESS_ERROR } from "../actions/actionType";

const initialState = {
    dresses: [],
    detailDress: [],
    error: [],
    isLoading: false
}

const dressReducer = (state = initialState, action) => {
    if (action.type === DRESS_FETCH_SUCCESS) {
        return {
            ...state,
            dresses: action.payload,
            error: [],
            isLoading: false
        }
    } else if (action.type === DRESS_DETAIL_FETCH_SUCCESS) {
        return {
            ...state,
            detailDress: action.payload,
            error: [],
            isLoading: false
        }
    } else if (action.type === LOADING) {
        return {
            ...state,
            isLoading: true
        }
    } else if (action.type === ADD_DRESS_ERROR) {
        return {
            ...state,
            error: action.error,
            isLoading: false
        }
    }

    return state
}

export default dressReducer