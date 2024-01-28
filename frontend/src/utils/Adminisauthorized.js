const isAuthorized = () => {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            console.log('ไม่พบ token');
            return false
        } else {
            const decodedPayload = JSON.parse(atob(token.split(".")[1]));
            const profile = decodedPayload.result || decodedPayload;
            if (profile.role === 'admin') {
                return true
            } else {
                return false
            }
        }
    } catch (error) {
        console.log(error);
        return false
    }
}

export default isAuthorized;