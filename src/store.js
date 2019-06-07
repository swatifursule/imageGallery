import createSagaMiddleware from "redux-saga";
import {createStore, applyMiddleware,combineReducers} from 'redux';
import {searchTerm, gallery} from "./store/reducers";
import searchSaga from './store/sagas'
let sagaMiddleware = createSagaMiddleware()


const logger = (store) => (next) => {
    /* eslint-disable no-console */
    if (!console.group) {
        return next;
    }

    return (action) => {
        console.group(action.type);
        console.log('%c prev state', 'color: gray', store.getState());
        console.log('%c action', 'color: blue', action);
        const returnValue = next(action);
        console.log('%c next state', 'color: green', store.getState());
        console.groupEnd(action.type);
        return returnValue;
    };
    /* eslint-enable no-console */
};
function configureStore() {
    const rootReducer = combineReducers({
        searchTerm,
        gallery
    })
    const store = createStore(rootReducer,applyMiddleware(sagaMiddleware,logger))
    sagaMiddleware.run(searchSaga)
    return store
}
export default configureStore();
