import { ADD_CATS_ERROR, CATEGORY_FETCH_SUCCESS, CATS_LOADING } from "../actions/actionType"


const initialState = {
    categories: [],
    error: [],
    isLoading: false
}

const categoryReducer = (state = initialState, action) => {
    if (action.type === CATEGORY_FETCH_SUCCESS) {
        return {
            ...state,
            categories: action.payload,
            error: [],
            isLoading: false
        }
    } else if (action.type === CATS_LOADING) {
        return {
            ...state,
            isLoading: true
        }
    } else if (action.type === ADD_CATS_ERROR) {
        return {
            ...state,
            error: action.error
        }
    }

    return state
}

export default categoryReducer