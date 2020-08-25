import axios from 'axios'
import { GET_ITEMS, ADD_ITEMS, DELETE_ITEMS, ITEMS_LOADING } from './type';
import { tokenConfig } from './authAction';
import { returnErrors } from './errorAction'

// dikirim ke routes/api/items
export const getItem = () => dispatch => {
  dispatch(setItemsLoading());
  // Request
  axios
    .get('/api/items') // Dari Proxy package.json
    .then(res =>
      dispatch({
        type: GET_ITEMS,
        payload: res.data
      }))
    .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};

// dikirim ke routes/api/items
export const addItem = (item) => (dispatch, getState) => {
  axios
    .post('api/items', item, tokenConfig(getState))
    .then(res => dispatch({
      type: ADD_ITEMS,
      payload: res.data
    }))
    .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};

export const deleteItem = (id) => (dispatch, getState) => {
  axios.delete(`/api/items/${id}`, tokenConfig(getState)).
    then(res => {
      dispatch({
        type: DELETE_ITEMS,
        payload: id
      })
    })
    .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};


// Loading ambil data dari Mongo
export const setItemsLoading = () => {
  return {
    type: ITEMS_LOADING
  }
}
