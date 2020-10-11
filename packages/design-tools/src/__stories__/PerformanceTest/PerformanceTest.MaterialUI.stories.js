import { StatsGraph } from '@helpscout/stats';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Slider from '@material-ui/core/Slider';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
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

const useVStackStyles = makeStyles((theme) => ({
	root: {
		'& > * + *': {
			marginTop: theme.spacing(2),
		},
	},
}));

const HighPerfSlider = React.memo(({ prop, ...props }) => {
	const coords = useItemStore((state) => state[prop]);
	const setItem = useItemStore((state) => state.setItem);
	const [value, y] = coords;

	const handleOnChange = React.useCallback(
		(event, next) => {
			setItem({ id: prop, value: [next, y] });
		},
		[prop, setItem, y],
	);

	return (
		<Slider
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
		(event) => {
			setItem({ id: prop, value: [event.target.value, y] });
		},
		[prop, setItem, y],
	);

	return (
		<TextField
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
		<Grid container spacing={2}>
			<Grid item xs={2}>
				<Typography>{prop}</Typography>
			</Grid>
			<Grid item xs={5}>
				<HighPerfSlider prop={prop} />
			</Grid>
			<Grid item xs={5}>
				<HighPerfTextInput
					data-test={prop}
					fullWidth
					prop={prop}
					type="number"
				/>
			</Grid>
		</Grid>
	);
});

const SimulatedSearchView = React.memo(() => {
	const [searchQuery, setState] = useAppStoreState((state) => [
		state.searchQuery,
		state.setState,
	]);

	const handleOnChange = React.useCallback(
		(event) => setState({ searchQuery: event.target.value }),
		[setState],
	);

	return (
		<Card>
			<CardContent>
				<TextField
					data-test="search"
					fullWidth
					onChange={handleOnChange}
					value={searchQuery}
				/>
			</CardContent>
		</Card>
	);
});

const SimulatedControlsView = React.memo(() => {
	const styles = useVStackStyles();
	const items = useItemStore((state) => state.items);

	return (
		<Card>
			<CardContent>
				<Box className={styles.root}>
					{items.map((prop) => (
						<SliderNumberInput key={prop} prop={prop} />
					))}
				</Box>
			</CardContent>
		</Card>
	);
});

const useDataViewStyles = makeStyles(() => ({
	data: {
		fontSize: 10,
		lineHeight: 1,
		wordBreak: 'break-all',
		whiteSpace: 'break-spaces',
	},
}));

const DataView = React.memo(() => {
	const data = useDataOutput();

	const styles = useDataViewStyles();

	return (
		<Card>
			<CardContent>
				<Box className={styles.data}>{data}</Box>
			</CardContent>
		</Card>
	);
});

const useItemStyles = makeStyles(() => ({
	item: {
		position: 'absolute',
		width: '100px',
		height: '2px',
		background: '#999',
		transition: 'transform 200ms ease-in-out',
		opacity: '0.2',
	},
}));

const RenderItemView = React.memo(({ id, offset }) => {
	// Bind component to store, render it on coordinate changes
	const coords = useItemStore((state) => state[id]);
	const { value: reducedMotion } = useReducedMotion();
	const [x] = coords;
	const opacity = reducedMotion ? 0 : 0.2;
	const styles = useItemStyles();

	return (
		<Box
			className={styles.item}
			style={{
				transform: `translate(${x}px, ${offset}px)`,
				opacity,
			}}
		/>
	);
});

const useRenderViewStyles = makeStyles(() => ({
	content: {
		height: '50vh',
		position: 'relative',
	},
}));

const RenderView = React.memo(() => {
	const items = useItemStore((state) => state.items);
	const styles = useRenderViewStyles();
	return (
		<Card>
			<CardContent>
				<Box className={styles.content}>
					{items.map((id, index) => (
						<RenderItemView id={id} key={id} offset={index * 3} />
					))}
				</Box>
			</CardContent>
		</Card>
	);
});

const Example = () => {
	const vStackStyles = useVStackStyles();

	return (
		<Grid container spacing={3}>
			<Grid className={vStackStyles.root} item xs={4}>
				<SimulatedSearchView />
				<SimulatedControlsView />
			</Grid>
			<Grid className={vStackStyles.root} item xs={8}>
				<RenderView />
				<DataView />
			</Grid>
		</Grid>
	);
};

export const materialUI = () => {
	return (
		<AppContext.Provider value={{ dataStore }}>
			<StatsGraph />
			<Container maxWidth="lg">
				<PageHeader />
				<Example />
			</Container>
		</AppContext.Provider>
	);
};
