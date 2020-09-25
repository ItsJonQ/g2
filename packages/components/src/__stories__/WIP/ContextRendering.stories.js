import { ContextSystemProvider } from '@wp-g2/context';
import {
	cache,
	compiler,
	StyleFrameProvider,
	ThemeProvider,
} from '@wp-g2/styles';
import React, { useEffect, useRef, useState } from 'react';
import Frame from 'react-frame-component';

import {
	Alert,
	Alerts,
	Button,
	Card,
	CardBody,
	FormGroup,
	Grid,
	HStack,
	Popover,
	Subheading,
	Surface,
	Text,
	TextField,
	View,
	VStack,
} from '../../index';

export default {
	title: 'Examples/WIP/ContextRendering',
};

const Cluster = () => {
	return (
		<View>
			<Card>
				<CardBody>
					<FormGroup label="First Name">
						<TextField value="Elsa" />
					</FormGroup>
				</CardBody>
			</Card>
		</View>
	);
};

const Section = ({ children, title, works = true }) => {
	return (
		<Surface border css={{ padding: 20, paddingTop: 12 }}>
			<VStack alignment="left">
				<HStack>
					<Subheading>{title}</Subheading>
					<Text>{works ? '✅' : '❌'}</Text>
				</HStack>
				{children}
			</VStack>
		</Surface>
	);
};

const Example = () => {
	const [now, setNow] = useState(false);

	useEffect(() => {
		setTimeout(() => {
			setNow(true);
		}, 3000);
	}, []);

	return (
		<Grid columns={3}>
			<Section title="Default">
				<Cluster />
				<Alerts>
					{now && (
						<Alert status="success">
							<Text>New Element</Text>
						</Alert>
					)}
				</Alerts>
			</Section>
			<Section title="Dark">
				<ThemeProvider isDark>
					<Surface>
						<Cluster />
						<Alerts>
							{now && (
								<Alert status="success">
									<Text>New Element</Text>
								</Alert>
							)}
						</Alerts>
					</Surface>
				</ThemeProvider>
			</Section>
			<Section title="Custom Context">
				<VStack>
					<Subheading>Inside Context</Subheading>
					<ContextSystemProvider
						value={{ FormGroup: { horizontal: false } }}
					>
						<Cluster />
					</ContextSystemProvider>
					<Subheading>Outside Context</Subheading>
					<Cluster />
				</VStack>
			</Section>

			<Section title="iFrame">
				<Frame style={{ width: '100%' }}>
					<StyleFrameProvider>
						<Cluster />
						<Alerts>
							{now && (
								<Alert status="success">
									<Text>New Element</Text>
								</Alert>
							)}
						</Alerts>
					</StyleFrameProvider>
				</Frame>
			</Section>
			<Section title="Dark + iFrame">
				<Frame style={{ width: '100%' }}>
					<StyleFrameProvider>
						<ThemeProvider isDark>
							<Surface>
								<Cluster />
								<Alerts>
									{now && (
										<Alert status="success">
											<Text>New Element</Text>
										</Alert>
									)}
								</Alerts>
							</Surface>
						</ThemeProvider>
					</StyleFrameProvider>
				</Frame>
			</Section>
			<Section title="Custom Context + iFrame">
				<Frame style={{ width: '100%' }}>
					<StyleFrameProvider>
						<VStack>
							<Subheading>Inside Context</Subheading>
							<ContextSystemProvider
								value={{ FormGroup: { horizontal: false } }}
							>
								<Cluster />
							</ContextSystemProvider>
							<Subheading>Outside Context</Subheading>
							<Cluster />
						</VStack>
					</StyleFrameProvider>
				</Frame>
			</Section>
			<Section title="Popover">
				<Card>
					<CardBody>
						<Popover
							hideOnClickOutside={false}
							placement="bottom-start"
							trigger={<Button>Popover</Button>}
							visible={false}
						>
							<Cluster />
						</Popover>
					</CardBody>
				</Card>
			</Section>
			<Section title="Popover + Dark">
				<ThemeProvider isDark>
					<Card>
						<CardBody>
							<Popover
								hideOnClickOutside={false}
								placement="bottom-start"
								trigger={<Button>Popover</Button>}
								visible={false}
							>
								<Cluster />
							</Popover>
						</CardBody>
					</Card>
				</ThemeProvider>
			</Section>
			<View />
		</Grid>
	);
};

export const _default = () => {
	return <Example />;
};
