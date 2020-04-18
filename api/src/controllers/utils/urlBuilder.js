module.exports = (req, url) => `${req.protocol}://${req.get('host')}/${url}`;
