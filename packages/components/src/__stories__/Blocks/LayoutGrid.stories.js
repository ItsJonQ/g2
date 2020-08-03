import * as icons from '@wordpress/icons';
import { useControlledState } from '@wp-g2/utils';
import React from 'react';

import {
	ContextPopover,
	ControlGroup,
	Sidebar,
	SuffixLabel,
} from '../../__fixtures__/components';
import {
	Background,
	Button,
	ColorField,
	ColorPicker,
	ControlLabel,
	Divider,
	Flex,
	FlexBlock,
	Grid,
	Icon,
	Panel,
	PanelBody,
	PanelHeader,
	Placeholder,
	SegmentedControl,
	Select,
	Separator,
	Slider,
	Sortable,
	Spacer,
	Text,
	TextField,
	View,
} from '../../index';

export default {
	title: 'Examples/Blocks',
};

const InspectorControl = () => {
	return (
		<>
			<Panel visible>
				<PanelHeader title="Layout" />
				<PanelBody>
					<ControlGroup>
						<ControlLabel>Columns</ControlLabel>
						<Select
							options={[
								{ label: '1 column', value: 'one' },
								{ label: '2 columns', value: 'two' },
								{ label: '3 columns', value: 'three' },
								{ label: '4 columns', value: 'four' },
							]}
							value="two"
						/>
					</ControlGroup>
					<Spacer>
						<Background>
							<Divider />
							<Sortable
								isSortable
								items={[
									{ id: 'column-1', value: 'Column' },
									{ id: 'column-2', value: 'Column' },
								]}
								renderItem={({ item }) => {
									return (
										<View>
											<Spacer>
												<Text weight={600}>
													{item.value}
												</Text>
											</Spacer>
											<Separator mb={2} mt={1} />
											<ControlGroup>
												<ControlLabel>
													Offset
												</ControlLabel>
												<TextField type="number" />
											</ControlGroup>
											<ControlGroup>
												<ControlLabel>
													Span
												</ControlLabel>
												<TextField type="number" />
											</ControlGroup>
										</View>
									);
								}}
							/>
						</Background>
					</Spacer>
					<ControlGroup>
						<ControlLabel>Gutter Size</ControlLabel>
						<Select
							options={[{ label: 'Large', value: 'large' }]}
						/>
					</ControlGroup>
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
