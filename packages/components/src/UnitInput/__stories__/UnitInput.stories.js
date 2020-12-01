import { createStore } from '@wp-g2/substate';
import { isValidCSSValueForProp } from '@wp-g2/utils';
import React from 'react';

import { FormGroup, ListGroup } from '../../index';
import { UnitInput } from '../index';
import { validStyleProps } from './utils';

export default {
	component: UnitInput,
	title: 'Components/UnitInput',
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
		<FormGroup horizontal label={prop}>
			<UnitInput
				altStep={0.1}
				cssProp={prop}
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

	return (
		<ListGroup
			css={`
				padding-bottom: 20vh;
			`}
		>
			{Object.entries(state).map(([key]) => {
				return <CSSEntry key={key} prop={key} />;
			})}
		</ListGroup>
	);
};

const Example = () => {
	const [value, setValue] = React.useState('13px');

	return (
		<>
			<div>
				<UnitInput cssProp="height" onChange={setValue} value={value} />
			</div>
			<br />
			<br />
			<br />
			<div>
				<UnitInput cssProp="height" onChange={setValue} value={value} />
			</div>
		</>
	);
};

export const _default = () => {
	return <Example />;
};

export const _everything = () => {
	return <Everything />;
};
