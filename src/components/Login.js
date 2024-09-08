import React, {useState} from 'react';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import '../styles/Login.css'

const Login = ({setIsAuth}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                //signed in
                setIsAuth(true)
                console.log(userCredential.user);
                navigate('/')
            })
            .catch((error) => {
                console.log(error.message);
            })
    };

    return (
        <div className='login-container'>
            <div className='login-fields'>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email' />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password'/>
                <button onClick={handleLogin}>Login</button>
            </div>
            
        </div>
    )
}

export default Login;