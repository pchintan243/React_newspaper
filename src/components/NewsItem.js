import React from 'react'

const NewsItem = (props) => {

  // props is use for who's value will be change
  let { title, description, imageUrl, newsUrl, author, date, source } = props;
  return (
    <div className='my-3'>
      <div className="card" style={{ width: "18rem" }}>

        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
          {source}
          <span className="visually-hidden">unread messages</span>
        </span>

        {/* If imageurl is null at that time default link will be execute */}
        <img src={!imageUrl ? "https://i.ytimg.com/vi/6zISyEq9Daw/maxresdefault.jpg" : imageUrl} className='card-img-top' alt="..." />

        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{description}</p>
          <p className='card-text'><small className='text-danger'>By {!author ? "Unknown" : author} <br />{new Date(date).toGMTString()}</small></p>

          <a rel="noreferrer" href={newsUrl} target="_blank" className='btn btn-sm btn-danger'>Read More</a>
        </div>
      </div>
    </div>
  )
}

export default NewsItem
