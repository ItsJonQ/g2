import {
	Badge,
	Card,
	CardBody,
	Container,
	FormGroup,
	Grid,
	Heading,
	ListGroup,
	ListGroupHeader,
	Spacer,
	Switch,
	Text,
	TextInput,
	View,
	VStack,
} from '@wp-g2/components';
import { ui } from '@wp-g2/styles';
import { createStore, useSubState } from '@wp-g2/substate';
import { noop } from '@wp-g2/utils';
import React from 'react';

export default {
	title: 'DesignTools/DataFlow',
};

const dataStore = createStore((set) => ({
	height: 0,
	width: 0,
	x: 0,
	y: 0,
	z: 0,
}));

const AppContext = React.createContext({ dataStore });
const useAppContext = () => React.useContext(AppContext);

function getRandomInt(max) {
	return Math.floor(Math.random() * Math.floor(max));
}

const TextControl = React.memo(
	({ onChange = noop, onUpdate = noop, ...otherProps }) => {
		return (
			<TextInput
				{...otherProps}
				onChange={onChange}
				onValueSync={onUpdate}
			/>
		);
	},
);

const RenderedValues = () => {
	const { dataStore } = useAppContext();
	const data = dataStore();

	return (
		<View>
			<pre style={{ margin: 0 }}>
				<code>{JSON.stringify(data, null, 2)}</code>
			</pre>
		</View>
	);
};

const useDataStoreValue = ({ prop }) => {
	const { dataStore } = useAppContext();
	const value = dataStore(React.useCallback((state) => state[prop], [prop]));

	return [value, dataStore];
};

const DataControl = React.memo(
	({ label = 'Label', prop, validate, onUpdate = noop }) => {
		const [value, dataStore] = useDataStoreValue({ prop });

		const handleOnChange = React.useCallback(
			(next) => {
				dataStore.setState({ [prop]: next });
			},
			[dataStore, prop],
		);

		return (
			<FormGroup label={label}>
				<Grid templateColumns="1fr auto">
					<TextControl
						onChange={handleOnChange}
						onUpdate={onUpdate}
						type="number"
						validate={validate}
						value={value}
					/>
				</Grid>
			</FormGroup>
		);
	},
);

const ChangeNotification = React.memo(({ store }) => {
	const { count, visible } = store();
	const timeoutRef = React.useRef();

	React.useEffect(() => {
		if (count) {
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
			}
			timeoutRef.current = setTimeout(() => {
				store.setState({ visible: false });
			}, 600);
		}
		return () => {
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
			}
		};
	}, [count, store]);

	return (
		<Badge
			color="green"
			css={[
				ui.opacity(visible ? 1 : 0),
				ui.animation.default,
				{ maxWidth: '100%' },
			]}
		>
			Incoming Change
		</Badge>
	);
});

const useChangeStore = () => {
	return useSubState((set) => ({
		count: 0,
		visible: false,
		increment: () => {
			set((state) => ({ count: state.count + 1, visible: true }));
		},
	}));
};

const DataStoreLayer = React.memo(() => {
	const store = useChangeStore();
	const increment = store(React.useCallback((state) => state.increment, []));

	return (
		<VStack>
			<ChangeNotification store={store} />
			<Card>
				<CardBody>
					<ListGroup>
						<ListGroupHeader>Data Store (WP Data)</ListGroupHeader>
						<DataControl
							label="Height"
							onUpdate={increment}
							prop="height"
						/>
						<DataControl
							label="Width"
							onUpdate={increment}
							prop="width"
						/>
						<DataControl label="X" onUpdate={increment} prop="x" />
						<DataControl label="Y" onUpdate={increment} prop="y" />
						<DataControl label="Z" onUpdate={increment} prop="z" />
					</ListGroup>
				</CardBody>
			</Card>
		</VStack>
	);
});

const ControlsLayer = React.memo(() => {
	const store = useChangeStore();
	const increment = store(React.useCallback((state) => state.increment, []));

	return (
		<VStack>
			<ChangeNotification store={store} />
			<Card>
				<CardBody>
					<ListGroup>
						<ListGroupHeader>
							Controls (Editor Controls)
						</ListGroupHeader>
						<DataControl
							label="Height"
							onUpdate={increment}
							prop="height"
						/>
						<DataControl
							label="Width"
							onUpdate={increment}
							prop="width"
						/>
						<DataControl label="X" onUpdate={increment} prop="x" />
						<DataControl label="Y" onUpdate={increment} prop="y" />
						<DataControl label="Z" onUpdate={increment} prop="z" />
					</ListGroup>
				</CardBody>
			</Card>
		</VStack>
	);
});

const RenderedLayer = React.memo(() => {
	const { dataStore } = useAppContext();
	const store = useChangeStore();

	React.useEffect(() => {
		const unsub = dataStore.subscribe(store.getState().increment);

		return unsub;
	}, [dataStore, store]);

	return (
		<VStack>
			<ChangeNotification store={store} />
			<Card>
				<CardBody>
					<ListGroup>
						<ListGroupHeader>Rendered (Attributes)</ListGroupHeader>
						<RenderedValues />
					</ListGroup>
				</CardBody>
			</Card>
		</VStack>
	);
});

const Autopilot = React.memo(() => {
	const store = useSubState((set) => ({
		value: 0,
		setValue: (next) => set({ value: Number(next) }),
	}));

	const { setValue, value } = store();
	const autoPilotTimerRef = React.useRef();

	React.useEffect(() => {
		const inputFields = document.querySelectorAll(
			'[data-g2-component="TextInput"]:not([data-autopilot="true"])',
		);

		clearTimeout(autoPilotTimerRef.current);

		const tick = () => {
			autoPilotTimerRef.current = setTimeout(() => {
				clearTimeout(autoPilotTimerRef.current);
				try {
					const index = getRandomInt(inputFields.length);
					const node = inputFields[index];
					const nodeEventHandlersKey = Object.keys(
						node,
					).find((keys) => keys.includes('__reactEventHandlers'));
					const nodeReactHandlers = node[nodeEventHandlersKey];

					nodeReactHandlers.onFocus();
					nodeReactHandlers.onChange({
						target: { value: getRandomInt(100000) },
					});
					nodeReactHandlers.onBlur();
				} catch (err) {
					console.log(err);
				}
				tick();
			}, 100 / value);
		};

		if (value) {
			tick();
		} else {
			clearTimeout(autoPilotTimerRef.current);
		}

		return () => {
			clearTimeout(autoPilotTimerRef.current);
		};
	}, [value]);

	return (
		<FormGroup
			css="width: 300px"
			label="Autopilot (Stress Test)"
			templateColumns="1fr 100px"
		>
			<TextInput
				data-autopilot="true"
				max={11}
				min={0}
				onChange={setValue}
				type="number"
				value={value}
			/>
		</FormGroup>
	);
});

const Example = () => {
	return (
		<Grid columns={3}>
			<View>
				<DataStoreLayer />
			</View>
			<View>
				<ControlsLayer />
			</View>
			<View>
				<RenderedLayer />
			</View>
		</Grid>
	);
};

export const _default = () => {
	return (
		<AppContext.Provider value={{ dataStore }}>
			<Container>
				<Spacer mb={8} py={4}>
					<VStack>
						<Heading>Data Synchronization + Rendering</Heading>
						<Text>
							This example demonstrates the flow of data within
							the Editor.
						</Text>
						<Text>
							Data flows in multiple directions between the Data
							Store and Controls layer.
						</Text>
						<Text>
							The rendered layer only accepts incoming data only.
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
