import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

// After 34 video this news2.js file implemented

export class News2 extends Component {

    static defaultProps = {
        country: "in",
        pageSize: 6,
        category: "general"
    }

    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string
    }

    // Capitalize the categories
    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    // Made constructor for getting the articles
    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            loading: true,
            page: 1,
            totalResults: 0
        }

        // Changing the title based on news categories as well capital the first letter of category
        document.title = `${this.capitalizeFirstLetter(this.props.category)} - Taaza Khabar`;
    }

    // Follows DRY principle
    async updateNews() {
        // Set the loading line initially
        this.props.setProgress(10);
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=b856a7b7857d4cb4a80d83ac76be3e4b&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true });
        let data = await fetch(url);
        // Set the loading line upto fetch data
        this.props.setProgress(40);
        let parsedData = await data.json();
        // Set the loading line upto parsed data
        this.props.setProgress(70);
        this.setState({
            articles: parsedData.articles,
            totalResults: parsedData.totalResults,
            // loading false after all data loaded succesfully
            loading: false
        })
        // When page will be loaded loading line will be finish
        this.props.setProgress(100);
    }

    // It will run after render
    async componentDidMount() {
        this.updateNews();
    }

    fetchMoreData = async () => {
        this.setState({ page: this.state.page + 1 })
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=b856a7b7857d4cb4a80d83ac76be3e4b&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        let data = await fetch(url);
        let parsedData = await data.json();

        this.setState({
            articles: this.state.articles.concat(parsedData.articles),
            totalResults: parsedData.totalResults
        })
    };

    render() {
        return (
            <>
                <h2 className='text-center'>Top news on {this.capitalizeFirstLetter(this.props.category)} Headlines</h2>
                {this.state.loading && <Spinner />}

                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length !== this.state.totalResults}
                    loader={<Spinner />}
                >
                    <div className='container my-4'>
                        <div className="row">
                            {/* map function is use for looping */}
                            {/* It is print the data and works like for loop */}
                            {/* It must take return value */}
                            {/* slice is use for how many characters you want to show in your website (use for structure style)*/}
                            {/* loading is use for when you click on button at that time first loading will start to execure after that content will be display */}
                            {this.state.articles.map((element) => {
                                return <div className="col-md-4" key={element.url}>
                                    {/* Pass the title, description, images, newsurl from the our json file which is store in element array. */}
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
}

export default News2