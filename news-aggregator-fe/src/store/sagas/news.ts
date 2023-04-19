import { put } from "redux-saga/effects";
import { getNewsFeedFail, getNewsFeedStart, getNewsFeedSuccess, getSearchDetailsDone, getSearchDetailsStart } from "../actions";
import { GetNewsFeed, GetNewsFeedResponse, GetSearchDetails, GetSearchDetailsResponse } from "../types/news.module";
import axios from "axios";



export function* getSearchDetailsSaga(action: GetSearchDetails) {
    try {
        yield put(getSearchDetailsStart())
        const response: GetSearchDetailsResponse = yield axios.get("http://127.0.0.1:8000/api/get-search-params" , {
            'headers': {
                'Accept': 'application/json',
                'Authorization': `Bearer ${action.token}`,
            },
        })

        yield put(getSearchDetailsDone(response.data))
    }
    catch(_) {
        yield put(getSearchDetailsDone())
    }
}

export function* getNewsFeedSaga({token, newsQuery}: GetNewsFeed) {
    try {
        yield put(getNewsFeedStart())
        let searchParam = ''
        if (newsQuery) {
            for (let i = 0; i < Object.keys(newsQuery).length; i++) {
                const queryKey = Object.keys(newsQuery)[i]
                const queryValue: string | undefined = newsQuery[queryKey]
                searchParam += queryValue ? `${queryKey}=${queryValue}&` : '' 
            }
        }
        // const searchParam = newsQuery ? `?${newsQuery.search ? `search=${newsQuery.search}&` : ''}` : ''
        const response: GetNewsFeedResponse = yield axios.get(`http://127.0.0.1:8000/api/get-news-feed${(newsQuery && searchParam.length > 0) ? `?${searchParam}` : ''}` , {
            'headers': {
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        })

        yield put(getNewsFeedSuccess(response.data.news.articles))
    }
    catch(err: any) {
        yield put(getNewsFeedFail(err.response.data.message))
    }
}