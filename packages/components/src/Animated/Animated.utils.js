import { motion } from '@wp-g2/animations';
import { createCoreElement } from '@wp-g2/styles';
import { memoize } from '@wp-g2/utils';

function baseCreateAnimated(tagName) {
	const motionComponent = motion[tagName];
	return createCoreElement(motionComponent);
}

export const createAnimated = memoize(baseCreateAnimated);
