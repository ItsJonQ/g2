import { StatsGraph } from '@helpscout/stats';
import {
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
const useAppStore = (...args) => useAppContext().dataStore;
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
		clearTimeout(autoPilotTimerRef.current);

		updateTestNode('search', faker.lorem.sentence());
		updateTestNode(
			'height',
			faker.random.number({
				min: 0,
				max: 100,
			}),
		);
		updateTestNode(
			'width',
			faker.random.number({
				min: 0,
				max: 100,
			}),
		);
		updateTestNode(
			'opacity',
			faker.random.number({
				min: 0,
				max: 100,
			}),
		);
		updateTestNode(
			'x',
			faker.random.number({
				min: 0,
				max: 100,
			}),
		);
		updateTestNode(
			'y',
			faker.random.number({
				min: 0,
				max: 100,
			}),
		);
	}, []);

	React.useEffect(() => {
		clearTimeout(autoPilotTimerRef.current);

		const tick = () => {
			autoPilotTimerRef.current = setTimeout(() => {
				tickOnce();
				tick();
			}, 60);
		};

		if (value) {
			tick();
		} else {
			clearTimeout(autoPilotTimerRef.current);
		}

		return () => {
			clearTimeout(autoPilotTimerRef.current);
		};
	}, [tickOnce, value]);

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
			<Button onClick={tickOnce}>Tick</Button>
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
					{JSON.stringify(state, null, 2)}
				</View>
			</CardBody>
		</Card>
	);
});

const RenderView = React.memo(() => {
	const state = useAppStoreState((state) => state);
	const { height, opacity, searchQuery = '', width, x, y } = state;
	const algo = clamp(
		Math.round((searchQuery.length * 2 * width) / (height / 2)),
		0,
		200,
	);

	const algoNum = isNaN(algo) ? 200 : algo;

	const shapes = [...Array(algoNum)].fill(0);

	return (
		<Card>
			<CardBody>
				<View
					css={`
						height: 50vh;
						position: relative;
					`}
				>
					{shapes.map((v, index) => (
						<View
							key={index}
							style={{
								position: 'absolute',
								top: 0,
								left: 0,
								transform: `translate(${+x * index}px, ${
									+y * index
								}px)`,
								height: +width - index,
								width: +width - index,
								opacity: opacity / 100 - index / 100,
								background: ui.get('colorText'),
							}}
						/>
					))}
				</View>
			</CardBody>
		</Card>
	);
});

const Example = () => {
	return (
		<Grid templateColumns="1fr 1fr 2fr">
			<View>
				<VStack expanded={false}>
					<SimulatedSearchView />
					<DataView />
				</VStack>
			</View>
			<View>
				<SimulatedControlsView />
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
				<Spacer mb={8} py={4}>
					<VStack>
						<Heading>Performance Tests</Heading>
						<Text>
							This example is used to stress test and measure UI
							performance within G2.
						</Text>
					</VStack>
				</Spacer>
				<Spacer my={4}>
					<Autopilot />
				</Spacer>
				<Example />
			</Container>
		</AppContext.Provider>
	);
};
