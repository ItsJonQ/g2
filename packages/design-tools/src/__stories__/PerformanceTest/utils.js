import {
	Alert,
	Alerts,
	Button,
	FormGroup,
	Heading,
	HStack,
	Spacer,
	Switch,
	Text,
	VStack,
} from '@wp-g2/components';
import { faker } from '@wp-g2/protokit';
import React from 'react';
import createStore from 'zustand';

function useSubState(createState) {
	return React.useRef(createStore(createState)).current;
}

const ids = [...Array(120)].fill(0).map((v, i) => i);
const calcXY = () => [
	Math.round((Math.random() * window.innerWidth) / 2.5),
	Math.round((Math.random() * window.innerHeight) / 2),
];

export const useItemStore = createStore((set) => ({
	items: ids,
	...ids.reduce((acc, id) => ({ ...acc, [id]: calcXY() }), 0),
	setItem: ({ id, value }) => set({ [id]: value }),
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

export const useItemData = () => {
	const itemstore = useItemStore();
	const items = Object.keys(itemstore)
		.filter((v, i) => i < 149)
		.map((i) => itemstore[i]);

	return items;
};

export const useReducedMotion = createStore((set) => ({
	value: false,
	toggle: () => set((prev) => ({ value: !prev.value })),
}));

export const dataStore = createStore((set) => ({
	searchQuery: '',
	setState: set,
}));

export const useDataOutput = () => {
	const state = useAppStoreState((state) => state);
	const items = useItemData();

	return [
		JSON.stringify(state),
		JSON.stringify(items),
		JSON.stringify(items),
		JSON.stringify(items),
		JSON.stringify(items),
		JSON.stringify(items),
		JSON.stringify(items),
		JSON.stringify(items),
		JSON.stringify(items),
		JSON.stringify(items),
		JSON.stringify(items),
		JSON.stringify(items),
		JSON.stringify(items),
		JSON.stringify(items),
		JSON.stringify(items),
		JSON.stringify(items),
	].join('');
};

export const AppContext = React.createContext({ dataStore });
export const useAppContext = () => React.useContext(AppContext);
export const useAppStoreState = (...args) => useAppContext().dataStore(...args);

export const Autopilot = React.memo(() => {
	const store = useSubState((set) => ({
		value: false,
		setValue: (next) => set({ value: next }),
	}));

	const { setValue, value } = store();
	const autoPilotTimerRef = React.useRef();

	const tickOnce = React.useCallback(() => {
		cancelAnimationFrame(autoPilotTimerRef.current);
		dataStore.setState({ searchQuery: faker.lorem.sentence() });
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

export const ReducedMotionToggle = React.memo(() => {
	const { toggle, value } = useReducedMotion();

	return (
		<FormGroup label="Reduced Motion" templateColumns="160px 60px">
			<Switch checked={value} onChange={toggle} />
		</FormGroup>
	);
});

export const PageHeader = React.memo(() => {
	return (
		<>
			<Spacer mb={8} py={4}>
				<Spacer mb={5}>
					<Alerts>
						<Alert status="warning">
							<Text>
								<span aria-label="Warning" role="img">
									⚠️
								</span>{' '}
								<strong>Warning</strong>: The test contains
								rapid flashing lights that may does discomfort
								and/or seizures for those with photosensitive
								epilepsy.
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
		</>
	);
});
