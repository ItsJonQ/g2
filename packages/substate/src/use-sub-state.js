import { useRef } from 'react';
import createStore from 'zustand';

/**
 * @template {Record<string | number | symbol, unknown>} TState
 * @param {import('zustand').StateCreator<TState> | import('zustand').StoreApi<TState>} createState
 */
export function useSubState(createState) {
	return useRef(createStore(createState)).current;
}
