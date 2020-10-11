import { StatsGraph } from '@helpscout/stats';
import {
	Card,
	CardBody,
	Container,
	FormGroup,
	Grid,
	ListGroup,
	SearchInput,
	Slider,
	TextInput,
	View,
	VStack,
} from '@wp-g2/components';
import { ui } from '@wp-g2/styles';
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

const HighPerfControl = React.memo(({ prop, ...props }) => {
	const [value, setState] = useAppStoreState((state) => [
		state[prop],
		state.setState,
	]);

	const handleOnChange = React.useCallback(
		(next) => setState({ [prop]: next }),
		[prop, setState],
	);

	return (
		<View
			max={100}
			min={0}
			onChange={handleOnChange}
			value={value}
			{...props}
		/>
	);
});

const SliderNumberInput = React.memo(({ prop }) => {
	return (
		<FormGroup label={prop}>
			<Grid>
				<HighPerfControl as={Slider} prop={prop} />
				<HighPerfControl
					as={TextInput}
					data-test={prop}
					prop={prop}
					type="number"
				/>
			</Grid>
		</FormGroup>
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
		<Card>
			<CardBody>
				<SearchInput
					data-test="search"
					isCommitOnBlurOrEnter={false}
					onChange={handleOnChange}
					value={searchQuery}
				/>
			</CardBody>
		</Card>
	);
});

const SimulatedControlsView = React.memo(() => {
	return (
		<Card>
			<CardBody>
				<ListGroup>
					<SliderNumberInput prop="height" />
					<SliderNumberInput prop="width" />
					<SliderNumberInput prop="opacity" />
					<SliderNumberInput prop="x" />
					<SliderNumberInput prop="y" />
				</ListGroup>
			</CardBody>
		</Card>
	);
});

const DataView = React.memo(() => {
	const state = useAppStoreState((state) => state);
	const items = useItemData();

	return (
		<Card>
			<CardBody>
				<View
					css={`
						font-size: 10px;
						line-height: 10px;
						word-break: break-all;
						white-space: break-spaces;
					`}
				>
					{JSON.stringify(state)}
					{JSON.stringify(items)}
				</View>
			</CardBody>
		</Card>
	);
});

const ItemView = ui.css`
	position: absolute;
	width: 100px;
	height: 2px;
	background: ${ui.get('colorText')};
	transition: transform 200ms ease-in-out;
	opacity: 0.2;
`;

const RenderItemView = React.memo(({ id, offset }) => {
	// Bind component to store, render it on coordinate changes
	const coords = useItemStore((state) => state[id]);
	const { value: reducedMotion } = useReducedMotion();
	const [x] = coords;
	const opacity = reducedMotion ? 0 : 0.2;

	return (
		<View
			className={ItemView}
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
		<Card>
			<CardBody>
				<View
					css={`
						height: 50vh;
						position: relative;
					`}
				>
					{items.map((id, index) => (
						<RenderItemView id={id} key={id} offset={index * 3} />
					))}
				</View>
			</CardBody>
		</Card>
	);
});

const Example = () => {
	return (
		<Grid templateColumns="1fr 3fr">
			<View>
				<VStack expanded={false}>
					<SimulatedSearchView />
					<SimulatedControlsView />
					<DataView />
				</VStack>
			</View>
			<View>
				<RenderView />
			</View>
		</Grid>
	);
};

export const _default = () => {
	return (
		<AppContext.Provider value={{ dataStore }}>
			<StatsGraph />
			<Container>
				<PageHeader />
				<Example />
			</Container>
		</AppContext.Provider>
	);
};
