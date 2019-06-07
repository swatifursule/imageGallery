//The functions debounceFor and debounce were stolen from https://github.com/madewithlove/redux-saga-debounce-effect/
import {take,put,call,fork,cancel,select} from 'redux-saga/effects'
import delay from 'redux-saga';
import {searchingFlickr, flickrSearchFail, flickrSearchSuccess} from './actions'
import {SEARCH_TERM_CHANGED, REFRESH_IMAGES} from './actions'
import {prevSearchTermSelector, currentSearchTermSelector} from './reducers'
import {fetchImages, addKeyToThumbnails, handleFlickrResponse} from '../api/api'

function *debounceFor(pattern, saga, ms, ...args) {
    function *delayedSaga(action) {
        yield call(delay, ms);
        yield call(saga, action, ...args);
    }

    let task;
    while (true) {
        const action = yield take(pattern);
        if (task) {
            yield cancel(task);
        }

        task = yield fork(delayedSaga, action);
    }
}

function debounce(pattern, handler, ...args) {
    return debounceFor(pattern, handler, 500, ...args);
}

function * flickrFlow(term) {
    try {
        yield put(searchingFlickr())
        const flickrResponse = yield call(fetchImages,term)
        const extractedImages = handleFlickrResponse(flickrResponse)
        const output = addKeyToThumbnails(extractedImages)
        const successAction = flickrSearchSuccess(output)
        yield put(successAction)
    } catch(error) {
        const failureAction = flickrSearchFail(error)
        yield put(failureAction)
    }
}

function * searchWorkerSaga(action) {
    console.log('action recieved in the saga is')
    console.log(action)
    const {type} = action
    if(type === SEARCH_TERM_CHANGED) {
        const {term} = action
        console.log(term)
        const prevTerm = yield select(prevSearchTermSelector)
        if(term !== prevTerm && term !== "") {
            yield call(flickrFlow,term)
        }
    } else if(type === REFRESH_IMAGES) {
        const term = yield select(currentSearchTermSelector);
        if(term !== "") {
            yield call(flickrFlow,term);
        }

    }
}

export default function * searchSaga(){
    yield debounce([SEARCH_TERM_CHANGED,REFRESH_IMAGES],searchWorkerSaga)

}