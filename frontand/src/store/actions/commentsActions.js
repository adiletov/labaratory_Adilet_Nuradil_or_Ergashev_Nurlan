import axios from '../../axios-api';
import {
    ADD_DATA_FAILURE,
    ADD_DATA_REQUEST,
    ADD_DATA_SUCCESS,
    FETCH_COMMENTS_SUCCESS,
    FETCH_DATA_FAILURE,
    FETCH_DATA_REQUEST
} from "./actionTypes";

const fetchDataRequest = () => ({type: FETCH_DATA_REQUEST});
const fetchDataFailure = error => ({type: FETCH_DATA_FAILURE, error});

const addDataRequest = () => ({type: ADD_DATA_REQUEST});
const addDataFailure = error => ({type: ADD_DATA_FAILURE, error});
const addDataSuccess = () => ({type: ADD_DATA_SUCCESS});


const fetchCommentsSuccess = comments => ({type: FETCH_COMMENTS_SUCCESS, comments});

export const fetchComments = postId => {
    return async dispatch => {
        dispatch(fetchDataRequest());
        try {
            const response = await axios.get(`/comments?post=${postId}`);
            dispatch(fetchCommentsSuccess(response.data));
        } catch (e) {
            dispatch(fetchDataFailure(e))
        }
    };
};

export const addComment = commentData => {
    return async (dispatch, getState) => {
        const token = getState().users.user.token;
        const config = {headers: {'Authorization': token}};
        dispatch(addDataRequest());

        try {
             await axios.post('/comments', commentData, config);
            dispatch(addDataSuccess());
        } catch (e) {
            dispatch(addDataFailure(e.response.data));
        }

    }
};


