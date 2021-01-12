import { useDispatch, useSelect } from '@wordpress/data';

import IS_REDUCED_MOTION_STORE from './store';

/**
 * @return {[boolean, (isReducedMotion: boolean) => void]}
 */
export const useReducedMotion = () => {
	const isReducedMotion = useSelect((select) => {
		return select(IS_REDUCED_MOTION_STORE).getIsReducedMotion();
	});
	const { setIsReducedMotion } = useDispatch(IS_REDUCED_MOTION_STORE);

	return [/** @type {boolean} */ (isReducedMotion), setIsReducedMotion];
};
