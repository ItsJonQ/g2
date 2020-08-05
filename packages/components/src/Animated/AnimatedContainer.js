import { AnimatePresence } from '@wp-g2/animations';
import React from 'react';

function AnimatedContainer(props) {
	return <AnimatePresence initial={false} {...props} />;
}

export default AnimatedContainer;
