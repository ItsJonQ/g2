import { AnimatePresence } from 'framer-motion';
import React from 'react';

function AnimatedContainer(props) {
	return <AnimatePresence initial={false} {...props} />;
}

export default AnimatedContainer;
