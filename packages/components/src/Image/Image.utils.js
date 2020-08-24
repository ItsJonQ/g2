const objectFits = ['fill', 'contain', 'cover', 'scale-down', 'none'];

export function getImageObjectFit(fit = 'cover') {
	return objectFits[fit];
}
