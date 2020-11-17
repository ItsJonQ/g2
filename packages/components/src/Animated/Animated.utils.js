import { createCoreElement } from '@wp-g2/styles';
import { memoize } from '@wp-g2/utils';
import { motion } from 'framer-motion';

function baseCreateAnimated(tagName) {
	const motionComponent = motion[tagName];
	return createCoreElement(motionComponent);
}

export const createAnimated = memoize(baseCreateAnimated);
