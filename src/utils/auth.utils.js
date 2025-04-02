import jwt_decode from 'jwt-decode';

export const checkTokenExpiration = () => {
    const token = localStorage.getItem('token');
    if(!token) return true;

    const decodedToken = jwt_decode(token);
    const isTokenExpired = decodedToken.exp * 1000 < Date.now();

    if(isTokenExpired) {
        console.log('Token has expired. Redirecting to login...');
        return true;
    }

    return false;
};