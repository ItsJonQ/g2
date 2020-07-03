import { createContext, useContext, useEffect, useRef, useState } from 'react';

export const CollapsibleContext = createContext();
export const useCollapsibleContext = () => useContext(CollapsibleContext);

const FPS_60 = 1000 / 16;
const ANIMATION_TIMEOUT = FPS_60 * 2;

export function useAnimatedState({ animating, visible }) {
	const [animatedState, setAnimatedState] = useState(
		visible ? 'ENTERED' : 'EXITED',
	);
	const timeoutRef = useRef();

	useEffect(() => {
		if (timeoutRef.current) {
			clearTimeout(timeoutRef.current);
		}

		if (visible) {
			if (animating) {
				setAnimatedState('ENTERING_START');
				timeoutRef.current = setTimeout(() => {
					setAnimatedState('ENTERING');
				}, ANIMATION_TIMEOUT);
			}
			if (!animating) {
				timeoutRef.current = setTimeout(() => {
					setAnimatedState('ENTERED');
				}, ANIMATION_TIMEOUT);
			}
			return;
		}
		if (!visible) {
			if (animating) {
				setAnimatedState('EXITING_START');
				timeoutRef.current = setTimeout(() => {
					setAnimatedState('EXITING');
				}, ANIMATION_TIMEOUT);
			}
			if (!animating) {
				setAnimatedState('EXITED');
			}
			return;
		}
	}, [animating, visible]);

	return animatedState;
}

export function getAnimatedHeight({ animatedState, height: currentHeight }) {
	let height;

	if (animatedState === 'ENTERING_START') {
		height = 0;
	}
	if (animatedState === 'ENTERING') {
		height = currentHeight;
	}
	if (animatedState === 'ENTERED') {
		height = 'auto';
	}
	if (animatedState === 'EXITING_START') {
		height = currentHeight;
	}
	if (animatedState === 'EXITING') {
		height = 0;
	}
	if (animatedState === 'EXITED') {
		height = 0;
	}

	return height;
}
