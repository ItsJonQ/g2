import React, { useState } from 'react';

import { AnimatePresence, motion } from '../index';

export default {
	title: 'Animations',
};

const list = {
	hidden: {
		opacity: 0,
		transition: {
			when: 'afterChildren',
		},
	},
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.3,
			when: 'beforeChildren',
		},
	},
};

const App = () => {
	const [count, setCount] = useState(3);
	const items = [...Array(count)].fill(0).map((v, i) => i);

	return (
		<>
			<button onClick={() => setCount(count + 1)}>Add</button>
			<button onClick={() => setCount(count - 1)}>Remove</button>
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<div className="example-container">
				<motion.div
					animate="visible"
					initial="hidden"
					style={{
						display: 'grid',
						gridTemplateColumns: 'repeat(3, 1fr)',
						width: 300,
					}}
					variants={list}
				>
					<AnimatePresence initial={false}>
						{items.map((i) => (
							<motion.div
								animate={{ opacity: 1, scale: 1, y: 0 }}
								exit={{
									opacity: 0,
									scale: 0.5,
									transition: { duration: 0.2 },
									y: -20,
								}}
								initial={{ opacity: 0, scale: 0.3, y: 20 }}
								key={`item-${i}`}
								style={{ background: '#eee', padding: 20 }}
							>
								Item
							</motion.div>
						))}
					</AnimatePresence>
				</motion.div>
			</div>
		</>
	);
};

export const _default = () => {
	return <App />;
};
