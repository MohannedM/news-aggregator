import { applyMiddleware, createStore, combineReducers } from 'redux';
import {authSagas, newsSagas} from './sagas/index';
import createSagaMiddleware from 'redux-saga';
import authReducer from './reducers/auth';
import { composeWithDevTools } from 'redux-devtools-extension';
import newsReducer from './reducers/news';


const reducers = combineReducers({
    auth: authReducer,
    news: newsReducer,
});

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(reducers, composeWithDevTools(applyMiddleware(sagaMiddleware)));


sagaMiddleware.run(authSagas);
sagaMiddleware.run(newsSagas);
