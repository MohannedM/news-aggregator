import { DismissNewsError, GetNewsFeed, GetNewsFeedFail, GetNewsFeedStart, GetNewsFeedSuccess, GetSearchDetails, GetSearchDetailsDone, GetSearchDetailsStart, NewsArticle, NewsQuery, NewsQueryParams, SearchParams } from '../types/news.module'
import * as actionTypes from './actionTypes'

export const getSearchDetails: (token: string) => GetSearchDetails = (token) => {
    return {
        type: actionTypes.GET_SEARCH_DETAILS,
        token,
    }
}

export const getSearchDetailsStart: () => GetSearchDetailsStart = () => {
    return {
        type: actionTypes.GET_SEARCH_DETAILS_START,
    }
}

export const getSearchDetailsDone: (searchParams?: SearchParams) => GetSearchDetailsDone = (searchParams) => {
    return {
        type: actionTypes.GET_SEARCH_DETAILS_DONE,
        searchParams,
    }
}

export const getNewsFeed: (token: string, newsQuery?: NewsQueryParams) => GetNewsFeed = (token, newsQuery) => {
    return {
        type: actionTypes.GET_NEWS_FEED,
        token,
        newsQuery,
    }
}

export const getNewsFeedStart: () => GetNewsFeedStart = () => {
    return {
        type: actionTypes.GET_NEWS_FEED_START,
    }
}

export const getNewsFeedSuccess: (newsArticles: NewsArticle[]) => GetNewsFeedSuccess = (newsArticles) => {
    return {
        type: actionTypes.GET_NEWS_FEED_SUCCESS,
        newsArticles,
    }
}

export const getNewsFeedFail: (error: string) => GetNewsFeedFail = (error) => {
    return {
        type: actionTypes.GET_NEWS_FEED_FAIL,
        error,
    }
}

export const dismissNewsError: () => DismissNewsError = () => {
    return {
        type: actionTypes.DISMISS_NEWS_ERROR,
    }
}
