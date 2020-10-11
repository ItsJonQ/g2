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
	useDataOutput,
	useItemStore,
	useReducedMotion,
} from './utils';

export default {
	title: 'DesignTools/PerformanceTest',
};

const HighPerfControl = React.memo(({ prop, ...props }) => {
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
		<View
			max={1000}
			min={0}
			onChange={handleOnChange}
			value={value}
			{...props}
		/>
	);
});

const SliderNumberInput = React.memo(({ prop }) => {
	return (
		<FormGroup label={`${prop}`} templateColumns="50px 1fr">
			<Grid>
				<HighPerfControl as={Slider} prop={prop} />
				<HighPerfControl as={TextInput} prop={prop} type="number" />
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
	const items = useItemStore((state) =>
		state.items.filter((v, i) => i % 3 === 0),
	);

	return (
		<Card>
			<CardBody>
				<ListGroup>
					{items.map((prop) => (
						<SliderNumberInput key={prop} prop={prop} />
					))}
				</ListGroup>
			</CardBody>
		</Card>
	);
});

const DataView = React.memo(() => {
	const data = useDataOutput();

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
					{data}
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
						height: 375px;
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
				</VStack>
			</View>
			<View>
				<VStack expanded={false}>
					<RenderView />
					<DataView />
				</VStack>
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
