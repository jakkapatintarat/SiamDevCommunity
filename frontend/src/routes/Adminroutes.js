import { Route, Routes } from "react-router-dom";
import Dashboard from "../components/admin/Dashboard"
import Sidebar from "../components/admin/Sidebar"
import Manageuser from "../components/admin/Manageuser";
import Manageblog from "../components/admin/Manageblog";
import LoginAdmin from "../components/admin/LoginAdmin";
import Manageprofile from "../components/admin/Manageprofile";
import ManageAdminBlog from "../components/admin/Manageblogadmin";
export default function AdminRoutes() {
    return (
        <>
        <Routes>
            {/* Admin Routes */}
            <Route path='/admin' element={<><Sidebar/><Dashboard/></>} />
            <Route path='/admin/login' element={<><LoginAdmin/></>} />
            <Route path='/admin/manageuser' element={<><Sidebar/><Manageuser/></>} />
            <Route path='/admin/manageblog' element={<><Sidebar/><Manageblog/></>} />
            <Route path='/admin/manageadminblog' element={<><Sidebar/><ManageAdminBlog/></>} />
            <Route path='/admin/profile' element={<><Sidebar/><Manageprofile/></>} />
        </Routes>
        </>
    )
}