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

const DimensionCard = React.memo(({ onChange, title, x, y, z }) => {
	const update = React.useCallback(
		(key) => (next) => {
			onChange({ [key]: next });
		},
		[onChange],
	);

	return (
		<Card>
			<CardBody>
				<ListGroup>
					<ListGroupHeader>Dimensions</ListGroupHeader>
					<FormGroup label="Title">
						<TextInput onChange={update('title')} value={title} />
					</FormGroup>
					<FormGroup label="x">
						<SliderTextInput onChange={update('x')} value={x} />
					</FormGroup>
					<FormGroup label="y">
						<SliderTextInput onChange={update('y')} value={y} />
					</FormGroup>
					<FormGroup label="z">
						<SliderTextInput onChange={update('z')} value={z} />
					</FormGroup>
				</ListGroup>
			</CardBody>
		</Card>
	);
});

const Example = () => {
	const [dimensions, setDimensions] = useState([...dimensionSchema.make(10)]);

	const addDimension = () => {
		setDimensions((prev) => [...prev, dimensionSchema.makeOne()]);
	};

	const updateDimension = React.useCallback(
		(id) => (next) => {
			setDimensions((prev) =>
				prev.map((d) => {
					if (d.id !== id) return d;
					return {
						...d,
						...next,
					};
				}),
			);
		},
		[],
	);

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
