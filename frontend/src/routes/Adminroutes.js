import { Route, Routes } from "react-router-dom";
import Dashboard from "../components/admin/Dashboard"
import Sidebar from "../components/admin/Sidebar"
export default function AdminRoutes() {
    return (
        <>
        <Routes>
            {/* User Routes */}
            <Route path='/admin' element={<><Sidebar/><Dashboard/></>} />
        </Routes>
        </>
    )
}