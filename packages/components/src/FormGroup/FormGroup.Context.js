import { createContext, useContext } from 'react';

export const FormGroupContext = createContext({ id: null, horizontal: true });
export const useFormGroupContext = () => useContext(FormGroupContext);

export const useFormGroupContextId = (id) => {
	const contextId = useFormGroupContext().id;
	return id || contextId;
};
