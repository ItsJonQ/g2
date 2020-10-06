import { useDrag } from '@wp-g2/gestures';
import { noop } from '@wp-g2/utils';
import React, { useCallback, useEffect, useState } from 'react';

import { Icon } from '../Icon';
import { View } from '../View';
import { VStack } from '../VStack';
import * as styles from './TextInput.styles';

function useDragGesture({ onIncrement = noop, onDecrement = noop }) {
	const [isDragging, setIsDragging] = useState(false);

	useEffect(() => {
		if (isDragging) {
			document.documentElement.classList.add(styles.globalDraggable);
		} else {
			document.documentElement.classList.remove(styles.globalDraggable);
		}
	}, [isDragging]);

	const dragGestures = useDrag(
		(state) => {
			const [x, y] = state.delta;

			let movement = x + y;
			const isMovementY = Math.abs(y) > Math.abs(x);

			setIsDragging(state.dragging);

			if (movement === 0) return;

			const shouldIncrement = isMovementY ? movement < 0 : movement > 0;

			if (shouldIncrement) {
				onIncrement();
			} else {
				onDecrement();
			}
		},
		{ threshold: 10 },
	);

	return { isDragging, dragGestures };
}

function TextInputArrows(props, forwardedRef) {
	const { __store: store, jumpStep, onCommitChange = noop } = props;

	const incrementValue = useCallback(() => {
		store.getState().increment(jumpStep);
		onCommitChange();
	}, [store, jumpStep, onCommitChange]);

	const decrementValue = useCallback(() => {
		store.getState().decrement(jumpStep);
		onCommitChange();
	}, [store, jumpStep, onCommitChange]);

	const { dragGestures, isDragging } = useDragGesture({
		onIncrement: incrementValue,
		onDecrement: decrementValue,
	});

	const handleOnMouseDown = useCallback((event) => {
		event.preventDefault();
	}, []);

	return (
		<VStack
			css={[styles.Spinner, isDragging && styles.spinnerDragging]}
			data-dragging={isDragging}
			expanded={true}
			spacing={0}
			{...dragGestures()}
			ref={forwardedRef}
		>
			<View
				css={styles.SpinnerArrowUp}
				onClick={incrementValue}
				onMouseDown={handleOnMouseDown}
				tabIndex={-1}
			>
				<Icon icon={<ArrowUp />} size={12} />
			</View>
			<View
				css={styles.SpinnerArrowDown}
				onClick={decrementValue}
				onMouseDown={handleOnMouseDown}
				tabIndex={-1}
			>
				<Icon icon={<ArrowDown />} size={12} />
			</View>
		</VStack>
	);
}

const ArrowUp = () => (
	<svg
		aria-hidden="true"
		fill="currentColor"
		focusable="false"
		viewBox="0 0 20 20"
	>
		<path d="M15 12l-5-5-5 5h10z"></path>
	</svg>
);

const ArrowDown = () => (
	<svg
		aria-hidden="true"
		fill="currentColor"
		focusable="false"
		viewBox="0 0 20 20"
	>
		<path d="M5 8l5 5 5-5H5z"></path>
	</svg>
);

export default React.memo(React.forwardRef(TextInputArrows));
