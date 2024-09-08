import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import { db } from '../firebase';
import { getDocs, collection, query, orderBy } from 'firebase/firestore';
import ArticlePreview from './ArticlePreview';
import FeaturedArticle from './FeaturedArticle';
import '../styles/HomePage.css'
import EPLStanding from './EPLStanding';

const HomePage = () => {
    const [posts, setPosts] = useState([]);

    const postCollectionref = collection(db, "posts")


    useEffect(() => {
        const fetchPosts = async () => {
            const postsQuery = query(postCollectionref, orderBy("date", "desc"));
            const snapshot = await getDocs(postsQuery);
            const postsData = snapshot.docs.map(doc => ({id: doc.id, ...doc.data()}));
            setPosts(postsData);
        };
        fetchPosts();
    }, []);
    
    return (
        <div>
            {posts.length > 0 && (
                <div className='featured-article'>
                    <FeaturedArticle
                    key={posts[0].id}
                    title={posts[0].title}
                    id={posts[0].id}
                    content={posts[0].content.substring(0,200) + "..."}
                    img={posts[0].imageUrl}
                    date={posts[0].date}
                />
        </div>

            )}
        
            <div className='article-content-wrapper'>
                <h2 className='featured-header'>Recent Articles</h2>
                <div className='article-content'>
                    {posts.slice(1, 4).map(post => (
                        <ArticlePreview
                            key={post.id}
                            title={post.title}
                            id={post.id}
                            content={post.content.substring(0,100) + "..."}
                            img={post.imageUrl}
                            date={post.date}
                        />
                    ))}
                </div>

            </div>
        
        </div>
    );
};

export default HomePage;
