import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/FeaturedArticle.css'

export function FeaturedArticle(props){

    return (
        <div className='featured-link-container'>
        
            <div className='featured-container'>
                    <h2>{props.title}</h2>
                    <div className='featured-content-wrapper'>
                        <div className='featured-image-container'>
                            <img src={props.img} className='featured-image'/>
                        </div>
                        <div className='featured-content'>
                            <div dangerouslySetInnerHTML={{ __html: props.content }} />
                            <Link to={`/post/${props.id}`}>
                                <button> Read More </button>
                            </Link>
                        </div>
                    </div>
                    
            </div>
        </div>
        
    )


}

export default FeaturedArticle;