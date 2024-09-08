import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import { db } from '../firebase';
import '../styles/ArticlePreview.css'

export function ArticlePreview(props){

    return (
        <div className='link-container'>
        <Link to={`/post/${props.id}`}>
            <div className='article-container'>
                <div className='text-content'>
                <div className='image-container'>
                        <img src={props.img} className='article-image'/>
                    </div>
                    <h2>{props.title}</h2>
                    
                    <div className='text-preview-content'>
                        <div dangerouslySetInnerHTML={{ __html: props.content }}/>
                        <p><em>Posted on: {new Date(props.date.seconds *1000).toLocaleDateString()}</em></p>
                    </div>
                </div>
                
            </div>

        </Link>
        

        </div>
        
    )


}

export default ArticlePreview;