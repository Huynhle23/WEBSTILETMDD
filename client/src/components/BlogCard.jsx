import React from 'react';
import { Link } from 'react-router-dom';

const BlogCard = (props) => {
    const {id,image,description,title,date}=props
    return (
        // <div className='col-3'>
            <div className="blog-card">
                <div className="card-image">
                    <img className='img-fluid w-100' height={306}  src={image} alt="blog" />
                </div>
                <div className="blog-content">
                    <p className="date">{date}</p>
                    <h5 className="title">{title}</h5>
                    <p className="desc" 
                        dangerouslySetInnerHTML={{__html: description?.substr(0,70)+"..."}}
                    >
                        {/* {description} */}
                    </p>
                    <Link to={`/blog/${id}`} className='button'>Read More</Link>
                </div>
            </div>
        // </div>
    );
}

export default BlogCard;
