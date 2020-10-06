/**
 * WordPress dependencies
 */
import { createStore } from '@wp-g2/substate';
import { useEffect } from 'react';

export const jumpStepStore = createStore((set) => ({
	isShiftKey: false,
	setIsShiftKey: (next) =>
		set((prev) => {
			if (prev.isShiftKey === next) return prev;
			return { isShiftKey: next };
		}),
}));

/**
 * A custom hook that calculates a step value (used by elements like input
 * [type="number"]). This value can be modified based on whether the Shift
 * key is being held down.
 *
 * For example, a shiftStep of 10, and a step of 1...
 * Starting from 10, the next incremented value will be 11.
 *
 * Holding down shift...
 * Starting from 10, the next incremented value will be 20.
 *
 * @param {Object} props Properties for the hook.
 * @param {boolean} [props.isShiftStepEnabled=true] Determines if jumping values with shift is enabled
 * @param {number} [props.shiftStep=10] Multiplier to jump by, when holding shift key.
 * @param {number} [props.step=1] Multiplier to jump by, when not-holding shift key.
 *
 * @return {number} The jump step value.
 */
export function useJumpStep({
	isShiftStepEnabled = true,
	shiftStep = 10,
	step = 1,
}) {
	const { isShiftKey, setIsShiftKey } = jumpStepStore();

	useEffect(() => {
		const hanldeOnKeyPress = (event) => {
			if (jumpStepStore.getState().isShiftKey !== event.shiftKey) {
				setIsShiftKey(event.shiftKey);
			}
		};

		window.addEventListener('keydown', hanldeOnKeyPress);
		window.addEventListener('keyup', hanldeOnKeyPress);

		return () => {
			window.removeEventListener('keydown', hanldeOnKeyPress);
			window.removeEventListener('keyup', hanldeOnKeyPress);
		};
	}, [setIsShiftKey]);

	const isEnabled = isShiftStepEnabled && isShiftKey;

	return isEnabled ? shiftStep * step : step;
}
