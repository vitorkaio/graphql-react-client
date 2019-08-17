
import { createStore, applyMiddleware, compose } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import logger from 'redux-logger';

import rootEpic from './modules/rootEpic';
import rootReducer from './modules/rootReducer';

const epicMiddleware = createEpicMiddleware();
const configureStore = createStore(
  rootReducer, 
  compose(
    applyMiddleware(epicMiddleware, logger),
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);
epicMiddleware.run(rootEpic);

/* const epicMiddleware = createEpicMiddleware();
const createStoreWithMiddleware = applyMiddleware(logger, epicMiddleware)(createStore);
epicMiddleware.run(epicsRoots); */


export default configureStore;