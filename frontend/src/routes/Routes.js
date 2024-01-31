import { Routes, Route } from "react-router-dom"
import Login from "../components/user/Login"
import Homepage from "../components/user/Homepage"
import AboutMe from "../components/user/AboutMe"
import Blogs from "../components/user/Blogs"
import Community from "../components/user/Community"
import Profile from "../components/user/Profile"
import Register from "../components/user/Register"
import Navbar from "../components/user/Navbar"
import BlogDetail from "../components/user/BlogDetail"
import CreateBlog from "../components/user/CreateBlog"

export default function Web() {
    return (
        <>
        <Routes>
            {/* User Routes */}
            <Route path='/login' element={<><Navbar/><Login /></>} />
            <Route path='/aboutme' element={<><Navbar/><AboutMe/></>} />
            <Route path='/blogs' element={<><Navbar/><Blogs/></>} />
            <Route path='/blogs/:blogId' element={<><Navbar/><BlogDetail/></>} />
            <Route path='/community' element={<><Navbar/><Community/></>} />
            <Route path='/' element={<><Navbar/><Homepage/></>} />
            <Route path='/profile' element={<><Navbar/><Profile/></>} />
            <Route path='/register' element={<><Navbar/><Register/></>} />
            <Route path='/createblog' element={<><Navbar/><CreateBlog/></>} />
        </Routes>
        </>
    )
}