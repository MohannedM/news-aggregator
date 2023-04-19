import * as actionTypes from '../actions/actionTypes'
import {newsAction, NewsState} from '../types/news.module'

const initialState: NewsState = {
    newsArticles: [],
    searchParams: {
        categories: ['business'],
        countries: ['us'],
    }
}

const newsReducer: (state: NewsState, action: newsAction) => NewsState = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.GET_SEARCH_DETAILS_START:
            return {
                ...state,
                searchParamsLoading: true,
            }
        case actionTypes.GET_SEARCH_DETAILS_DONE:
            return {
                ...state,
                searchParamsLoading: false,
                searchParams: action.searchParams || state.searchParams,
            }
        case actionTypes.GET_NEWS_FEED_START:
            return {
                ...state,
                newsFeedLoading: true,
            }
        case actionTypes.GET_NEWS_FEED_SUCCESS:
            return {
                ...state,
                newsFeedLoading: false,
                newsArticles: action.newsArticles,
            }
        case actionTypes.GET_NEWS_FEED_FAIL:
            return {
                ...state,
                newsFeedLoading: false,
                error: action.error,
            }
        case actionTypes.DISMISS_NEWS_ERROR:
            return {
                ...state,
                error: undefined,
            }
        default:
            return state
    }
}

export default newsReducer
