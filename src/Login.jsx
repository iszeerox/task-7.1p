import React,{useState} from 'react'
import Input from './Input'
import Button from './Button'
import './App.css'
import {Link} from 'react-router-dom'
import './Login.css'
import { signInWithGooglePopup, CreateUserDocFromAuth } from './utils/firebase'
import { async } from '@firebase/util'
const Login = (props)=>{
const logGoogleUser = async() =>{
    const {user} = await signInWithGooglePopup()
    const userDocRef = await CreateUserDocFromAuth(user)
}
        const [contact, setContact] = useState({
            username: '',
            password: ''
        })

    

    
    const handleChange = (event)=>{
        const {name, value} = event.target
        setContact ((preValue)=>{  
        return {
        ...preValue,
        [name]: value
        }
        })
    }


 
    return <div className= 'header-div'>
      
       <Input 
       name= 'username'
       type= 'text'
       placeholder ='username'
       onChange = {handleChange}
       value = {contact.username}
       />

       <br></br>

       <Input 
       name='password'
       type= 'password'
       placeholder ='password'
       onChange = {handleChange}
       value = {contact.password}
       />

       <br></br>

       <Button 
           type = 'submit'
           text='Login'
       />

       <br></br>
       
       <button onClick={logGoogleUser}>
        log in with Google 
       </button>

       <br></br>
       <br></br>

       <Link to='/signup'>
        Sign up instead 
       </Link>

    </div>

}
export default Login