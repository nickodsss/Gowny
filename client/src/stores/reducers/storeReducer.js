import { LOADING_STORE, STORE_DETAIL_FETCH_SUCCESS, STORE_FETCH_SUCCESS } from "../actions/actionType";

const initialState = {
    stores: [],
    detailStore: [],
    error: [],
    isLoading: false
}

const storeReducer = (state = initialState, action) => {
    if (action.type === STORE_FETCH_SUCCESS) {
        return {
            ...state,
            stores: action.payload,
            error: [],
            isLoading: false
        }
    } else if (action.type === STORE_DETAIL_FETCH_SUCCESS) {
        return {
            ...state,
            detailStore: action.payload,
            error: [],
            isLoading: false
        }
    } else if (action.type === LOADING_STORE) {
        return {
            ...state,
            isLoading: true
        }
    }

    return state
}

export default storeReducer