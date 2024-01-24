import { Routes, Route } from "react-router-dom"
import SignUp from "../components/SignUp"
import SignIn from "../components/SignIn"
import Homepage from "../components/Home"

export default function Web(){
    return (
        <Routes>
            <Route path='/signin' element={<SignIn />} />
            <Route path='/signup' element={<SignUp />} />
            <Route path="/homepage" element={<Homepage/>} />
        </Routes>
    )
}