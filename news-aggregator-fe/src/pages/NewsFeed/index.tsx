import React, { useEffect, useState } from 'react'
import './styles.css'
import { Button, Form } from 'react-bootstrap'
import { ConnectState } from '../../store/types'
import { DismissNewsError, GetNewsFeed, GetSearchDetails, NewsArticle, NewsQueryParams, SearchParams } from '../../store/types/news.module'
import Redux from 'redux'
import { connect } from 'react-redux'
import BlogPost from '../../components/BlogPost'
import { dismissNewsError, getNewsFeed, getSearchDetails } from '../../store/actions'
import BaseModal from '../../components/BaseModal'
import Loading from '../Loading'

interface NewsFeedProps {
  token: string
  searchParams: SearchParams
  searchParamsLoading?: boolean 
  newsArticles: NewsArticle[]
  newsFeedLoading?: boolean
  error?: string

  getSearchDetails(token: string): GetSearchDetails
  getNewsFeed(token: string, newsQuery?: NewsQueryParams): GetNewsFeed
  onDismissError(): DismissNewsError
}

const NewsFeed: React.FC<NewsFeedProps> = ({ token, searchParams, searchParamsLoading, newsArticles, getNewsFeed, getSearchDetails, error, onDismissError, newsFeedLoading}) => {
    const [userSearch, setUserSearch] = useState('')
    const [userCountry, setUserCountry] = useState('')
    const [userCategory, setUserCategory] = useState('')

    const onUserSearchChange = (event: React.SyntheticEvent) => {
      event.persist();
      setUserSearch((event.target as HTMLInputElement).value)
    }

    const onUserCountryChange = (event: React.SyntheticEvent) => {
      event.persist();
      setUserCountry((event.target as HTMLInputElement).value)
    }

    const onUserCategoryChange = (event: React.SyntheticEvent) => {
      event.persist();
      setUserCategory((event.target as HTMLInputElement).value)
    }

    const onSearch = () => {
      const newsQuery: any = {}
      if (userSearch) newsQuery.search = userSearch
      if (userCountry) newsQuery.country = userCountry
      if (userCategory) newsQuery.category = userCategory
      getNewsFeed(token, newsQuery)
    }

    useEffect(() => {
      getNewsFeed(token)
      getSearchDetails(token)
    }, [])
  
    return (
    <section className="home-blog bg-sand">
      <BaseModal error={error} handleCloseModal={onDismissError} />
        <div className="container">
            {/* <!-- section title --> */}
            <div className="row justify-content-md-center">
                <div className="col-xl-5 col-lg-6 col-md-8">
                    <div className="section-title text-center title-ex1">
                        <h2>Latest News</h2>
                        <p>Read all the latest news from all over the world in whatever category you like.</p>
                    </div>
                </div>
            </div>
            <div className="row justify-content-md-center">
                <div className="col-xl-6 col-lg-6 col-md-8">
                    <div className="section-title text-center title-ex1">
                    {/* onChange={(event: React.SyntheticEvent)=>setInputHandler(event, 'password')} */}
                      <Form.Control placeholder="Search" onChange={onUserSearchChange} />
                    </div>
                </div>
                <div className="col-xl-2 col-lg-2 col-md-8">
                    <div className="section-title text-center title-ex1">
                      <Form.Control  as={'select'} aria-label="Default select example" onChange={onUserCountryChange}>
                        <option>Country</option>
                        {searchParams.countries.map((country) => (<option key={country} value={country}>{country}</option>))}
                      </Form.Control>
                    </div>
                </div>
                <div className="col-xl-2 col-lg-2 col-md-8">
                    <div className="section-title text-center title-ex1">
                      <Form.Control  as={'select'} aria-label="Default select example" onChange={onUserCategoryChange}>
                        <option>Category</option>
                        {searchParams.categories.map((category) => (<option key={category} value={category}>{category}</option>))}
                      </Form.Control>
                    </div>
                </div>
                <div className="col-xl-2 col-lg-2 col-md-8">
                    <div className="section-title text-center title-ex1">
                    <Button onClick={onSearch} disabled={searchParamsLoading}>
                                Search 
                                {(searchParamsLoading || newsFeedLoading) ? <> &nbsp; <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> </> : null} 
                    </Button>
                    </div>
                </div>
            </div>
            {/* <!-- section title ends --> */}
            {newsFeedLoading ? (<Loading />) : (<div className="row ">
              {newsArticles.map((newsArticle) => <div className="col-md-6" key={newsArticle.publishedAt}><BlogPost newsArticle={newsArticle} /></div>)}
            </div>)}
        </div>
    </section>
    
    )
}

const mapStateToProps = (state: ConnectState) => {
  return{
      token: state.auth.token!, // This page is not reachable if the token is not there so I am sure it will always be there
      searchParams: state.news.searchParams,
      searchParamsLoading: state.news.searchParamsLoading,
      newsArticles: state.news.newsArticles,
      newsFeedLoading: state.news.newsFeedLoading,
      error: state.news.error,
  }
}

const mapDispatchToProps = (dispatch: Redux.Dispatch) => {
  return{
      getSearchDetails: (token: string) => dispatch(getSearchDetails(token)),
      getNewsFeed: (token: string, newsQuery?: NewsQueryParams) => dispatch(getNewsFeed(token, newsQuery)),
      onDismissError: () => dispatch(dismissNewsError()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewsFeed);