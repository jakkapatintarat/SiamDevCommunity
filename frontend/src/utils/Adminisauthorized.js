const isAuthorized = () => {
    const token = localStorage.getItem('token');
    // console.log(token);
    if (token !== null) {
        const decodedPayload = JSON.parse(atob(token.split(".")[1]));
        const profile = decodedPayload.result || decodedPayload;
        // console.log(profile);
        const role = profile.role
        if (role !== "admin") {
            window.location.href = '/admin/login'
            return false
        } else {
            return true
        }
    } else {
        window.location.href = '/admin/login'
        return false
    }
}

export default isAuthorized;