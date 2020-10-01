import { useRef } from 'react';
import createStore from 'zustand';

export function useSubState(...args) {
	return useRef(createStore(...args)).current;
}
