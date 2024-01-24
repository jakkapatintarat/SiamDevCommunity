import { Routes, Route } from "react-router-dom"
import Login from "../components/login"

export default function Web(){
    return (
        <Routes>
            <Route path='/login' element={<Login />} />
        </Routes>
    )
}