import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'

export class News extends Component {

    static defaultProps = {
        country: "in",
        pageSize: 9,
        category: "general"
    }

    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string
    }
    // Made constructor for getting the articles
    constructor() {
        super();
        this.state = {
            articles: [],
            loading: false,
            page: 1
        }
    }

    // It will run after render
    async componentDidMount() {
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=b856a7b7857d4cb4a80d83ac76be3e4b&page=1&pageSize=${this.props.pageSize}`;
        // Set the logic for loading
        // Loading gif will occur up to page Load
        this.setState({ loading: true });
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        this.setState({
            articles: parsedData.articles,
            totalResults: parsedData.totalResults,
            // loading false after all data loaded succesfully
            loading: false
        })
    }

    // Use for go previous page
    handlePrevClick = async () => {
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=b856a7b7857d4cb4a80d83ac76be3e4b&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true });
        let data = await fetch(url);
        let parsedData = await data.json();
        // Page will be decrement by 1 if you click on previous button
        this.setState({
            page: this.state.page - 1,
            articles: parsedData.articles,
            loading: false
        })
    }

    // Use for go Next page
    // When total number of results will be finish at that time you can't able to click the next button
    handleNextClick = async () => {
        if (!(this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize))) {

            let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=b856a7b7857d4cb4a80d83ac76be3e4b&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
            this.setState({ loading: true });
            let data = await fetch(url);
            let parsedData = await data.json();
            // Page will be increment by 1 if you click on next button
            this.setState({
                page: this.state.page + 1,
                articles: parsedData.articles,
                loading: false
            })
        }
    }

    render() {
        return (
            <div className='container my-4'>
                <h2 className='text-center'>Top headlines</h2>
                {this.state.loading && <Spinner />}
                <div className="row">
                    {/* map function is use for looping */}
                    {/* It is print the data and works like for loop */}
                    {/* It must take return value */}
                    {/* slice is use for how many characters you want to show in your website (use for structure style)*/}
                    {/* loading is use for when you click on button at that time first loading will start to execure after that content will be display */}
                    {!this.state.loading && this.state.articles.map((element) => {
                        return <div className="col-md-4" key={element.url} >
                            {/* Pass the title, description, images, newsurl from the our json file which is store in element array. */}
                            {/* If title is null at that time empty string will be execute */}
                            {/* If description is null at that time empty string will be execute */}
                            <NewsItem title={element.title ? element.title.slice(0, 40) : ""} description={element.description ? element.description.slice(0, 88) : ""} imageUrl={element.urlToImage} newsUrl={element.url} />
                        </div>
                    })}


                </div>
                <div className="container d-flex justify-content-between">
                    {/* &larr is use for <- left side arrow or &rarr is use for -> right side arrow */}
                    <button disabled={this.state.page <= 1} type="button" className="btn btn-sm btn-danger" onClick={this.handlePrevClick}> &larr; Previous</button>
                    <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" className="btn btn-sm btn-danger" onClick={this.handleNextClick}>Next &rarr;</button>
                </div>
            </div>
        )
    }
}

export default News
