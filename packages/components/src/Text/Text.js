import React from 'react';
import { TextView } from './Text.styles';

export function Text({
	as = 'span',
	weight = 400,
	lineHeight = 1.2,
	...props
}) {
	return (
		<TextView as={as} lineHeight={lineHeight} weight={weight} {...props} />
	);
}
