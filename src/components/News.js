import React, { Component } from 'react'
import NewsItem from './NewsItem'

export class News extends Component {

    // Made constructor for getting the articles
    constructor() {
        super();
        this.state = {
            articles: [],
            loading: false
        }
    }

    // It will run after render
    async componentDidMount() {
        let url = "https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=b856a7b7857d4cb4a80d83ac76be3e4b";
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        this.setState({ articles: parsedData.articles })
    }

    render() {
        return (
            <div className='container my-4'>
                <h2>Top headlines</h2>
                <div className="row">
                    {/* map function is use for looping */}
                    {/* It is print the data and works like for loop */}
                    {/* It must take return value */}
                    {/* slice is use for how many characters you want to show in your website (use for structure style)*/}

                    {this.state.articles.map((element) => {
                        return <div className="col-md-4" key={element.url} >
                            {/* Pass the title, description, images, newsurl from the our json file which is store in element array. */}
                            {/* If title is null at that time empty string will be execute */}
                            {/* If description is null at that time empty string will be execute */}
                            <NewsItem title={element.title ? element.title.slice(0, 40) : ""} description={element.description ? element.description.slice(0, 88) : ""} imageUrl={element.urlToImage} newsUrl={element.url} />
                        </div>
                    })}


                </div>
            </div>
        )
    }
}

export default News
