import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { FacebookShareButton, TwitterShareButton, LinkedinShareButton, FacebookIcon, TwitterIcon, LinkedinIcon } from 'react-share';

import '../styles/ArticlePage.css'

const ArticlePage = () => {
    const {id} = useParams();
    const [post, setPost] = useState(null);


    useEffect(() => {
        const fetchPost = async () => {
            const postDocRef = doc(db, "posts", id);
            const docSnapshot = await getDoc(postDocRef)
            if(docSnapshot.exists()) {
                setPost(docSnapshot.data());
            }
        };
        fetchPost();
    }, [id]);

    if (!post) return <p>Loading...</p>

    const shareUrl = window.location.href;

    return (
        <div className='whole-article-container'>
            <div className='article-header'>
                <h1>{post.title}</h1>
                <div className='share-buttons'>
                    <FacebookShareButton url={shareUrl} quote={post.title}>
                        <FacebookIcon size={32} round />
                    </FacebookShareButton>
                    <TwitterShareButton url={shareUrl} title={post.title}>
                        <TwitterIcon size={32} round />
                    </TwitterShareButton>
                    <LinkedinShareButton url={shareUrl} title={post.title}>
                        <LinkedinIcon size={32} round />
                    </LinkedinShareButton>
                </div>
            </div>
            
            <img src={post.imageUrl}/>
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
            <p><em>Posted on: {new Date(post.date.seconds *1000).toLocaleDateString()}</em></p>
        
        </div>
    );
};

export default ArticlePage;