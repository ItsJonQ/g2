import { useRef } from 'react';
import createStore from 'zustand';

/** @typedef {import('zustand').State} State */
/**
 * @template {State} TState
 * @typedef {import('zustand').StateCreator<TState>} StateCreator
 */
/**
 * @template {State} TState
 * @typedef {import('zustand').StoreApi<TState>} StoreApi
 */

/**
 * @template {State} TState
 * @param {StateCreator<TState> | StoreApi<TState>} state
 *
 */
export function useSubState(state) {
	return useRef(createStore(state)).current;
}
