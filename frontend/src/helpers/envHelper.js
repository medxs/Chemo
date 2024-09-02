const getEnvironmentUrl = () => {
    if (process.env.REACT_APP_NODE_ENV === 'production') {
        return 'https://your-production-url.com';
    } else {
        return process.env.REACT_APP_BACKEND_URL; // or any other development/staging URL
    }
};

export default getEnvironmentUrl;