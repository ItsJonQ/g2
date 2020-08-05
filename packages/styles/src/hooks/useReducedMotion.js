import { createStore } from '@wp-g2/context';

export const [useReducedMotionState] = createStore((setState) => ({
	isReducedMotion: false,
	setIsReducedMotion: (next) => {
		setState(() => ({ isReducedMotion: next }));
	},
}));

export function useReducedMotion() {
	const state = useReducedMotionState((state) => state.isReducedMotion);
	const setState = useReducedMotionState((state) => state.setIsReducedMotion);

	return [state, setState];
}
