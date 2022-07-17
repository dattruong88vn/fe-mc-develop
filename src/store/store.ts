import { applyMiddleware, compose, createStore } from 'redux';
import { persistStore } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './reducers';
import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();

const middleware = [];

middleware.push(sagaMiddleware);

const store = createStore(rootReducer, compose(applyMiddleware(...middleware)));

const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);

export { store, persistor };
