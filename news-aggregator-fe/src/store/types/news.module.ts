import { DISMISS_NEWS_ERROR, GET_NEWS_FEED, GET_NEWS_FEED_FAIL, GET_NEWS_FEED_START, GET_NEWS_FEED_SUCCESS, GET_SEARCH_DETAILS, GET_SEARCH_DETAILS_DONE, GET_SEARCH_DETAILS_START } from "../actions/actionTypes"

export interface NewsArticle {
    source?: {
        name: string
    },
    author: string | null
    title: string
    description: string
    url: string
    urlToImage: string
    publishedAt: string
}

export interface SearchParams {
    countries: string[]
    categories: string[]
}

export interface NewsState {
    searchParams: SearchParams
    searchParamsLoading?: boolean
    newsFeedLoading?: boolean
    newsArticles: NewsArticle[]
    error?: string
}

export interface GetSearchDetails {
    type: typeof GET_SEARCH_DETAILS
    token: string
}

export interface GetSearchDetailsResponse {
    data: SearchParams
}

export interface GetNewsFeedResponse {
    data: {
        news: {
            articles: NewsArticle[]
            totalResults: number
        }
    }
}


export interface GetSearchDetailsStart {
    type: typeof GET_SEARCH_DETAILS_START
}

export interface GetSearchDetailsDone {
    type: typeof GET_SEARCH_DETAILS_DONE
    searchParams?: SearchParams
}

export interface NewsQuery {
    search?: string
    category?: string
    country?: string
}

export interface NewsQueryParams {
    [key: string]: string
}

export interface GetNewsFeed {
    type: typeof GET_NEWS_FEED
    token: string
    newsQuery?: NewsQueryParams
}

export interface GetNewsFeedStart {
    type: typeof GET_NEWS_FEED_START
}


export interface GetNewsFeedSuccess {
    type: typeof GET_NEWS_FEED_SUCCESS
    newsArticles: NewsArticle[]
}


export interface GetNewsFeedFail {
    type: typeof GET_NEWS_FEED_FAIL
    error: string;
}

export interface DismissNewsError {
    type: typeof DISMISS_NEWS_ERROR
}


export type newsAction =  GetSearchDetailsStart | GetSearchDetailsDone | GetNewsFeedStart | GetNewsFeedFail | GetNewsFeedSuccess | DismissNewsError;