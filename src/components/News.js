import React, { Component } from 'react'
import NewsItem from './NewsItem'

export class News extends Component {
    // Array of newsAPI
    articles = [{
        "source": {
            "id": null,
            "name": "Android Central"
        },
        "author": "derrek.lee@futurenet.com (Derrek Lee)",
        "title": "Samsung and Apple duked it out for the top spot in 2022 amid a shrinking market",
        "description": "The latest report on smartphone shipments in 2022 show highlight tough economic times for OEMs.",
        "url": "https://www.androidcentral.com/phones/smartphone-market-share-2022",
        "urlToImage": "https://cdn.mos.cms.futurecdn.net/c3bTdgetMPKi6PMM2CdtLU-1200-80.jpg",
        "publishedAt": "2023-01-19T01:19:50Z",
        "content": "<ul><li>The latest report shows smartphone shipments fell by 17% in 2022.</li><li>Apple managed to gain the top spot in Q2 2022, no doubt thanks to the iPhone 14 series.</li><li>Samsung shipped the m… [+2170 chars]"
    },
    {
        "source": {
            "id": null,
            "name": "MacRumors"
        },
        "author": "Joe Rossignol",
        "title": "New MacBook Air With 3nm M3 Chip Rumored to Launch in Second Half of 2023",
        "description": "Apple plans to release a new MacBook Air in the second half of 2023, and it may be equipped with a 3nm chip, according to a report today from Taiwanese publication DigiTimes. This chip would likely be Apple's next-generation M3 chip, which would offer faster …",
        "url": "https://www.macrumors.com/2023/01/18/macbook-air-3nm-chip-2023-rumor/",
        "urlToImage": "https://images.macrumors.com/t/-BtwaFh2UjQ4OYXvwZ34U3u-Fhg=/2375x/article-new/2022/07/MacBook-Air-M2-Chip-Purple-Feature.jpg",
        "publishedAt": "2023-01-19T04:42:09Z",
        "content": "Apple plans to release a new MacBook Air in the second half of 2023, and it may be equipped with a 3nm chip, according to a report today from Taiwanese publication DigiTimes. This chip would likely b… [+1792 chars]"
    },
    {
        "source": {
            "id": null,
            "name": "CNET"
        },
        "author": "Alix Langone",
        "title": "Apple Is Reportedly Developing More Smart Home Products - CNET",
        "description": "A smart display that can control thermostats and lights is reportedly in the works.",
        "url": "https://www.cnet.com/tech/apple-is-reportedly-developing-more-smart-home-products/",
        "urlToImage": "https://www.cnet.com/a/img/resize/93848332984a8c0e1a3c4c9acc18ccd7a7f0cbec/hub/2022/06/06/0a691932-5528-436c-a3ac-dcdfbc985fd7/apple-event-060622-67.jpg?auto=webp&fit=crop&height=630&width=1200",
        "publishedAt": "2023-01-19T02:14:32Z",
        "content": "Apple is developing new smart home products in an effort to grow its footprint in the smart home market, Bloomberg reported on Wednesday. \r\nThe new products will range from a speedier Apple TV set to… [+982 chars]"
    },
    {
        "source": {
            "id": null,
            "name": "9to5Mac"
        },
        "author": "Filipe Espósito",
        "title": "Dropbox users complain about broken AirDrop support on macOS Ventura",
        "description": "Multiple users of the popular cloud file platform Dropbox have been complaining about a new bug that causes AirDrop to no longer work for Dropbox files on macOS Ventura. The complaints follow the release of a new update to the Dropbox app for Mac that enables…",
        "url": "https://9to5mac.com/2023/01/18/dropbox-macos-airdrop-bug-update/",
        "urlToImage": "https://i0.wp.com/9to5mac.com/wp-content/uploads/sites/6/2022/01/dropbox-macOS.jpg?resize=1200%2C628&quality=82&strip=all&ssl=1",
        "publishedAt": "2023-01-19T00:19:40Z",
        "content": "Multiple users of the popular cloud file platform Dropbox have been complaining about a new bug that causes AirDrop to no longer work for Dropbox files on macOS Ventura. The complaints follow the rel… [+2081 chars]"
    },
    {
        "source": {
            "id": null,
            "name": "AppleInsider"
        },
        "author": "news@appleinsider.com (Amber Neely)",
        "title": "Apple announces premiere dates for more Apple TV+ shows",
        "description": "Apple has announced premiere dates for additional Apple TV+ offerings available this spring, including the return of \"The Afterparty\" and \"Schmigadoon!\"Image Credit: AppleApple TV+ spring lineup continues as \"Schmigadoon!,\" \"City on Fire,\" \"The Last Thing He …",
        "url": "https://appleinsider.com/articles/23/01/19/apple-announces-premiere-dates-for-more-apple-tv-shows",
        "urlToImage": "https://photos5.appleinsider.com/gallery/52547-104937-011823_ATV_award_winning_musical_comedy_schmigadoon_takes_the_stage_for_season_two_Big_Image_01_big_image_postjpglarge_2x-xl.jpg",
        "publishedAt": "2023-01-19T00:46:17Z",
        "content": "Image Credit: Apple\r\nAppleInsider may earn an affiliate commission on purchases made through links on our site.\r\nApple has announced premiere dates for additional Apple TV+ offerings available this s… [+2236 chars]"
    }]

    // Made constructor for getting the articles
    constructor() {
        super();
        this.state = {
            articles: this.articles,
            loading: false
        }
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
                            <NewsItem title={element.title.slice(0, 40)} description={element.description.slice(0, 88)} imageUrl={element.urlToImage} newsUrl={element.url} />
                        </div>
                    })}


                </div>
            </div>
        )
    }
}

export default News
