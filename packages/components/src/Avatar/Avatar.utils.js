export const AVATAR_SHAPES = {
	circle: 999999,
	square: 8,
};

export const AVATAR_SIZES = {
	xLarge: 48,
	large: 36,
	medium: 30,
	small: 24,
	xSmall: 16,
};

export function getSize(size) {
	const defaultSize = AVATAR_SIZES.medium;

	if (AVATAR_SIZES[size]) {
		return AVATAR_SIZES[size];
	}

	return typeof size === 'number' ? size : defaultSize;
}

export function getBorderRadius(shape, size = AVATAR_SIZES.medium) {
	const supported = AVATAR_SHAPES[shape];

	if (shape === 'square' && size < AVATAR_SIZES.small + 1) {
		return AVATAR_SHAPES.square / 2;
	}

	return supported || shape;
}

export function getInitialsTextSize(size = AVATAR_SIZES.medium) {
	let textSize = size < AVATAR_SIZES.medium ? 11 : undefined;

	if (size < AVATAR_SIZES.medium + 1) {
		textSize = 12;
	}

	if (size < AVATAR_SIZES.small + 1) {
		textSize = 10;
	}

	if (size < AVATAR_SIZES.xSmall + 1) {
		textSize = 8;
	}

	return textSize;
}
