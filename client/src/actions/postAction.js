import axios from "axios";

import { GET_POST,
    GET_POSTS,
    ADD_POST,
    DELETE_POST,
    POST_LOADING, 
    GET_ERRORS,
    CLEAR_ERRORS} from "./types";

export const addPost = (postData) => (dispatch) => {
    dispatch(clearErrors())
    axios
    .post('api/post', postData)
      .then(res =>
        dispatch({
            type:ADD_POST,
            payload:res.data,
        }))
        .catch(err =>
            dispatch({
                type:GET_ERRORS,
                payload:err.response.data
            }))
}

export const deleteComment = (postId,commentId) => (dispatch) => {
    axios
    .delete(`/api/post/comment/${postId}/${commentId}`)
      .then(res =>
        dispatch({
            type:GET_POST,
            payload:res.data,
        }))
        .catch(err =>
            dispatch({
                type:GET_ERRORS,
                payload:err.response.data
            }))
}
export const addcomment = (id,addcomment) => (dispatch) => {
    dispatch(clearErrors())
    axios
    .post(`/api/post/comment/${id}`, addcomment)
      .then(res =>
        dispatch({
            type:GET_POST,
            payload:res.data,
        }))
        .catch(err =>
            dispatch({
                type:GET_ERRORS,
                payload:err.response.data
            }))
}

export const getPosts = () => (dispatch) => {
    dispatch(setLoading());
    axios
    .get('api/post')
      .then(res =>
        dispatch({
            type:GET_POSTS,
            payload:res.data,
        }))
        .catch(err =>
            dispatch({
                type:GET_POSTS,
                payload:null
            }))
}
export const removeLike =(id) =>(dispatch) => {
    axios
      .post(`/api/post/unlike/${id}`)
      .then(res =>dispatch(getPosts()))
      .catch(err =>
        dispatch({
            type:GET_ERRORS,
            payload:err.response.data
        }))
}
export const likePost =(id) =>(dispatch) => {
axios
  .post(`/api/post/like/${id}`)
   .then(res => 
    dispatch(getPosts())
    ).catch(err =>dispatch({
            type:GET_ERRORS,
            payload:err.response.data
        }))
}

export const getPost = (id) =>(dispatch) => {
    dispatch(setLoading)
    axios
     .get(`/api/post/${id}`)
     .then(res =>
        dispatch({
            type:GET_POST,
            payload:res.data
        }))
        .catch(err =>
            dispatch({
                type:GET_POST,
                payload:null
            }))
        
}

export const deletePost = (id) => (dispatch) => {
    axios
    .delete(`api/post/${id}`)
      .then(res =>
        dispatch({
            type:DELETE_POST,
            payload:id,
        }))
        .catch(err =>
            dispatch({
                type:GET_ERRORS,
                payload:err.response.data
            }))
}
export const setLoading = () => {

    return {
        type:POST_LOADING 
    }
}
export const clearErrors = () => {

    return {
        type:CLEAR_ERRORS 
    }
}