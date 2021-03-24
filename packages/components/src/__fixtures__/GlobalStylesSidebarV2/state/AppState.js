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

const createElement = ({ title, ...rest }) => ({
	...rest,
	id: faker.random.uuid(),
	title,
	slug: _.kebabCase(title),
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

			createPalette({
				title: 'Default',
				colors: [
					createPaletteColor({ slug: 'black', color: '#000' }),
					createPaletteColor({ slug: 'gray', color: '#AEB8C2' }),
					createPaletteColor({ slug: 'white', color: '#fff' }),
					createPaletteColor({ slug: 'pink', color: '#E992A7' }),
					createPaletteColor({ slug: 'red', color: '#BE3E37' }),
					createPaletteColor({ slug: 'orange', color: '#ED732D' }),
					createPaletteColor({ slug: 'yellow', color: '#F1BC40' }),
					createPaletteColor({
						slug: 'lightGreen',
						color: '#91D9B6',
					}),
					createPaletteColor({ slug: 'green', color: '#5FCC8C' }),
					createPaletteColor({ slug: 'sky', color: '#9BCFF7' }),
					createPaletteColor({ slug: 'blue', color: '#4291DD' }),
					createPaletteColor({ slug: 'purple', color: '#9055D9' }),
				],
			}),

			createPalette({
				title: 'Custom',
				colors: [
					createPaletteColor({ slug: 'cyan', color: '#19C9D5' }),
					createPaletteColor({ slug: 'royal', color: '#3858E9' }),
					createPaletteColor({ slug: 'tangerine', color: '#F38435' }),
				],
			}),
		],
		elements: [
			createElement({ title: 'Background', color: COLOR_MAIN }),
			createElement({ title: 'Text', color: COLOR_TEXT }),
		],
	},
	typography: {
		fontFamily: 'Helvetica Neue',
		elements: [
			createElement({ title: 'Headings', fontFamily: 'Helvetica Neue' }),
			createElement({ title: 'Text', fontFamily: 'Helvetica Neue' }),
			createElement({ title: 'Links', fontFamily: 'Helvetica Neue' }),
			createElement({ title: 'Captions', fontFamily: 'Helvetica Neue' }),
		],
	},
};

export const AppState = React.createContext({});
export const useAppState = (get) => {
	const appState = React.useContext(AppState);
	const { set } = appState;

	const setFn = React.useCallback(
		(value) => {
			if (!get) return;
			set(get, value);
		},
		[get, set],
	);

	if (get) {
		return [appState.get(get), setFn];
	}
	return appState;
};

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
