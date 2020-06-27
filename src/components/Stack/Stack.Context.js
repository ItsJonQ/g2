import React, { createContext, useContext } from 'react';

export const StackContext = createContext({});
export const useStackContext = () => useContext(StackContext);

export function StackProvider(props) {
	return <StackContext.Provider {...props} />;
}
