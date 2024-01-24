import { Routes, Route } from "react-router-dom"
import Login from "../components/user/Login"
import Homepage from "../components/user/Homepage"

export default function Web(){
    return (
        <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='/' element={<Homepage/>} />
        </Routes>
    )
}