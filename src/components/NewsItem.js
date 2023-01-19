import React, { Component } from 'react'

export class NewsItem extends Component {

  render() {
    // props is use for who's value will be change
    let { title, description, imageUrl, newsUrl } = this.props;
    return (
      <div className='my-3'>
        <div className="card" style={{ width: "18rem" }}>
          {/* If imageurl is null at that time default link will be execute */}
          <img src={!imageUrl ? "https://i.ytimg.com/vi/6zISyEq9Daw/maxresdefault.jpg" : imageUrl} className='card-img-top' alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}...</h5>
            <p className="card-text">{description}...</p>
            <a rel="noreferrer" href={newsUrl} target="_blank" className='btn btn-sm btn-danger'>Read More</a>
          </div>
        </div>
      </div>
    )
  }
}

export default NewsItem
