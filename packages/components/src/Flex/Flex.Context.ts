import { createContext, useContext } from 'react';

export type FlexContextProps = {
	display?: any;
	gap?: number;
	isColumn?: boolean;
	isLast?: boolean;
};

export const FlexContext = createContext<Partial<FlexContextProps>>({});
export const useFlexContext = () => useContext(FlexContext);
