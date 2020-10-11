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
	useItemData,
	useItemStore,
	useReducedMotion,
} from './utils';

export default {
	title: 'DesignTools/PerformanceTest',
};

const HighPerfSlider = React.memo(({ prop, ...props }) => {
	const [value, setState] = useAppStoreState((state) => [
		state[prop],
		state.setState,
	]);

	const handleOnChange = React.useCallback(
		(next) => setState({ [prop]: next }),
		[prop, setState],
	);

	return (
		<RangeSlider
			max={100}
			min={0}
			onChange={handleOnChange}
			value={value}
			{...props}
		/>
	);
});

const HighPerfTextInput = React.memo(({ prop, ...props }) => {
	const [value, setState] = useAppStoreState((state) => [
		state[prop],
		state.setState,
	]);

	const handleOnChange = React.useCallback(
		(next) => setState({ [prop]: next }),
		[prop, setState],
	);

	console.log(value);

	return (
		<TextField
			max={100}
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
	return (
		<Card sectioned>
			<div className="vstack">
				<SliderNumberInput prop="height" />
				<SliderNumberInput prop="width" />
				<SliderNumberInput prop="opacity" />
				<SliderNumberInput prop="x" />
				<SliderNumberInput prop="y" />
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
	const state = useAppStoreState((state) => state);
	const items = useItemData();

	return (
		<Card sectioned>
			<div className="data-content">
				{JSON.stringify(state)}
				{JSON.stringify(items)}
			</div>
		</Card>
	);
});

const Example = () => {
	return (
		<div className="grid-content">
			<div className="vstack">
				<SimulatedSearchView />
				<SimulatedControlsView />
				<DataView />
			</div>
			<RenderView />
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
