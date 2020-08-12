import { createContext } from 'react';

const createNamedContext = (name) => {
	const context = createContext();
	context.displayName = name;

	return context;
};

const context = createNamedContext('NavigatorRouter');

export default context;
