import { AnimatePresence } from '@wp-g2/animations';
import React from 'react';

function Alerts({ children }) {
	return <AnimatePresence initial={false}>{children}</AnimatePresence>;
}

export default Alerts;
