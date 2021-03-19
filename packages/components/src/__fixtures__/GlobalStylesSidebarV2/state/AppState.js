import { faker } from '@wp-g2/protokit';
import _ from 'lodash';
import React from 'react';

import { COLOR_ACCENT, COLOR_MAIN, COLOR_TEXT } from '../constants';

// Models
const createPaletteColor = ({ color, slug }) => ({
	id: faker.random.uuid(),
	slug,
	color,
	title: _.startCase(slug),
});

const createPalette = ({ colors, title }) => ({
	id: faker.random.uuid(),
	title,
	colors,
});

// App State
const initialState = {
	color: {
		palettes: [
			createPalette({
				title: 'Theme',
				colors: [
					createPaletteColor({ slug: 'main', color: COLOR_MAIN }),
					createPaletteColor({ slug: 'text', color: COLOR_TEXT }),
					createPaletteColor({ slug: 'accent', color: COLOR_ACCENT }),
				],
			}),
		],
		elements: {
			background: COLOR_MAIN,
			text: COLOR_TEXT,
		},
	},
	typography: {
		fontFamily: 'Helvetica Neue',
	},
};

export const AppState = React.createContext({});
export const useAppState = () => React.useContext(AppState);

export const AppProvider = ({ children }) => {
	const [appState, setAppState] = React.useState(initialState);
	const contextValue = {
		...appState,
		setAppState,
		set: (key, value) =>
			setAppState((prev) => {
				const next = _.set(prev, key, value);
				return next;
			}),
		get: (values) => _.get(appState, values),
	};

	return (
		<AppState.Provider value={contextValue}>{children}</AppState.Provider>
	);
};

export const THING = 'hello';
