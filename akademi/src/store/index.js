import { legacy_createStore as createStore, applyMiddleware, compose } from "redux";
import { thunk } from 'redux-thunk';
import reducers from './reducers';

// Enable Redux DevTools 
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));


export default store;