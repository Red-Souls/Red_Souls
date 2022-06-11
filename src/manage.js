import { Routes, Route } from 'react-router-dom'
import axios from 'axios'
import Home from './components/home.js'
import Social_Network from './components/social_network.js'
import Post from './components/post.js'
import Register from './components/register.js'
import Login from './components/login.js'
import Profile from './components/profile.js'
import Messenger from './components/messenger.js'
import Message_Chat from './components/message_chat.js'

export const API = axios.create({
    baseURL: 'http://localhost:16/',
})

export default function BaseRouter() {
    return (
        <div>
            <Routes>
                <Route path="/" element={ <Home></Home> }></Route>
                <Route path="/social_network/" element={ <Social_Network></Social_Network> }></Route>
                <Route path="/social_network/:id/" element={ <Post></Post> }></Route>
                <Route path="/register/" element={ <Register></Register> }></Route>
                <Route path="/login/" element={ <Login></Login> }></Route>
                <Route path="/profile/:id/" element={ <Profile></Profile> }></Route>
                <Route path="/messenger/" element={ <Messenger></Messenger> }></Route>
                <Route path="/message_chat/:id/" element={ <Message_Chat></Message_Chat> }></Route>
            </Routes>
        </div>
    )
}