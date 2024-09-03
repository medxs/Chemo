const getEnvironmentUrl = (req, res) => {
    const env = process.env.REACT_APP_NODE_ENV || 'development';
    if (env === 'production') {
        return `${req.protocol}://${req.get('host')}`;
    } else {
        return process.env.REACT_APP_BACKEND_URL || 'http://localhost:8000'; // Default fallback for development
    }
};

export default getEnvironmentUrl;
