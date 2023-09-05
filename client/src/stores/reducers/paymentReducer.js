import { CREATE_INVOICE_FAILURE, CREATE_INVOICE_REQUEST, CREATE_INVOICE_SUCCESS, FETCH_HISTORY_FAILURE, FETCH_HISTORY_REQUEST, FETCH_HISTORY_SUCCESS } from "../actions/actionType";


const initialState = {
    isLoading: false,
    qrisImage: null,
    error: null,
    history: []
};

const paymentReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_INVOICE_REQUEST:
            return {
                ...state,
                isLoading: true,
                error: null
            };
        case CREATE_INVOICE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                qrisImage: action.payload
            };
        case CREATE_INVOICE_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload
            };

        case FETCH_HISTORY_REQUEST:
            return {
                ...state,
                isLoading: true,
                error: null
            };

        case FETCH_HISTORY_SUCCESS:
            return {
                ...state,
                isLoading: false,
                history: action.payload
            };

        case FETCH_HISTORY_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload
            };
        default:
            return state;
    }
};

export default paymentReducer;