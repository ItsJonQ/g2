import { useDrag } from '@wp-g2/gestures';
import { ui } from '@wp-g2/styles';
import { clamp, noop } from '@wp-g2/utils';
import React, {
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
} from 'react';

import { Icon } from '../Icon';
import { View } from '../View';
import { VStack } from '../VStack';
import * as styles from './TextInput.styles';

function TextInputArrows(props, forwardedRef) {
	const { __store, dragAxis } = props;
	const store = useRef(__store).current;

	const incrementValue = useCallback(
		(boost) => {
			store.getState().increment(boost);
			store.getState().commitValue();
		},
		[store],
	);

	const decrementValue = useCallback(
		(boost) => {
			store.getState().decrement(boost);
			store.getState().commitValue();
		},
		[store],
	);

	const { dragGestures } = useDragGesture({
		dragAxis,
		onIncrement: incrementValue,
		onDecrement: decrementValue,
	});

	return (
		<View {...dragGestures()}>
			<VStack
				className={styles.Spinner}
				expanded={true}
				spacing={0}
				{...ui.$('TextInputArrows')}
				ref={forwardedRef}
			>
				<UpDownArrows
					onDecrement={decrementValue}
					onIncrement={incrementValue}
				/>
			</VStack>
		</View>
	);
}

function useDragGesture({ dragAxis, onIncrement = noop, onDecrement = noop }) {
	const [dragState, setDragState] = useState(false);
	const threshold = 10;
	const dragRaf = useRef();

	useEffect(() => {
		if (dragState) {
			if (dragState === 'x') {
				document.documentElement.classList.add(styles.globalDraggableX);
				document.documentElement.classList.remove(
					styles.globalDraggableY,
				);
			} else {
				document.documentElement.classList.remove(
					styles.globalDraggableX,
				);
				document.documentElement.classList.add(styles.globalDraggableY);
			}
		} else {
			document.documentElement.classList.remove(styles.globalDraggableX);
			document.documentElement.classList.remove(styles.globalDraggableY);
		}
	}, [dragState]);

	useEffect(() => {
		return () => {
			cancelAnimationFrame(dragRaf.current);
		};
	}, []);

	const dragGestures = useDrag(
		(state) => {
			const [x, y] = state.delta;
			setDragState(state.dragging ? state.axis : false);

			const isMovementY = state.axis === 'y';
			let movement = isMovementY ? y * -1 : x;

			if (Math.abs(movement) === 0) return;

			const shouldIncrement = movement > 0;

			let boost = movement === threshold ? 0 : movement;
			boost = shouldIncrement ? boost : boost * -1;
			boost = boost - 1;

			if (dragRaf.current) {
				cancelAnimationFrame(dragRaf.current);
			}

			dragRaf.current = requestAnimationFrame(() => {
				if (shouldIncrement) {
					onIncrement(boost);
				} else {
					onDecrement(boost);
				}
			});
		},
		{ axis: dragAxis, threshold },
	);

	return { isDragging: !!dragState, dragGestures };
}

const UpDownArrows = React.memo(
	({ onIncrement = noop, onDecrement = noop }) => {
		const timeoutRef = useRef();
		const timeoutDurationStart = 500;
		const timeoutDurationEnd = 20;
		const timeoutDurationRef = useRef(timeoutDurationStart);

		const handleOnClearTimers = useCallback(() => {
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
			}
			timeoutDurationRef.current = timeoutDurationStart;
		}, []);

		const handleOnMouseDownIncrement = useCallback(
			(event) => {
				if (event) {
					event.preventDefault();
				}
				timeoutRef.current = setTimeout(() => {
					onIncrement();
					timeoutDurationRef.current = clamp(
						timeoutDurationRef.current / 2,
						timeoutDurationEnd,
						timeoutDurationStart,
					);
					handleOnMouseDownIncrement();
				}, timeoutDurationRef.current);
			},
			[onIncrement],
		);

		const handleOnMouseDownDecrement = useCallback(
			(event) => {
				if (event) {
					event.preventDefault();
				}
				timeoutRef.current = setTimeout(() => {
					onDecrement();
					timeoutDurationRef.current = clamp(
						timeoutDurationRef.current / 2,
						timeoutDurationEnd,
						timeoutDurationStart,
					);
					handleOnMouseDownDecrement();
				}, timeoutDurationRef.current);
			},
			[onDecrement],
		);

		useEffect(() => {
			return () => handleOnClearTimers();
		}, [handleOnClearTimers]);

		const arrowUp = useMemo(() => <ArrowUp />, []);
		const arrowDown = useMemo(() => <ArrowDown />, []);

		return (
			<>
				<Icon
					className={styles.SpinnerArrowUp}
					onClick={onIncrement}
					onMouseDown={handleOnMouseDownIncrement}
					onMouseLeave={handleOnClearTimers}
					onMouseUp={handleOnClearTimers}
					tabIndex={-1}
					{...ui.$('TextInputArrowUp')}
					icon={arrowUp}
					size={12}
					width={20}
				/>

				<Icon
					className={styles.SpinnerArrowDown}
					onClick={onDecrement}
					onMouseDown={handleOnMouseDownDecrement}
					onMouseLeave={handleOnClearTimers}
					onMouseUp={handleOnClearTimers}
					tabIndex={-1}
					{...ui.$('TextInputArrowDown')}
					icon={arrowDown}
					size={12}
					width={20}
				/>
			</>
		);
	},
);

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
