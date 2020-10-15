import React from 'react';

import {
	Card,
	CardBody,
	Container,
	FormGroup,
	Grid,
	ListGroup,
	ListGroupHeader,
	View,
	VStack,
} from '../../index';
import { PresetInput } from '../index';

export default {
	component: PresetInput,
	title: 'Components/PresetInput',
};

const Example = () => {
	const [value, setValue] = React.useState('13px');
	const presets = [
		{
			label: 'Small',
			key: 'small',
			value: '10px',
		},
		{
			label: 'Medium',
			key: 'medium',
			value: '16px',
		},
		{
			label: 'Large',
			key: 'large',
			value: '21px',
		},
	];

	const presetItem = presets.find((i) => i.label === value);
	const fontSize = presetItem ? presetItem.value : value;

	return (
		<Container
			css={`
				margin-top: 20vh;
			`}
			width={800}
		>
			<Grid templateColumns="1fr 265px">
				<View>
					<VStack>
						<Card>
							<CardBody scrollable={false}>
								<ListGroup>
									<ListGroupHeader>Preview</ListGroupHeader>
									<div style={{ fontSize }}>Gutenberg</div>
								</ListGroup>
							</CardBody>
						</Card>
						<Card>
							<CardBody scrollable={false}>
								<ListGroup>
									<ListGroupHeader>Value</ListGroupHeader>
									<div>{fontSize}</div>
								</ListGroup>
							</CardBody>
						</Card>
					</VStack>
				</View>
				<View>
					<Card>
						<CardBody>
							<FormGroup horizontal={false} label="Size">
								<PresetInput
									min={0}
									onChange={(n) => setValue(n)}
									presets={presets}
									value={value}
								/>
							</FormGroup>
						</CardBody>
					</Card>
				</View>
			</Grid>
		</Container>
	);
};

export const _default = () => {
	return <Example />;
};
