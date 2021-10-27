import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';

import rootReducer from './rootReducer';

export default function configureStore(initialState) {
  const logger = createLogger({
    collapsed: true,
    logger: console,
  });

  const middlewares = applyMiddleware(thunk, logger);

  return createStore(rootReducer, initialState, middlewares);
}
