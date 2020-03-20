import {
    ADD_DATA_FAILURE,
    ADD_DATA_REQUEST, ADD_DATA_SUCCESS,
    FETCH_DATA_FAILURE,
    FETCH_DATA_REQUEST,
    FETCH_POST_SUCCESS,
    FETCH_POSTS_SUCCESS
} from "../actions/actionTypes";

const initialState = {
    posts: [],
    post: {},
    error: null,
    loading: true
};

const postsReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_DATA_REQUEST:
            return {...state, loading: true};

        case FETCH_DATA_FAILURE:
            return {...state, loading: false};

        case FETCH_POSTS_SUCCESS:
            return {...state, posts: action.posts, loading: false};

        case FETCH_POST_SUCCESS:
            return {...state, post: action.post, loading: false};

        case ADD_DATA_REQUEST:
            return {...state, loading: true};

        case ADD_DATA_FAILURE:
            return {...state, loading: false, error: action.error};
        case ADD_DATA_SUCCESS:
            return {...state, loading: false, error: null}
        default:
            return state;
    }
};

export default postsReducer;
