import '@shopify/polaris/dist/styles.css';
import './polaris.css';

import { StatsGraph } from '@helpscout/stats';
import {
	AppProvider,
	Card,
	Page,
	RangeSlider,
	TextField,
	TextStyle,
} from '@shopify/polaris';
import React from 'react';

import {
	AppContext,
	dataStore,
	PageHeader,
	useAppStoreState,
	useDataOutput,
	useItemStore,
	useReducedMotion,
} from './utils';

export default {
	title: 'DesignTools/PerformanceTest',
};

const HighPerfSlider = React.memo(({ prop, ...props }) => {
	const coords = useItemStore((state) => state[prop]);
	const setItem = useItemStore((state) => state.setItem);
	const [value, y] = coords;

	const handleOnChange = React.useCallback(
		(next) => {
			setItem({ id: prop, value: [next, y] });
		},
		[prop, setItem, y],
	);

	return (
		<RangeSlider
			max={1000}
			min={0}
			onChange={handleOnChange}
			value={value}
			{...props}
		/>
	);
});

const HighPerfTextInput = React.memo(({ prop, ...props }) => {
	const coords = useItemStore((state) => state[prop]);
	const setItem = useItemStore((state) => state.setItem);
	const [value, y] = coords;

	const handleOnChange = React.useCallback(
		(next) => {
			setItem({ id: prop, value: [next, y] });
		},
		[prop, setItem, y],
	);

	return (
		<TextField
			max={1000}
			min={0}
			onChange={handleOnChange}
			value={value.toString()}
			{...props}
		/>
	);
});

const SliderNumberInput = React.memo(({ prop }) => {
	return (
		<div className="slider-number-input">
			<TextStyle>{prop}</TextStyle>
			<HighPerfSlider prop={prop} />
			<HighPerfTextInput data-test={prop} prop={prop} type="number" />
		</div>
	);
});

const SimulatedControlsView = React.memo(() => {
	const items = useItemStore((state) => state.items);

	return (
		<Card sectioned>
			<div className="vstack">
				{items.map((prop) => (
					<SliderNumberInput key={prop} prop={prop} />
				))}
			</div>
		</Card>
	);
});

const RenderItemView = React.memo(({ id, offset }) => {
	// Bind component to store, render it on coordinate changes
	const coords = useItemStore((state) => state[id]);
	const { value: reducedMotion } = useReducedMotion();
	const [x] = coords;
	const opacity = reducedMotion ? 0 : 0.2;

	return (
		<div
			className="stripe-ui"
			style={{
				transform: `translate(${x}px, ${offset}px)`,
				opacity,
			}}
		/>
	);
});

const RenderView = React.memo(() => {
	const items = useItemStore((state) => state.items);

	return (
		<Card sectioned>
			<div className="render-view">
				{items.map((id, index) => (
					<RenderItemView id={id} key={id} offset={index * 3} />
				))}
			</div>
		</Card>
	);
});

const SimulatedSearchView = React.memo(() => {
	const [searchQuery, setState] = useAppStoreState((state) => [
		state.searchQuery,
		state.setState,
	]);

	const handleOnChange = React.useCallback(
		(next) => setState({ searchQuery: next }),
		[setState],
	);

	return (
		<Card sectioned>
			<TextField
				data-test="search"
				fullWidth
				onChange={handleOnChange}
				value={searchQuery}
			/>
		</Card>
	);
});

const DataView = React.memo(() => {
	const data = useDataOutput();
	return (
		<Card sectioned>
			<div className="data-content">{data}</div>
		</Card>
	);
});

const Example = () => {
	return (
		<div className="grid-content">
			<div className="vstack">
				<SimulatedSearchView />
				<SimulatedControlsView />
			</div>
			<div className="vstack">
				<RenderView />
				<DataView />
			</div>
		</div>
	);
};

export const polaris = () => {
	return (
		<AppProvider>
			<AppContext.Provider value={{ dataStore }}>
				<StatsGraph />
				<Page>
					<PageHeader />
					<Example />
				</Page>
			</AppContext.Provider>
		</AppProvider>
	);
};
