import { Routes, Route } from "react-router-dom"
import Login from "../components/user/Login"
import Homepage from "../components/user/Homepage"
import AboutMe from "../components/user/AboutMe"
import Blog from "../components/user/Blog"
import Community from "../components/user/Community"
import Profile from "../components/user/Profile"
import Register from "../components/user/Register"

export default function Web(){
    return (
        <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='/aboutme' element={<AboutMe/>} />
            <Route path='/blog' element={<Blog/>} />
            <Route path='/community' element={<Community/>} />
            <Route path='/' element={<Homepage/>} />
            <Route path='/profile' element={<Profile/>} />
            <Route path='/register' element={<Register/>} />
        </Routes>
    )
}