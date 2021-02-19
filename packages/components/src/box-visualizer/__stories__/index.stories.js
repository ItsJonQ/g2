import { usePropRef } from '@wp-g2/utils';
import React from 'react';

import { Animated, Card, FormGroup, Portal, TextInput } from '../../index';
import { BoxVisualizer } from '../index';

export default {
	title: 'Components/BoxVisualizer',
};

function VizCanvas({ propRefs }) {
	const positionRef = React.useRef({ top: 0, bottom: 0, left: 0, right: 0 });
	const canvasRef = React.useRef();
	const draw = React.useCallback(() => {
		const { targetRef, visible } = propRefs.current;
		if (visible) {
			try {
				const {
					height,
					left,
					top,
					width,
				} = targetRef.current.getBoundingClientRect();
				positionRef.current = {
					top,
					height,
					left,
					width,
				};
				canvasRef.current.style.top = `${top}px`;
				canvasRef.current.style.left = `${left}px`;
				canvasRef.current.style.height = `${height}px`;
				canvasRef.current.style.width = `${width}px`;

				const ctx = canvasRef.current.getContext('2d');

				ctx.fillStyle = 'dodgerblue';
				ctx.fillRect(0, 0, width, height);
				ctx.clearRect(45, 45, 60, 60);

				window.requestAnimationFrame(draw);
			} catch (err) {}
		}
	}, [propRefs]);

	React.useEffect(() => {
		if (typeof window === 'undefined') return;
		window.requestAnimationFrame(draw);
	}, [draw]);

	console.log(positionRef.current);

	return (
		<Portal>
			<canvas
				ref={canvasRef}
				style={{
					...positionRef,
					position: 'absolute',
					pointerEvents: 'none',
					zIndex: 9999,
					opacity: 0.2,
				}}
			/>
		</Portal>
	);
}

function Viz({ bottom, left, right, targetRef, top, visible = true }) {
	const propRefs = usePropRef({
		top,
		bottom,
		left,
		right,
		visible,
		targetRef,
	});

	return <VizCanvas propRefs={propRefs} />;
}

const Example = React.memo(({ padding }) => {
	const cardRef = React.useRef();

	return (
		<>
			<Viz targetRef={cardRef} {...padding} />
			<div style={{ width: 300, height: 300 }}>
				<Animated drag dragMomentum={false} style={{ height: '100%' }}>
					<Card css={{ height: '100%' }} ref={cardRef} />
				</Animated>
			</div>
		</>
	);
});

export const _default = () => {
	const [padding, setPadding] = React.useState({
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,
	});
	const handleOnChange = (dir) => (next) =>
		setPadding((prev) => {
			return {
				...prev,
				[dir]: next,
			};
		});
	return (
		<div>
			<FormGroup label="top">
				<TextInput
					onChange={handleOnChange('top')}
					type="number"
					value={padding.top}
				/>
			</FormGroup>
			<FormGroup label="bottom">
				<TextInput
					onChange={handleOnChange('bottom')}
					type="number"
					value={padding.bottom}
				/>
			</FormGroup>
			<FormGroup label="left">
				<TextInput
					onChange={handleOnChange('left')}
					type="number"
					value={padding.left}
				/>
			</FormGroup>
			<FormGroup label="right">
				<TextInput
					onChange={handleOnChange('right')}
					type="number"
					value={padding.right}
				/>
			</FormGroup>

			<Example padding={padding} />
		</div>
	);
};
