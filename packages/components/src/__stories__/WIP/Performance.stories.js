import { Schema } from '@wp-g2/protokit';
import { css, styled, ui } from '@wp-g2/styles';
import React, { useState } from 'react';

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
	Text,
	TextInput,
	View,
	VStack,
} from '../../index';

export default {
	title: 'Examples/WIP/Performance',
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

const SliderTextInput = React.memo(({ onChange, prop, value }) => {
	const handleOnChange = React.useCallback(
		(next) => {
			onChange({ [prop]: next });
		},
		[onChange, prop],
	);

	return (
		<Grid>
			<Slider onChange={handleOnChange} value={value} />
			<TextInput onChange={handleOnChange} type="number" value={value} />
		</Grid>
	);
});

const DimensionCard = React.memo(({ id, onChange, title, x, y, z }) => {
	const updateTitle = React.useCallback(
		(next) => {
			onChange({ id, title: next });
		},
		[onChange, id],
	);

	const updateValue = React.useCallback(
		(next) => {
			onChange({ id, ...next });
		},
		[onChange, id],
	);

	return (
		<Card>
			<CardBody>
				<ListGroup>
					<ListGroupHeader>Dimensions</ListGroupHeader>
					<FormGroup label="Title">
						<TextInput onChange={updateTitle} value={title} />
					</FormGroup>
					<FormGroup label="x">
						<SliderTextInput
							onChange={updateValue}
							prop="x"
							value={x}
						/>
					</FormGroup>
					<FormGroup label="y">
						<SliderTextInput
							onChange={updateValue}
							prop="y"
							value={y}
						/>
					</FormGroup>
					<FormGroup label="z">
						<SliderTextInput
							onChange={updateValue}
							prop="z"
							value={z}
						/>
					</FormGroup>
				</ListGroup>
			</CardBody>
		</Card>
	);
});

const Example = () => {
	const [dimensions, setDimensions] = useState([...dimensionSchema.make(1)]);

	const addDimension = () => {
		setDimensions((prev) => [...prev, dimensionSchema.makeOne()]);
	};

	const updateDimension = React.useCallback((next) => {
		setDimensions((prev) =>
			prev.map((d) => {
				if (d.id !== next.id) return d;
				return {
					...d,
					...next,
				};
			}),
		);
	}, []);

	return (
		<>
			<Container
				css={css([ui.position.relative, ui.zIndex(2)])}
				width={600}
			>
				<VStack>
					<HStack>
						<Button onClick={addDimension} variant="primary">
							Add New
						</Button>
					</HStack>
					<ListGroup>
						{dimensions.map((item) => {
							return (
								<DimensionCard
									{...item}
									onChange={updateDimension}
								/>
							);
						})}
					</ListGroup>
				</VStack>
			</Container>
			<Frame variant="dotted" />
		</>
	);
};

export const _default = () => {
	return <Example />;
};
