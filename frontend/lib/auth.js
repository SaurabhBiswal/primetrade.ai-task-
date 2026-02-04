export const getToken = () => {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('token');
};

export const setToken = (token) => {
    if (typeof window === 'undefined') return;
    localStorage.setItem('token', token);
};

export const removeToken = () => {
    if (typeof window === 'undefined') return;
    localStorage.removeItem('token');
    localStorage.removeItem('user');
};

export const getUser = () => {
    if (typeof window === 'undefined') return null;
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
};

export const setUser = (user) => {
    if (typeof window === 'undefined') return;
    localStorage.setItem('user', JSON.stringify(user));
};

export const isAuthenticated = () => {
    return !!getToken();
};
