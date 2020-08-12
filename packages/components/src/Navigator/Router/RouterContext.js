import { createContext } from 'react';

const createNamedContext = (name) => {
	const context = createContext();
	context.displayName = name;

	return context;
};

const historyContext = createNamedContext('NavigatorRouterHistory');

export default historyContext;
