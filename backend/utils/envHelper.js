const getEnvironmentUrl = (req, res) => {
    if (process.env.NODE_ENV === 'production') {
        return `${req.protocol}://${req.get('host')}`;
    } else {
        return process.env.BACKEND_URL; // or any other development/staging URL
    }
};

module.exports = getEnvironmentUrl;
