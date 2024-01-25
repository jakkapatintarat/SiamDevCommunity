import { Route, Routes } from "react-router-dom";
import Homepage from "../components/user/Homepage";

export default function AdminRoutes() {
    return (
        <>
        <Routes>
            {/* User Routes */}
            <Route path='admin/login' element={<><Homepage/></>} />
        </Routes>
        </>
    )
}