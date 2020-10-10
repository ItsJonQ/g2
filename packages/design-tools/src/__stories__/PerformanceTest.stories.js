import { StatsGraph } from '@helpscout/stats';
import {
	Alert,
	Alerts,
	Badge,
	Button,
	Card,
	CardBody,
	Container,
	FormGroup,
	Grid,
	Heading,
	HStack,
	ListGroup,
	ListGroupHeader,
	SearchInput,
	Slider,
	Spacer,
	Switch,
	Text,
	TextInput,
	View,
	VStack,
} from '@wp-g2/components';
import { faker } from '@wp-g2/protokit';
import { ui } from '@wp-g2/styles';
import { createStore, useSubState } from '@wp-g2/substate';
import { clamp } from '@wp-g2/utils';
import React from 'react';

const ids = [...Array(150)].fill(0).map((v, i) => i);
const calcXY = () => [
	(Math.random() * window.innerWidth) / 2.5,
	(Math.random() * window.innerHeight) / 2,
];

const useItemStore = createStore((set) => ({
	items: ids,
	...ids.reduce((acc, id) => ({ ...acc, [id]: calcXY() }), 0),
	advance() {
		// Set all coordinates randomly
		set((state) => {
			const coords = {};
			for (let i = 0; i < state.items.length; i++)
				coords[state.items[i]] = calcXY();
			return coords;
		});
	},
}));

const useReducedMotion = createStore((set) => ({
	value: false,
	toggle: () => set((prev) => ({ value: !prev.value })),
}));

export default {
	title: 'DesignTools/PerformanceTest',
};

const dataStore = createStore((set) => ({
	height: 50,
	width: 50,
	x: 0,
	y: 0,
	opacity: 100,
	searchQuery: '',
	setState: set,
}));

const AppContext = React.createContext({ dataStore });
const useAppContext = () => React.useContext(AppContext);
const useAppStoreState = (...args) => useAppContext().dataStore(...args);

const getTestNode = (query) => document.querySelector(`[data-test="${query}"]`);

const updateTestNode = (query, value) => {
	const node = getTestNode(query);
	if (!node) return;
	const nodeEventHandlersKey = Object.keys(node).find((keys) =>
		keys.includes('__reactEventHandlers'),
	);
	const nodeReactHandlers = node[nodeEventHandlersKey];
	nodeReactHandlers.onFocus();
	nodeReactHandlers.onChange({
		target: { value },
	});
	nodeReactHandlers.onBlur();
};

const Autopilot = React.memo(() => {
	const store = useSubState((set) => ({
		value: false,
		setValue: (next) => set({ value: next }),
	}));

	const { setValue, value } = store();
	const autoPilotTimerRef = React.useRef();

	const tickOnce = React.useCallback(() => {
		cancelAnimationFrame(autoPilotTimerRef.current);

		updateTestNode('search', faker.lorem.sentence());
		updateTestNode(
			faker.random.arrayElement(['height', 'width', 'opacity', 'x', 'y']),
			faker.random.number({
				min: 0,
				max: 100,
			}),
		);
	}, []);

	React.useEffect(() => {
		return dataStore.subscribe(useItemStore.getState().advance);
	});

	React.useEffect(() => {
		tickOnce();
	}, [tickOnce]);

	React.useEffect(() => {
		cancelAnimationFrame(autoPilotTimerRef.current);

		const tick = () => {
			autoPilotTimerRef.current = requestAnimationFrame(() => {
				tickOnce();
				tick();
			});
		};

		if (value) {
			tick();
		} else {
			cancelAnimationFrame(autoPilotTimerRef.current);
		}

		return () => {
			cancelAnimationFrame(autoPilotTimerRef.current);
		};
	}, [tickOnce, value]);

	const handleOnTickClick = React.useCallback(() => {
		tickOnce();
		setValue(false);
	}, [setValue, tickOnce]);

	return (
		<HStack alignment="left">
			<FormGroup
				label="Autopilot (Stress Test)"
				templateColumns="1fr 100px"
			>
				<Switch
					checked={value}
					data-autopilot="true"
					onChange={setValue}
				/>
			</FormGroup>
			<Button onClick={handleOnTickClick}>Tick</Button>
		</HStack>
	);
});

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
	const itemstore = useItemStore();
	const items = Object.keys(itemstore)
		.filter((v, i) => i < 149)
		.map((i) => Math.round(itemstore[i][0]));
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
	const opacity = reducedMotion ? 0 : x / (window.innerWidth / 4);

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

const ReducedMotionToggle = React.memo(() => {
	const { toggle, value } = useReducedMotion();

	return (
		<FormGroup label="Reduced Motion" templateColumns="160px 60px">
			<Switch checked={value} onChange={toggle} />
		</FormGroup>
	);
});

export const _default = () => {
	return (
		<AppContext.Provider value={{ dataStore }}>
			<StatsGraph />
			<Container>
				<Spacer mb={8} py={4}>
					<Spacer mb={5}>
						<Alerts>
							<Alert status="warning">
								<Text>
									<span aria-label="Warning" role="img">
										⚠️
									</span>{' '}
									<strong>Warning</strong>: The test contains
									rapid flashing lights that may does
									discomfort and/or seizures for those with
									photosensitive epilepsy.
								</Text>
							</Alert>
						</Alerts>
					</Spacer>
					<VStack>
						<Heading>Performance Tests</Heading>
						<Text>
							This example is used to stress test and measure UI
							performance within G2.
						</Text>
					</VStack>
				</Spacer>
				<Spacer my={4}>
					<HStack>
						<Autopilot />
						<ReducedMotionToggle />
					</HStack>
				</Spacer>
				<Example />
			</Container>
		</AppContext.Provider>
	);
};
