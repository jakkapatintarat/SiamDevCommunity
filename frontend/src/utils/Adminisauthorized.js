const isAuthorized = () => {
    try {
        const token = localStorage.getItem('token');
        if (token) {
            const decodedPayload = JSON.parse(atob(token.split(".")[1]));
            const profile = decodedPayload.result || decodedPayload;
            if (profile.role === 'admin') {
                return true;
            } else {
                window.location('/login');
                return 'Can not access';
            }
        } else {
            // ถ้าไม่มี token
            window.location('/login');
            return null
        }
    } catch (error) {
        // กรณีเกิด error, ส่งไปหน้า login
        window.location.href = '/login';
        return null;
    }

    // const token = localStorage.getItem('token');
    // if (token) {
    //     const decodedPayload = JSON.parse(atob(token.split(".")[1]));
    //     const profile = decodedPayload.result || decodedPayload;
    //     if(profile.role === 'admin'){
    //         const isAdmin = true;
    //         return isAdmin;
    //     }else{
    //         return 'Can not access to this page';
    //     }
    // } else {
    //     return redirect('/login');
    // }
}

export default isAuthorized;