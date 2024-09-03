const getEnvironmentUrl = (req, res) => {
    if (process.env.REACT_APP_NODE_ENV === 'production') {
        return `${req.protocol}://${req.get('host')}`;
    } else {
        return process.env.REACT_APP_BACKEND_URL; // or any other development/staging URL
    }
};

export default getEnvironmentUrl;