import { FiMinus, FiPlus } from '@wp-g2/icons';
import { ui } from '@wp-g2/styles';
import { clamp, noop } from '@wp-g2/utils';
import React, { useCallback, useEffect, useMemo, useRef } from 'react';

import { HStack } from '../HStack';
import { Icon } from '../Icon';
import { View } from '../View';
import * as styles from './TextInput.styles';
import { useDragHandlers } from './useTextInputState.utils';

function TextInputSteppers(props, forwardedRef) {
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
			<HStack
				{...dragHandlers}
				className={styles.Steppers}
				expanded={true}
				spacing={0}
				{...ui.$('TextInputArrows')}
				ref={forwardedRef}
			>
				<UpDownArrows
					onDecrement={decrementValue}
					onIncrement={incrementValue}
				/>
			</HStack>
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

		const arrowUp = useMemo(() => <FiPlus />, []);
		const arrowDown = useMemo(() => <FiMinus />, []);

		return (
			<>
				<Icon
					as="button"
					className={styles.SteppersUp}
					onClick={onIncrement}
					onMouseDown={handleOnMouseDownIncrement}
					onMouseLeave={handleOnClearTimers}
					onMouseUp={handleOnClearTimers}
					{...ui.$('TextInputArrowUp')}
					height={20}
					icon={arrowUp}
					size={12}
					width={20}
				/>
				<Icon
					as="button"
					className={styles.SteppersDown}
					onClick={onDecrement}
					onMouseDown={handleOnMouseDownDecrement}
					onMouseLeave={handleOnClearTimers}
					onMouseUp={handleOnClearTimers}
					{...ui.$('TextInputArrowDown')}
					height={20}
					icon={arrowDown}
					size={12}
					width={20}
				/>
			</>
		);
	},
);

export default React.memo(React.forwardRef(TextInputSteppers));
