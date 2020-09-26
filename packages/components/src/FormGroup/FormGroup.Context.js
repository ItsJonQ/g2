import { createContext, useContext } from 'react';

export const FormGroupContext = createContext({ id: null, horizontal: true });
export const useFormGroupContext = () => useContext(FormGroupContext);
