module.exports = (req, url) => {
	if (url.startsWith('/')) url = url.slice(1);
	return `${req.protocol}://${req.get('host')}/${url}`;
};
