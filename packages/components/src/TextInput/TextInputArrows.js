import { chevronDown, chevronUp } from '@wordpress/icons';
import { ui } from '@wp-g2/styles';
import { clamp, noop } from '@wp-g2/utils';
import React, { useCallback, useEffect, useRef } from 'react';

import { Icon } from '../Icon';
import { View } from '../View';
import { VStack } from '../VStack';
import * as styles from './TextInput.styles';
import { useDragHandlers } from './useTextInputState.utils';

function TextInputArrows(props, forwardedRef) {
	const { __store, decrement, increment } = props;
	const store = useRef(__store).current;

	const dragHandlers = useDragHandlers({
		increment,
		decrement,
		store: __store,
	});

	const incrementValue = useCallback(
		(boost) => {
			increment(boost);
			store.getState().commit();
		},
		[increment, store],
	);

	const decrementValue = useCallback(
		(boost) => {
			decrement(boost);
			store.getState().commit();
		},
		[decrement, store],
	);

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
					icon={chevronUp}
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
					icon={chevronDown}
					size={12}
					width={16}
				/>
			</>
		);
	},
);

export default React.memo(React.forwardRef(TextInputArrows));
