import { GET_ITEMS, ADD_ITEMS, DELETE_ITEMS, ITEMS_LOADING } from '../action/type'

// state global
const initialState = {
  items: [],
  loading: false
}

// Reducers
export default function (state = initialState, action) {
  switch (action.type) {

    case GET_ITEMS:
      return {
        ...state,
        items: action.payload,
        loading: false
      };

    case DELETE_ITEMS:
      return {
        ...state,
        items: state.items.filter(item => item._id !== action.payload)
      };

    case ADD_ITEMS:
      return {
        ...state,
        items: [action.payload, ...state.items]
      };

    // Loading ambil data dari Mongo
    case ITEMS_LOADING:
      return {
        ...state,
        loading: true
      }

    default:
      return state;
  }
}