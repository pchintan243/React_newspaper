import React, { useEffect, useState } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'

// Upto 34 video logic are implemented in this file 
// 35 video loading line 
const News = (props) => {

    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(false)
    const [page, setPage] = useState(1)
    const [totalResults, setTotalResults] = useState()

    // Capitalize the categories
    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    // Follows DRY principle
    const updateNews = async () => {
        // Set the loading line By default
        props.setProgress(10);
        // apikey hide and get to env.local file using props
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${page}&pageSize=${props.pageSize}`;

        // Set the logic for loading
        // Loading gif will occur upto page Load
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

    // Use for go previous page
    // By default previous button is disabled because no previous pages are there to move previous page
    const handlePrevClick = async () => {
        // Page will be decrement by 1 if you click on previous button
        setPage(page - 1)
        updateNews();
    }

    // Use for go Next page
    // When total number of results will be finish at that time you can't able to click the next button
    const handleNextClick = async () => {
        // Page will be increment by 1 if you click on next button
        setPage(page + 1)
        updateNews();
    }

    return (
        <div className='container my-4'>
            <h2 className='text-center' style={{ marginTop: '80px' }} >Top news on {capitalizeFirstLetter(props.category)} Headlines</h2>
            {loading && <Spinner />}
            <div className="row">
                {/* map function is use for looping */}
                {/* It is print the data and works like for loop */}
                {/* It must take return value */}
                {/* slice is use for how many characters you want to show in your website (use for structure style)*/}
                {/* loading is use for when you click on button at that time first loading will start to execute after that content will be display */}
                {!loading && articles.map((element) => {
                    return <div className="col-md-4" key={element.url} >
                        {/* Pass the title, description, images, newsurl, authorname, source, publishing date from the our json file which is store in element array. */}
                        {/* If title is null at that time empty string will be execute */}
                        {/* If description is null at that time empty string will be execute */}
                        <NewsItem title={element.title ? element.title.slice(0, 40) : ""} description={element.description ? element.description.slice(0, 88) : ""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                    </div>
                })}

            </div>
            <div className="container d-flex justify-content-between">
                {/* &larr is use for <- left side arrow or &rarr is use for -> right side arrow */}
                <button disabled={page <= 1} type="button" className="btn btn-sm btn-danger" onClick={handlePrevClick}> &larr; Previous</button>
                <button disabled={page + 1 > Math.ceil(totalResults / props.pageSize)} type="button" className="btn btn-sm btn-danger" onClick={handleNextClick}>Next &rarr;</button>
            </div>
        </div>
    )
}

News.defaultProps = {
    country: "in",
    pageSize: 6,
    category: "general"
}

News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
}

export default News