import React, { useEffect, useState } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

// After 34 video this news2.js file implemented

const News2 = (props) => {

    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [totalResults, setTotalResults] = useState(0)

    // Capitalize the categories
    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    // Follows DRY principle
    const updateNews = async () => {
        // Set the loading line By default
        props.setProgress(10);

        // apikey hide and get to env.local file using props
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apikey=${props.apikey}&page=${page}&pageSize=${props.pageSize}`;

        // Set the logic for loading
        // Loading gif will occur till to page Load
        let data = await fetch(url);
        setLoading(true);

        // Set the loading line till to fetch data
        props.setProgress(40);
        let parsedData = await data.json();

        // Set the loading line till to parsed data
        props.setProgress(70);
        setArticles(parsedData.articles)
        setTotalResults(parsedData.totalResults)

        // loading false after all data loaded succesfully
        setLoading(false)

        // When page will be loaded loading line will be finish
        props.setProgress(100);
    }

    useEffect(() => {
        // Changing the title based on news categories as well capital the first letter of category
        document.title = `${capitalizeFirstLetter(props.category)} - Taaza Khabar`;
        updateNews();
        // eslint-disable-next-line
    }, [])

    const fetchMoreData = async () => {
        // apikey hide and get to env.local file using props
        // Update page increment by 1 because it throws error (children component with same key)
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apikey=${props.apikey}&page=${page + 1}&pageSize=${props.pageSize}`;

        // Solve error children component with same key
        // Solve bug repeat news shown (increment page by 1)
        setPage(page + 2)
        let data = await fetch(url);
        let parsedData = await data.json();

        setArticles(articles.concat(parsedData.articles))
        setTotalResults(parsedData.totalResults)
    };

    return (
        <>
            <h2 className='text-center' style={{ marginTop: '80px' }}>Top news on {capitalizeFirstLetter(props.category)} Headlines</h2>
            {loading && <Spinner />}

            <InfiniteScroll
                dataLength={articles.length}
                next={fetchMoreData}
                hasMore={articles.length !== totalResults}
                loader={<Spinner />}
            >
                <div className='container my-4'>
                    <div className="row">
                        {/* map function is use for looping */}
                        {/* It is print the data and works like for loop */}
                        {/* It must take return value */}
                        {/* slice is use for how many characters you want to show in your website (use for structure style)*/}
                        {/* loading is use for when you click on button at that time first loading will start to execure after that content will be display */}
                        {articles.map((element) => {
                            return <div className="col-md-4" key={element.url}>
                                {/* Pass the title, description, images, newsurl, authorname, source, publishing date from the our json file which is store in element array. */}
                                {/* If title is null at that time empty string will be execute */}
                                {/* If description is null at that time empty string will be execute */}
                                <NewsItem title={element.title ? element.title.slice(0, 40) : ""} description={element.description ? element.description.slice(0, 88) : ""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                            </div>
                        })}
                    </div>
                </div>
            </InfiniteScroll>
        </>
    )
}

News2.defaultProps = {
    country: "in",
    pageSize: 6,
    category: "general"
}

News2.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
}

export default News2