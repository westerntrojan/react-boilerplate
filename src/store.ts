import {createStore, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import rootReducer from './reducers';

let store: any;
if (process.env.REACT_APP_NODE_TITLE === 'production') {
	store = createStore(rootReducer, applyMiddleware(thunk));
} else {
	store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk, logger)));
}

export default store;
