import axios from '../../axios-api';
import {push} from 'connected-react-router';
import {
    ADD_DATA_FAILURE,
    ADD_DATA_REQUEST,
    ADD_DATA_SUCCESS,
    FETCH_DATA_FAILURE,
    FETCH_DATA_REQUEST,
    FETCH_POST_SUCCESS,
    FETCH_POSTS_SUCCESS
} from "./actionTypes";

const fetchDataRequest = () => ({type: FETCH_DATA_REQUEST});
const fetchDataFailure = error => ({type: FETCH_DATA_FAILURE, error});

const addDataRequest = () => ({type: ADD_DATA_REQUEST});
const addDataFailure = error => ({type: ADD_DATA_FAILURE, error});
const addDataSuccess = () => ({type: ADD_DATA_SUCCESS});

const fetchPostsSuccess = posts => ({type: FETCH_POSTS_SUCCESS, posts});
const fetchPostSuccess = post => ({type: FETCH_POST_SUCCESS, post});

export const fetchPosts = () => {
    return async dispatch => {
        dispatch(fetchDataRequest());

        try {
            const response = await axios.get('/posts');
            dispatch(fetchPostsSuccess(response.data));
        } catch (e) {
            dispatch(fetchDataFailure(e));
        }
    }
};

export const fetchPost = id => {
    return async dispatch => {
        dispatch(fetchDataRequest());

        try {
            const response = await axios.get(`/posts/${id}`);
            dispatch(fetchPostSuccess(response.data));
        } catch (e) {
            dispatch(fetchDataFailure(e));
        }
    }
};

export const addPost = postData => {
    return async (dispatch, getState) => {
        const token = getState().users.user.token;
        const config = {headers: {'Authorization': token}};

        dispatch(addDataRequest());

        try {
            await axios.post('/posts', postData, config);

            dispatch(addDataSuccess());
            dispatch(push('/'))
        } catch (e) {
            dispatch(addDataFailure(e.response.data));
        }
    }
};


