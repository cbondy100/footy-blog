import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import { db } from '../firebase';
import { getDocs, collection, query, orderBy } from 'firebase/firestore';
import ArticlePreview from './ArticlePreview';
import '../styles/Archive.css'


const Archive = () => {
    const [posts, setPosts] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredPosts, setFilteredPosts] = useState([]);

    const postCollectionref = collection(db, "posts")


    useEffect(() => {
        const fetchPosts = async () => {
            const postsQuery = query(postCollectionref, orderBy("date", "desc"));
            const snapshot = await getDocs(postsQuery);
            const postsData = snapshot.docs.map(doc => ({id: doc.id, ...doc.data()}));
            setPosts(postsData);
            setFilteredPosts(postsData);
        };
        fetchPosts();
    }, []);

    useEffect(() => {
        const filtered = posts.filter(post =>
            post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.content.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredPosts(filtered);
    }, [searchQuery, posts]);

    return (
        <div>
            <div className='archive-page'>
                <h2 className='archive-header'>Article Archive</h2>
                <input
                    type="text"
                    placeholder='Search articles...'
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className='search-bar'
                />
                <div className='archive-content-wrapper'>
                    <div className='archive-content'>
                        {filteredPosts.map(post => (
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
        </div>
    )

}

export default Archive;