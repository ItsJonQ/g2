import {
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
	Slider,
	Spacer,
	Surface,
	TextInput,
	VStack,
} from '@wp-g2/components';
import { Schema } from '@wp-g2/protokit';
import { css, styled, ui } from '@wp-g2/styles';
import { createStore, shallowCompare } from '@wp-g2/utils';
import React from 'react';

export default {
	title: 'DesignTools/GenericTool/StoreState/PerformanceTest',
};

const Frame = styled(Surface)`
	align-items: center;
	bottom: 0;
	display: flex;
	justify-content: center;
	left: 0;
	position: fixed;
	right: 0;
	top: 0;
`;

const dimensionSchema = new Schema(() => ({
	title: '',
	x: 0,
	y: 1,
	z: 0,
}));

/**
 * Creating a context so that inner components can have access to this
 * zustand store instance.
 */
const DimensonsContext = React.createContext({ dimensions: [] });
const useDimensionsContext = () => React.useContext(DimensonsContext);

/**
 * Unnecessary, but it's useful to demonstrate that a unique store instance
 * can be created and scoped within a React component. This is important.
 * For our purposes (that being a library), the store should unique instances,
 * rather than singletons that live outside.
 */
const createExampleStore = () => {
	return createStore((set) => ({
		dimensions: [...dimensionSchema.make(10)],
		add: () =>
			set((state) => ({
				dimensions: [...state.dimensions, dimensionSchema.makeOne()],
			})),
		update: (_arg) => {
			const { id, prop, value } = _arg;
			set((state) => ({
				dimensions: state.dimensions.map((item) => {
					if (item.id !== id) return item;
					return { ...item, [prop]: value };
				}),
			}));
		},
	}));
};

/**
 * A hook to get/set a single item in the store's state (list).
 */
const useDimension = (id) => {
	const { useStore } = useDimensionsContext();
	const { update } = useStore();
	const dimension = useStore(
		React.useCallback(
			(state) => state.dimensions.find((i) => i.id === id),
			[id],
		),
		/**
		 * Not sure if it helps...
		 * https://github.com/pmndrs/zustand#selecting-multiple-state-slices
		 */
		shallowCompare,
	);

	return [dimension || {}, update];
};

const SliderTextInput = React.memo(({ id, prop }) => {
	const [dimension, update] = useDimension(id);
	const value = dimension[prop];

	const handleOnChange = React.useCallback(
		(next) => {
			update({ id, prop, value: next });
		},
		[update, prop, id],
	);

	return (
		<Grid>
			<Slider onChange={handleOnChange} value={value} />
			<TextInput onChange={handleOnChange} type="number" value={value} />
		</Grid>
	);
});

const TitleInput = React.memo(({ id }) => {
	const [{ title: value }, update] = useDimension(id);

	const handleOnChange = React.useCallback(
		(next) => {
			update({ id, prop: 'title', value: next });
		},
		[update, id],
	);

	return <TextInput onChange={handleOnChange} value={value} />;
});

const DimensionCard = React.memo(({ id }) => {
	return (
		<Card>
			<CardBody>
				<ListGroup>
					<ListGroupHeader>Dimensions</ListGroupHeader>
					<FormGroup label="Title">
						<TitleInput id={id} />
					</FormGroup>
					<FormGroup label="x">
						<SliderTextInput id={id} prop="x" />
					</FormGroup>
					<FormGroup label="y">
						<SliderTextInput id={id} prop="y" />
					</FormGroup>
					<FormGroup label="z">
						<SliderTextInput id={id} prop="z" />
					</FormGroup>
				</ListGroup>
			</CardBody>
		</Card>
	);
});

const DimensionsList = React.memo(() => {
	const { useStore } = useDimensionsContext();
	const { dimensions } = useStore();

	return (
		<ListGroup>
			{dimensions.map((item) => {
				return <DimensionCard id={item.id} key={item.id} />;
			})}
		</ListGroup>
	);
});

const AddDimensionsButton = React.memo(() => {
	const { useStore } = useDimensionsContext();
	const { add } = useStore();

	return (
		<Button onClick={add} variant="primary">
			Add New
		</Button>
	);
});

const Example = () => {
	const dataStore = createExampleStore();
	const contextValue = {
		useStore: dataStore,
	};

	return (
		<>
			<Container
				css={css([ui.position.relative, ui.zIndex(2)])}
				width={600}
			>
				<Spacer>
					<Heading>Using createStore (Zustand)</Heading>
				</Spacer>
				<DimensonsContext.Provider value={contextValue}>
					<VStack>
						<HStack>
							<AddDimensionsButton />
						</HStack>
						<DimensionsList />
					</VStack>
				</DimensonsContext.Provider>
			</Container>
			<Frame variant="dotted" />
		</>
	);
};

export const _default = () => {
	return <Example />;
};
