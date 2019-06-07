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

export const refreshImages = () => ({type: REFRESH_IMAGES})