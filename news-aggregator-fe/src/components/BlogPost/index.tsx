import React from 'react'
import { NewsArticle } from '../../store/types/news.module'

interface BlogPostProps {
    newsArticle: NewsArticle
}


const BlogPost: React.FC<BlogPostProps> = ({ newsArticle }) => {
    return (
        <div className="media blog-media">
        <a href={newsArticle.url}><img className="d-flex" style={{ height: '85vh' }} src={newsArticle.urlToImage ? newsArticle.urlToImage : 'https://www.bootdey.com/image/350x380/6495ED/000000'} alt="Generic placeholder image" /></a>
        <div className="circle">
            <h5 className="day">{new Date(newsArticle.publishedAt).getDay()}</h5>
            <span className="month">{new Date(newsArticle.publishedAt).toLocaleString('en-us',{month:'short'})}</span>
        </div>
        <div className="media-body" style={{ maxWidth: '20vw' }}>
          <a href={newsArticle.url}><h5 className="mt-0">{newsArticle.title}t</h5></a>
          {newsArticle.description}
          <a href={newsArticle.url} className="post-link">Read More</a>
          <ul>
              <li>by: {newsArticle.author ? newsArticle.author.substring(0, 30) : newsArticle.author}</li>
              <li className="text-right"><a href={newsArticle.url}>{new Date(newsArticle.publishedAt).toLocaleString('en-us',{month:'short', year:'numeric'})}</a></li>
          </ul>
        </div>
      </div>
    )
}

export default BlogPost
