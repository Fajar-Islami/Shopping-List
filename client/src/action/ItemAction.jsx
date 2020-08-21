import axios from 'axios'
import { GET_ITEMS, ADD_ITEMS, DELETE_ITEMS, ITEMS_LOADING } from './type'

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
      })
    )
};

// dikirim ke routes/api/items
export const addItem = (item) => dispatch => {
  axios
    .post('api/items', item)
    .then(res => dispatch({
      type: ADD_ITEMS,
      payload: res.data
    }))

};

export const deleteItem = (id) => (dispatch) => {
  axios.delete(`/api/items/${id}`).then(res => {
    dispatch({
      type: DELETE_ITEMS,
      payload: id
    })
  })
};


// Loading ambil data dari Mongo
export const setItemsLoading = () => {
  return {
    type: ITEMS_LOADING
  }
}
