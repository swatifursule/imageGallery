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