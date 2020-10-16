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
import { useDragHandlers } from './useTextInput';

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

	const dragHandlers = useDragHandlers({
		dragAxis,
		store: __store,
	});

	return (
		<View className={styles.SpinnerWrapper}>
			<VStack
				{...dragHandlers}
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
					width={16}
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
					width={16}
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
