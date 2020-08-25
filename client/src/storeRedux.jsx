import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/index'

const initialState = {};

const middleWare = [thunk];

const storeRedux = createStore(rootReducer, initialState, compose(
  applyMiddleware(...middleWare),
  // error store not found
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
))

export default storeRedux;