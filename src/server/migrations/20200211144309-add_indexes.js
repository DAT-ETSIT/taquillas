module.exports = {
	up: (queryInterface) => queryInterface.addIndex(
		'Users',
		['dni'],
	)
		.then(() => queryInterface.addIndex(
			'Users',
			['phone'],
		)),

	down: (queryInterface) => queryInterface.removeIndex(
		'Users',
		['dni'],
	)
		.then(() => queryInterface.removeIndex(
			'Users',
			['phone'],
		)),
};
