const TOKEN_KEY = 'login';

export const setLogin = (props) => {
    localStorage.setItem(TOKEN_KEY, JSON.stringify(props));
}

export const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
}

export const isLogin = () => {
    if (localStorage.getItem(TOKEN_KEY)) {
        return true;
    }
    return false;
}