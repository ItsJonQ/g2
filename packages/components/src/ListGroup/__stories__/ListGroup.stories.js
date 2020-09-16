import {
	FiAlignCenter,
	FiAlignLeft,
	FiAlignRight,
	FiBold,
	FiGrid,
	FiType,
} from '@wp-g2/icons';
import { ui } from '@wp-g2/styles';
import React, { useState } from 'react';

import {
	Animated,
	AnimatedContainer,
	Button,
	Card,
	CardBody,
	ColorControl,
	Container,
	FormGroup,
	Grid,
	Icon,
	SegmentedControl,
	Select,
	Spacer,
	Stepper,
	Subheading,
	Switch,
	Text,
	TextField,
	View,
	VStack,
} from '../../index';
import {
	ListGroup,
	ListGroupFooter,
	ListGroupHeader,
	ListGroups,
} from '../index';

export default {
	component: ListGroup,
	title: 'Components/ListGroup',
};

const Example = () => {
	const [state, setState] = useState({
		colorText: true,
		colorBackground: true,
		fontFamily: true,
		fontWeight: true,
		fontSize: true,
		alignment: true,
	});
	const settings = Object.entries(state);

	const toggle = (k) => setState((prev) => ({ ...prev, [k]: !state[k] }));

	const align = [
		{
			label: <Icon icon={<FiAlignLeft />} size={14} />,
			value: 'left',
		},
		{
			label: <Icon icon={<FiAlignCenter />} size={14} />,
			value: 'center',
		},
		{
			label: <Icon icon={<FiAlignRight />} size={14} />,
			value: 'right',
		},
	];

	const {
		alignment,
		colorBackground,
		colorText,
		fontFamily,
		fontSize,
		fontWeight,
	} = state;

	const hasColor = [colorText, colorBackground].filter(Boolean).length;
	const hasTypography = [fontFamily, fontSize, fontWeight].filter(Boolean)
		.length;
	const hasFormatting = [alignment].filter(Boolean).length;

	return (
		<Grid>
			<Container width={260}>
				<AnimatedContainer>
					<ListGroups>
						{hasColor && (
							<ListGroup>
								<ListGroupHeader>Colors</ListGroupHeader>
								<Grid columns={2}>
									{colorText && (
										<ColorControl color="black">
											Text
										</ColorControl>
									)}
									{colorBackground && (
										<ColorControl color="#ddd">
											Background
										</ColorControl>
									)}
								</Grid>
							</ListGroup>
						)}

						{hasTypography && (
							<ListGroup>
								<ListGroupHeader>
									Typography
									<Button
										icon={<FiGrid />}
										size="small"
										variant="tertiary"
									/>
								</ListGroupHeader>
								{fontFamily && (
									<Animated auto key="fontFamily" layout>
										<FormGroup label="Family">
											<Select>
												<option>Barlow</option>
											</Select>
										</FormGroup>
									</Animated>
								)}
								<Grid>
									{fontWeight && (
										<Animated auto key="fontWeight" layout>
											<Select
												prefix={
													<View
														style={{
															width: 24,
															height: 24,
															padding: 4,
														}}
													>
														<Icon
															icon={<FiBold />}
															size={16}
														/>
													</View>
												}
											>
												<option>Normal</option>
											</Select>
										</Animated>
									)}
									{fontSize && (
										<Animated auto key="fontSize" layout>
											<Select
												prefix={
													<View
														style={{
															width: 24,
															height: 24,
															padding: 4,
														}}
													>
														<Icon
															icon={<FiType />}
															size={16}
														/>
													</View>
												}
											>
												<option>16px</option>
											</Select>
										</Animated>
									)}
								</Grid>
							</ListGroup>
						)}
						{hasFormatting && (
							<ListGroup>
								<ListGroupHeader>Formatting</ListGroupHeader>
								<FormGroup label="Alignment">
									<SegmentedControl options={align} />
								</FormGroup>
							</ListGroup>
						)}
					</ListGroups>
				</AnimatedContainer>
			</Container>
			<Container width={260}>
				<Card>
					<CardBody>
						<ListGroup>
							<ListGroupHeader>Controls</ListGroupHeader>
							{settings.map(([k, v]) => {
								return (
									<FormGroup
										key={k}
										label={k}
										templateColumns="1fr 80px"
									>
										<Switch
											checked={v}
											onChange={() => toggle(k)}
										/>
									</FormGroup>
								);
							})}
						</ListGroup>
					</CardBody>
				</Card>
			</Container>
		</Grid>
	);
};

export const _default = () => {
	return <Example />;
};
