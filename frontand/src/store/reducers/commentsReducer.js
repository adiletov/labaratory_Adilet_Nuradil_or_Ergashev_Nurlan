import {
    ADD_DATA_FAILURE,
    ADD_DATA_REQUEST,
    FETCH_COMMENTS_SUCCESS,
    FETCH_DATA_FAILURE,
    FETCH_DATA_REQUEST
} from "../actions/actionTypes";

const initialState = {
    comments: [],
    error: null,
    loading: true
};

const commentsReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_DATA_REQUEST:
            return {...state, loading: true};

        case FETCH_DATA_FAILURE:
            return {...state, loading: false, error: action.error};

        case FETCH_COMMENTS_SUCCESS:
            return {...state, comments: action.comments, loading: false};

        case ADD_DATA_REQUEST:
            return {...state, loading: true};

        case ADD_DATA_FAILURE:
            return {...state, loading: false, error: action.error};

        default:
            return state
    }
};

export default commentsReducer;
