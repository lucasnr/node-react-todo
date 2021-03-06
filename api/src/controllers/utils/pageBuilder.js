module.exports = async (model, page = 0, size = 5, query = {}) => {
	const content = await model
		.find(query)
		.skip(page * size)
		.limit(size);

	const totalElements = await model.countDocuments(query);
	const totalPages = Math.ceil(totalElements / size);
	const numberOfElements = content.length;
	const first = page === 0;
	const last = page + 1 === totalPages;
	const empty = content.length === 0;

	return {
		content,
		totalElements,
		totalPages,
		numberOfElements,
		page,
		size,
		first,
		last,
		empty,
	};
};
