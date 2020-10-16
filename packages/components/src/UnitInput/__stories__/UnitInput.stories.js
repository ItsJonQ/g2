import { createStore } from '@wp-g2/substate';
import * as CSSOM from 'css-typed-om';
import React from 'react';
import CSSUnits from 'units-css';

import { FormGroup, ListGroup } from '../../index';
import { UnitInput } from '../index';
import { baseParseUnit } from '../UnitInput.utils';
import { validStyleProps } from './utils';

export default {
	component: UnitInput,
	title: 'Components/UnitInput',
};

const _tmpNode = document.createElement('div');
const computedStyleMap = Object.create(CSSOM.StylePropertyMap.prototype);
computedStyleMap.style = _tmpNode.style;

const getCSSValue = (initialValue) => {
	const [value, unit] = baseParseUnit(initialValue);
	const next = !unit ? value : `${value}${unit}`;

	return next;
};

const isValidCSSValueForProp = (prop, value) => {
	const next = getCSSValue(value);
	computedStyleMap.set(prop, next);
	return computedStyleMap.style[prop] === value;
};

const everythingInitialState = validStyleProps
	.filter(Boolean)
	.reduce((state, key) => {
		let initialValue = 1;
		if (isValidCSSValueForProp(key, '1px')) {
			initialValue = '1px';
		}
		return {
			...state,
			[key]: initialValue,
		};
	}, {});

const valueStore = createStore((set) => ({
	...everythingInitialState,
	setState: set,
}));
const useValueStore = valueStore;

const CSSEntry = React.memo(({ prop }) => {
	const value = useValueStore((state) => state[prop]);
	const update = (next) => {
		valueStore.setState({ [prop]: next });
	};
	return (
		<FormGroup label={prop}>
			<UnitInput
				onChange={update}
				validate={(next) => {
					return isValidCSSValueForProp(prop, next);
				}}
				value={value}
			/>
		</FormGroup>
	);
});

const Everything = () => {
	const { setState, ...state } = useValueStore();

	// const update = (prop) => (next) => {
	// 	setState((prev) =>
	// 		prev.map((item) => {
	// 			if (item.prop === prop) {
	// 				return { ...item, value: next };
	// 			}
	// 			return item;
	// 		}),
	// 	);
	// };

	return (
		<ListGroup>
			{Object.entries(state).map(([key, item]) => {
				return <CSSEntry key={key} prop={key} />;
			})}
		</ListGroup>
	);
};

const Example = () => {
	const [value, setValue] = React.useState('13px');

	return <UnitInput onChange={setValue} value={value} />;
};

export const _default = () => {
	return <Example />;
};

export const _everything = () => {
	return <Everything />;
};
