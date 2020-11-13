import { useRef } from 'react';
import createStore from 'zustand';

/**
 *
 * @param  {Parameters<typeof createStore>} args
 */
export function useSubState(...args) {
	return useRef(createStore(...args)).current;
}
