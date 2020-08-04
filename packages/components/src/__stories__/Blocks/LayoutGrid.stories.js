import faker from 'faker';
import React, { useState } from 'react';

import { Sidebar } from '../../__fixtures__/components';
import {
	Background,
	Button,
	ControlLabel,
	Flex,
	FormGroup,
	Panel,
	PanelBody,
	PanelHeader,
	SegmentedControl,
	Select,
	Sortable,
	Spacer,
	Switch,
	Text,
	TextField,
	View,
} from '../../index';

export default {
	title: 'Examples/Blocks',
};

const ResponsiveControls = () => {
	return (
		<View css={{ padding: '8px 0' }}>
			<SegmentedControl
				isBlock
				options={[
					{
						label: 'Desktop',
						value: 'phone',
					},
					{
						label: 'Tablet',
						value: 'tablet',
					},
					{
						label: 'Mobile',
						value: 'desktop',
					},
				]}
			/>
		</View>
	);
};

const Columns = () => {
	const createColumn = () => ({ gap: 0, id: faker.random.uuid(), span: 0 });
	const [columns, setColumns] = useState([createColumn()]);

	const addColumn = () => {
		setColumns((prev) => {
			return [...prev, createColumn()];
		});
	};

	const removeColumn = (id) => {
		setColumns((prev) => {
			if (prev.length > 1) {
				return prev.filter((item) => item.id !== id);
			}
			return prev;
		});
	};

	return (
		<>
			<FormGroup templateColumns="1fr auto">
				<ControlLabel weight={600}>
					Columns ({columns.length})
				</ControlLabel>
				<Button disabled={columns.length > 3} onClick={addColumn}>
					Add
				</Button>
			</FormGroup>
			<Spacer>
				<ResponsiveControls />
				<Background>
					<Sortable
						isSortable
						items={columns}
						onRemove={removeColumn}
						renderItem={({ item }) => {
							return (
								<View>
									<Spacer>
										<Text weight={600}>Column</Text>
									</Spacer>
									<FormGroup templateColumns="1fr 1fr">
										<TextField
											placeholder="Offset"
											type="number"
										/>
										<TextField
											placeholder="Span"
											type="number"
										/>
									</FormGroup>
								</View>
							);
						}}
					/>
				</Background>
			</Spacer>
		</>
	);
};

const InspectorControl = () => {
	return (
		<>
			<Panel visible>
				<PanelHeader title="Layout" />
				<PanelBody>
					<Columns />
				</PanelBody>
			</Panel>
			<Panel visible>
				<PanelHeader title="Gutter" />
				<PanelBody>
					<FormGroup label="Size">
						<Select
							options={[{ label: 'Large', value: 'large' }]}
						/>
					</FormGroup>
					<FormGroup label="Ends">
						<Flex justify="flex-end">
							<Switch />
						</Flex>
					</FormGroup>
				</PanelBody>
			</Panel>
		</>
	);
};

export const LayoutGrid = () => {
	return (
		<Sidebar>
			<InspectorControl />
		</Sidebar>
	);
};
