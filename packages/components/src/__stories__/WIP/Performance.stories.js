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

const SliderTextInput = ({ onChange, value }) => {
	return (
		<Grid>
			<Slider onChange={onChange} value={value} />
			<TextInput onChange={onChange} value={value} />
		</Grid>
	);
};

const DimensionCard = ({ onChange, title, x, y, z }) => {
	return (
		<Card>
			<CardBody>
				<ListGroup>
					<ListGroupHeader>Dimensions</ListGroupHeader>
					<FormGroup label="Title">
						<TextInput
							onChange={(next) => onChange({ title: next })}
							value={title}
						/>
					</FormGroup>
					<FormGroup label="x">
						<SliderTextInput
							onChange={(next) => onChange({ x: next })}
							value={x}
						/>
					</FormGroup>
					<FormGroup label="y">
						<SliderTextInput
							onChange={(next) => onChange({ y: next })}
							value={y}
						/>
					</FormGroup>
					<FormGroup label="z">
						<SliderTextInput
							onChange={(next) => onChange({ z: next })}
							value={z}
						/>
					</FormGroup>
				</ListGroup>
			</CardBody>
		</Card>
	);
};

const Example = () => {
	const [dimensions, setDimensions] = useState([...dimensionSchema.make(10)]);

	const addDimension = () => {
		setDimensions((prev) => [...prev, dimensionSchema.makeOne()]);
	};

	const updateDimension = (id) => (next) => {
		setDimensions((prev) =>
			prev.map((d) => {
				if (d.id !== id) return d;
				return {
					...d,
					...next,
				};
			}),
		);
	};

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
									onChange={updateDimension(item.id)}
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
