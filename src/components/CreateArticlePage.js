import React, { useState, useEffect, useRef } from 'react';
import {useNavigate} from 'react-router-dom';
import { db } from '../firebase';
import {auth} from '../firebase';
import { addDoc, collection } from 'firebase/firestore';
import {getStorage, ref, uploadBytes, getDownloadURL} from 'firebase/storage';
import { upload } from '@testing-library/user-event/dist/upload';
import '../styles/CreateArticlePage.css'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // import React Quill styles


const CreateArticlePage = ({isAuth}) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [image, setImage] = useState(null)
    const navigate = useNavigate();

    //const contentRef = useRef(null)

    const postCollectionRef = collection(db, "posts")

    async function getPhoto(file) {
        console.log("getting photo")
        const storage = getStorage();
        const storageRef = ref(storage, `images/${Date.now()}_${file.name}`);
        console.log("getting snapshot")
        const snapshot = await uploadBytes(storageRef, file)
        return await getDownloadURL(snapshot.ref);
    }

    const handleCreatePost = async () => {
        console.log("creating post")
        if (!title.trim() || !content.trim()) {
            alert('Title and content are required');
            return;
        }

        try {
            // Upload the image if there's one
            let imageUrl = '';
            if (image) {
                imageUrl = await getPhoto(image);
                console.log(imageUrl)
            }

            const formattedContent = content
            .split('\n')
            .filter(line => line.trim() !== '')
            .map(line => `<p>${line}</p>`)
            .join('');

            // Create a new post document
            const newPost = {
                title,
                content:formattedContent,
                date: new Date(),
                authorId: auth.currentUser.uid,
                authorEmail: auth.currentUser.email,
                imageUrl, // Save the image URL if it exists
            };

            await addDoc(postCollectionRef, newPost);
            navigate('/');
            
        } catch (error) {
            console.error('Error creating post:', error);
            alert('Failed to create post. Please try again.');
        }
    };

    useEffect(() => {
        if (!isAuth) {
            navigate('/login');
        }
    }, [isAuth, navigate]);

    // useEffect(() => {
    //     const resizeTextArea = () => {
    //         if (contentRef.current) {
    //             contentRef.current.style.height = 'auto';
    //             contentRef.current.style.height = contentRef.current.scrollHeight + 'px';
    //         }
    //     };
    //     resizeTextArea();
    // }, [content])

    return (
        <div className='create-container'>
            <div className='input-fields-container'>
            <input
                type="file"
                accept='image/*'
                placeholder='Choose Header Image'
                onChange={(e)=> setImage(e.target.files[0])}
            />
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder='Article Title'
                className='create-article-title'
            />
            <ReactQuill
                value={content}
                onChange={setContent}
                placeholder="Content..."
            />
            <button onClick={handleCreatePost}>Create Post</button>
            </div>
        </div>
    );
};

export default CreateArticlePage;