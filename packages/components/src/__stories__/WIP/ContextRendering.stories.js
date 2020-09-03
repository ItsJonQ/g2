import { ComponentsProvider } from '@wp-g2/context';
import {
	StyleSystemContext,
	ThemeProvider,
	useStyleSystemContext,
} from '@wp-g2/styles';
import React, { useEffect, useRef, useState } from 'react';
import Frame from 'react-frame-component';

import {
	Button,
	Card,
	CardBody,
	FormGroup,
	Grid,
	Popover,
	Subheading,
	Surface,
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
					<FormGroup isMarginless label="First Name">
						<TextField value="Elsa" />
					</FormGroup>
				</CardBody>
			</Card>
		</View>
	);
};

/**
 * Provides the closest document given where the React component rendered.
 */
function OwnerDocumentProvider({ children }) {
	const [ownerDocument, setOwnerDocument] = useState(null);
	const ref = useRef(null);

	useEffect(() => {
		if (ref.current) {
			setOwnerDocument(ref.current.ownerDocument);
		}
	}, [ref, setOwnerDocument]);

	return (
		<React.Fragment>
			{!ref.current ? <div ref={ref} /> : children({ ownerDocument })}
		</React.Fragment>
	);
}

function StyleSystemFrameProvider({ children }) {
	const styleSystem = useStyleSystemContext();
	return (
		<OwnerDocumentProvider>
			{({ ownerDocument }) => {
				if (styleSystem?.compiler?.sheet?.container) {
					// styleSystem.compiler.sheet.container = ownerDocument;
				}

				return (
					<StyleSystemContext.Provider value={{}}>
						{children}
					</StyleSystemContext.Provider>
				);
			}}
		</OwnerDocumentProvider>
	);
}

const Section = ({ children, title }) => {
	return (
		<Surface border css={{ padding: 20, paddingTop: 12 }}>
			<VStack alignment="left">
				<Subheading>{title}</Subheading>
				{children}
			</VStack>
		</Surface>
	);
};

const Example = () => {
	return (
		<Grid columns={3}>
			<Section title="Default">
				<Cluster />
			</Section>
			<Section title="Dark">
				<ThemeProvider isDark>
					<Cluster />
				</ThemeProvider>
			</Section>
			<Section title="Custom Context">
				<VStack>
					<Subheading>Inside Context</Subheading>
					<ComponentsProvider
						value={{ FormGroup: { horizontal: false } }}
					>
						<Cluster />
					</ComponentsProvider>
					<Subheading>Outside Context</Subheading>
					<Cluster />
				</VStack>
			</Section>

			<Section title="iFrame">
				<Frame style={{ width: '100%' }}>
					<StyleSystemFrameProvider>
						<Cluster />
					</StyleSystemFrameProvider>
				</Frame>
			</Section>
			<Section title="Dark + iFrame">
				<Frame style={{ width: '100%' }}>
					<StyleSystemFrameProvider>
						<ThemeProvider isDark>
							<Cluster />
						</ThemeProvider>
					</StyleSystemFrameProvider>
				</Frame>
			</Section>
			<Section title="Custom Context + iFrame">
				<Frame style={{ width: '100%' }}>
					<StyleSystemFrameProvider>
						<VStack>
							<Subheading>Inside Context</Subheading>
							<ComponentsProvider
								value={{ FormGroup: { horizontal: false } }}
							>
								<Cluster />
							</ComponentsProvider>
							<Subheading>Outside Context</Subheading>
							<Cluster />
						</VStack>
					</StyleSystemFrameProvider>
				</Frame>
			</Section>
			<Section title="Popover">
				<Card>
					<CardBody>
						<Popover
							hideOnClickOutside={false}
							placement="bottom-start"
							trigger={<Button>Popover</Button>}
							visible
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
								visible
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
