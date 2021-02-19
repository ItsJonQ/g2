import { motion, useMotionValue, useTransform } from 'framer-motion';
import { clamp } from 'lodash';
import React from 'react';

import { Card, View } from '../../index';

export default {
	title: 'Examples/WIP/ActionSheet',
};

export const _default = () => {
	const [dismissed, setDismissed] = React.useState(false);
	const [expanded, setExpanded] = React.useState(false);
	const [dragging, setDragging] = React.useState(false);
	const y = useMotionValue(0);
	const dy = y;
	const opacity = useTransform(dy, [0, -50, -400], [0, 0, 1]);

	React.useEffect(() => {
		if (dismissed) {
			setExpanded(false);
		}
	}, [dismissed]);

	const variants = {
		expanded: {
			y: -400,
		},
		collapsed: {
			y: 0,
		},
		dismissed: {
			y: 400,
		},
	};

	return (
		<Card
			css={{
				background: '#eee',
				position: 'absolute',
				top: '50%',
				left: '50%',
				transform: 'translate(-50%,-50%)',
				width: 600,
				height: 600,
				overflow: 'hidden',
				padding: '0 20px',
			}}
		>
			<button onClick={() => setDismissed((p) => !p)}>Toggle</button>
			<motion.div
				animate={
					dismissed
						? 'dismissed'
						: dragging
						? 'dragging'
						: expanded
						? 'expanded'
						: 'collapsed'
				}
				style={{
					position: 'absolute',
					bottom: `-80%`,
					width: `calc(100% - 20px)`,
					left: 10,
					zIndex: 2,
					right: 10,
					y: dy,
				}}
				transition={{ type: 'spring', bounce: 0.3, duration: 0.4 }}
				variants={variants}
			>
				<div style={{ position: 'relative' }}>
					<motion.div
						dragMomentum={false}
						onPan={(event, info) => {
							setDragging(true);
							dy.set(clamp(dy.get() + info.delta.y, -450, 250));
						}}
						onPanEnd={(event, info) => {
							const { y } = info.offset;
							let isExpanded;
							if (expanded) {
								isExpanded = y < 100;
							} else {
								isExpanded = y < -100;
								if (y > 50) {
									setDismissed(true);
								}
							}

							if (info.velocity.y) {
								if (Math.abs(info.velocity.y) > 100) {
									isExpanded = info.velocity.y < 0;
								}
								if (info.velocity.y > 1400) {
									setDismissed(true);
								}
							}

							setDragging(false);
							setExpanded(isExpanded);
						}}
						style={{
							width: '100%',
							height: 50,
							position: 'absolute',
							top: 0,
							left: 0,
							zIndex: 3,
							userSelect: 'none',
						}}
					>
						<View
							css={{
								position: 'absolute',
								top: 8,
								left: '50%',
								borderRadius: 9999,
								transform: 'translate(-50%, 0)',
								height: 6,
								width: 80,
								background: '#ddd',
							}}
						/>
					</motion.div>
					<Card css={{ height: 600 }} elevation={5} />
				</div>
			</motion.div>
			<motion.div
				onClick={() => setDismissed(true)}
				style={{
					position: 'absolute',
					top: 0,
					left: 0,
					bottom: 0,
					right: 0,
					background: 'rgba(0,0,0,0.5)',
					pointerEvents: expanded ? null : 'none',
					opacity,
					userSelect: 'none',
				}}
			/>
		</Card>
	);
};
