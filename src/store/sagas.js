

//constants
export const SHOW_ALL_TAGS = 'SHOW_ALL_TAGS'
export const SEARCH_TERM_CHANGED = 'SEARCH_TERM_CHANGED'
export const FLICKR_SEARCH_PROGRESS = 'FLICKR_SEARCH_PROGRESS'
export const FLICKR_SEARCH_SUCCESS = 'FLICKR_SEARCH_SUCCESS'
export const FLICKR_SEARCH_FAIL = 'FLICKR_SEARCH_FAIL'
export const REFRESH_IMAGES='REFRESH_IMAGES'

//action creators
export const showAllTags = (key) => ({
    type: SHOW_ALL_TAGS,
    key
})

export const searchTermChanged = (term) => ({
    type: SEARCH_TERM_CHANGED,
    term:term
})


export const searchingFlickr = () => ({
    type:FLICKR_SEARCH_PROGRESS
})

export const flickrSearchSuccess = (payload) => ({
    type:FLICKR_SEARCH_SUCCESS,
    payload
})

export const flickrSearchFail = (error) => ({
    type:FLICKR_SEARCH_FAIL,
    error
})

export const refreshImages = () => ({type: REFRESH_IMAGES});
import {FLICKR_SEARCH_FAIL, FLICKR_SEARCH_PROGRESS, FLICKR_SEARCH_SUCCESS, SEARCH_TERM_CHANGED} from "./actions";

export function searchTerm(state = {},action) {
    switch (action.type) {
        case SEARCH_TERM_CHANGED: {
            return Object.assign({},state,{value:action.term,prevValue:state.value})
        }

        default:
            return state
    }
}


export function gallery(state={},action) {
    switch(action.type) {
        case FLICKR_SEARCH_PROGRESS:
            return Object.assign({},state,{isFetching:true})
        case FLICKR_SEARCH_SUCCESS:
            return Object.assign({},state,{isFetching:false,items:action.payload})
        case FLICKR_SEARCH_FAIL:
            return Object.assign({},state,{error:action.error})
        default:
            return state
    }
}

export const prevSearchTermSelector = state => state.searchTerm.prevValue
export const currentSearchTermSelector = state => state.searchTerm.value




//The functions debounceFor and debounce were stolen from https://github.com/madewithlove/redux-saga-debounce-effect/
import {take,put,call,fork,cancel,select} from 'redux-saga/effects'
import delay from 'redux-saga';

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
        console.log("flickrResponse*************** : ", flickrResponse);
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
