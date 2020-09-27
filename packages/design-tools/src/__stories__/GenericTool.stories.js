import {
	Button,
	Card,
	CardBody,
	Container,
	FormGroup,
	Grid,
	HStack,
	ListGroup,
	ListGroupHeader,
	Slider,
	Surface,
	TextInput,
	VStack,
} from '@wp-g2/components';
import { Schema } from '@wp-g2/protokit';
import { css, styled, ui } from '@wp-g2/styles';
import { atom, Provider, useAtom } from 'jotai';
import React from 'react';

export default {
	title: 'DesignTools/GenericTool/PerformanceTest',
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

const SliderTextInput = React.memo(({ id, prop, value }) => {
	const { updateDimension: atom } = useDimensionsContext();
	const [, updateDimension] = useAtom(atom);

	const handleOnChange = React.useCallback(
		(next) => {
			updateDimension({ id, prop, value: next });
		},
		[updateDimension, prop, id],
	);

	return (
		<Grid>
			<Slider onChange={handleOnChange} value={value} />
			<TextInput onChange={handleOnChange} type="number" value={value} />
		</Grid>
	);
});

const TitleInput = React.memo(({ id, value }) => {
	const { updateDimension: atom } = useDimensionsContext();
	const [, updateDimension] = useAtom(atom);

	const handleOnChange = React.useCallback(
		(next) => {
			updateDimension({ id, prop: 'title', value: next });
		},
		[updateDimension, id],
	);

	return <TextInput onChange={handleOnChange} value={value} />;
});

const DimensionCard = React.memo(({ id, title, x, y, z }) => {
	return (
		<Card>
			<CardBody>
				<ListGroup>
					<ListGroupHeader>Dimensions</ListGroupHeader>
					<FormGroup label="Title">
						<TitleInput id={id} value={title} />
					</FormGroup>
					<FormGroup label="x">
						<SliderTextInput id={id} prop="x" value={x} />
					</FormGroup>
					<FormGroup label="y">
						<SliderTextInput id={id} prop="y" value={y} />
					</FormGroup>
					<FormGroup label="z">
						<SliderTextInput id={id} prop="z" value={z} />
					</FormGroup>
				</ListGroup>
			</CardBody>
		</Card>
	);
});

const DimensonsContext = React.createContext({ dimensions: [] });
const useDimensionsContext = () => React.useContext(DimensonsContext);

const DimensionsList = React.memo(() => {
	const { dimensions: atom } = useDimensionsContext();
	const [dimensions] = useAtom(atom);

	return (
		<ListGroup>
			{dimensions.map((item) => {
				return <DimensionCard {...item} />;
			})}
		</ListGroup>
	);
});

const AddDimensionsButton = React.memo(() => {
	const { addDimension: atom } = useDimensionsContext();
	const [, addDimension] = useAtom(atom);

	return (
		<Button onClick={addDimension} variant="primary">
			Add New
		</Button>
	);
});

const Example = () => {
	const dimensions = atom([...dimensionSchema.make(10)]);

	const updateDimension = atom(
		(get) => get(dimensions),
		(get, set, _arg) => {
			const { id, prop, value } = _arg;
			set(
				dimensions,
				get(dimensions).map((item) => {
					if (item.id !== id) return item;
					return { ...item, [prop]: value };
				}),
			);
		},
	);

	const addDimension = atom(
		(get) => get(dimensions),
		(get, set) => {
			set(dimensions, [...get(dimensions), dimensionSchema.makeOne()]);
		},
	);

	const contextValue = {
		addDimension,
		updateDimension,
		dimensions,
	};

	return (
		<>
			<Container
				css={css([ui.position.relative, ui.zIndex(2)])}
				width={600}
			>
				<DimensonsContext.Provider value={contextValue}>
					<Provider>
						<VStack>
							<HStack>
								<AddDimensionsButton />
							</HStack>
							<DimensionsList />
						</VStack>
					</Provider>
				</DimensonsContext.Provider>
			</Container>
			<Frame variant="dotted" />
		</>
	);
};

export const _default = () => {
	return <Example />;
};
