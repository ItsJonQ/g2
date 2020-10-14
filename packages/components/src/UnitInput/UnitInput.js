import { contextConnect, useContextSystem } from '@wp-g2/context';
import { add, roundClampString, subtract } from '@wp-g2/utils';
import React, { useEffect, useRef } from 'react';

import { TextInput } from '../TextInput';
import { createUnitValue, parseUnit } from './UnitInput.utils';

function UnitInput(props, forwardedRef) {
	const { ...otherProps } = useContextSystem(props, 'UnitInput');
	const raf = useRef();

	const handleOnIncrement = React.useCallback((prev) => {
		const [value, unit] = parseUnit(prev.value);

		const step = prev.isShiftKey ? prev.step * prev.shiftStep : prev.step;

		const nextValue = add(prev.boost, step);
		const clampedValue = roundClampString(
			add(nextValue, value),
			prev.min,
			prev.max,
			prev.step,
		);

		if (prev.inputRef.setSelectionRange) {
			raf.current = requestAnimationFrame(() => {
				prev.inputRef.setSelectionRange(0, String(clampedValue).length);
			});
		}

		const final = createUnitValue(clampedValue, unit);

		return { value: final };
	}, []);

	const handleOnDecrement = React.useCallback((prev) => {
		const [value, unit] = parseUnit(prev.value);

		const step = prev.isShiftKey ? prev.step * prev.shiftStep : prev.step;

		const nextValue = add(prev.boost, step);
		const clampedValue = roundClampString(
			subtract(value, nextValue),
			prev.min,
			prev.max,
			prev.step,
		);

		if (prev.inputRef.setSelectionRange) {
			raf.current = requestAnimationFrame(() => {
				prev.inputRef.setSelectionRange(0, String(clampedValue).length);
			});
		}

		const final = createUnitValue(clampedValue, unit);

		return { value: final };
	}, []);

	useEffect(() => {
		return () => {
			if (raf.current) {
				cancelAnimationFrame(raf.current);
			}
		};
	}, []);

	return (
		<TextInput
			{...otherProps}
			format="number"
			onDecrement={handleOnDecrement}
			onIncrement={handleOnIncrement}
			ref={forwardedRef}
			type="text"
		/>
	);
}

export default contextConnect(UnitInput, 'UnitInput');
