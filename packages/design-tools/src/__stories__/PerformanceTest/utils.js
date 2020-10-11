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
import { createStore, useSubState } from '@wp-g2/substate';
import React from 'react';

const ids = [...Array(120)].fill(0).map((v, i) => i);
const calcXY = () => [
	(Math.random() * window.innerWidth) / 2.5,
	(Math.random() * window.innerHeight) / 2,
];

export const useItemStore = createStore((set) => ({
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

export const useItemData = () => {
	const itemstore = useItemStore();
	const items = Object.keys(itemstore)
		.filter((v, i) => i < 149)
		.map((i) => Math.round(itemstore[i][0]));

	return items;
};

export const useReducedMotion = createStore((set) => ({
	value: false,
	toggle: () => set((prev) => ({ value: !prev.value })),
}));

export const dataStore = createStore((set) => ({
	height: 50,
	width: 50,
	x: 0,
	y: 0,
	opacity: 100,
	searchQuery: '',
	setState: set,
}));

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

		const nextProp = faker.random.arrayElement([
			'height',
			'width',
			'opacity',
			'x',
			'y',
		]);
		const nextPropValue = faker.random.number({
			min: 0,
			max: 100,
		});
		dataStore.setState({ searchQuery: faker.lorem.sentence() });
		dataStore.setState({ [nextProp]: nextPropValue });
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
