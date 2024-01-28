const isAuthorized = () => {
    const token = localStorage.getItem('token');
    console.log(token);
    if (token !== null) {
        const decodedPayload = JSON.parse(atob(token.split(".")[1]));
        const profile = decodedPayload.result || decodedPayload;
        if (profile.role === 'admin') {
            return true
        } else {
            return false
        }
    } else {
        window.location.href = '/login'
        return false
    }
}

export default isAuthorized;