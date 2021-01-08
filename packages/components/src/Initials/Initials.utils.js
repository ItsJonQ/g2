export function getInitials(name = '') {
	if (typeof name !== 'string') return '';

	const names = name
		.split(' ')
		.map((name) => name.charAt(0))
		.filter((name, index) => index < 2)
		.join('');

	return names;
}
