import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import reducer from './reducers';

const loggerMiddleware = createLogger({
  stateTransformer: state => state.toJS()
});

const createStoreWithMiddleware = applyMiddleware(loggerMiddleware)(createStore);

export default initialState => createStoreWithMiddleware(reducer, initialState);
