import { createContext, useContext } from 'react';

/**
 * @type {import('react').Context<{ id: string | null, horizontal: boolean }>}
 */
export const FormGroupContext = createContext({ id: null, horizontal: true });
export const useFormGroupContext = () => useContext(FormGroupContext);

/**
 * @param {string} id
 * @return {string | null}
 */
export const useFormGroupContextId = (id) => {
	const contextId = useFormGroupContext().id;
	return id || contextId;
};
