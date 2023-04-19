<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use jcobhams\NewsApi\NewsApi;

class NewsController extends Controller
{
    public function getSearchParams(Request $request) {
        $newsapi = new NewsApi(config('app.news_api_key'));

        $countries = $newsapi->getCountries();
        $categories = $newsapi->getCategories();

        return response([
            'countries' => $countries,
            'categories' => $categories,
        ]);
    }

    public function getNewsFeed(Request $request) {
        $newsapi = new NewsApi(config('app.news_api_key'));

        $country = $request->query('country', 'us');
        $category = $request->query('category', 'business');
        $searchQuery = $request->query('search', '');

        $page = 1;
        $pageSize = 30;

        $news = $newsapi->getTopHeadlines($searchQuery, null, $country, $category, $pageSize, $page);

        if (!$news) {
            return response([
                'message' => 'An unexpected error occurred while getting the news',
            ], 400);
        }

        return response([
            'news' => $news,
        ]);
    }
}
