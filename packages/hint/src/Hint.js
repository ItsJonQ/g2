import {
	Animated,
	Button,
	Card,
	CardHeader,
	Heading,
	Panel,
	PanelBody,
	PanelHeader,
	Spacer,
	Text,
} from '@wp-g2/components';
import { FiAperture } from '@wp-g2/icons';
import { ns, ui } from '@wp-g2/styles';
import React, { useState } from 'react';

const [CONNECTED_NAMESPACE] = Object.keys(ns());

const selector = (name) => `[${CONNECTED_NAMESPACE}="${name}"]`;
const el = selector;

// TODO: Improve rules setup. Checkout how ESLint does things.
const rules = [
	{
		type: 'Layout',
		selector: `${el('Button')} + ${el('Button')}`,
		title: 'Button: Siblings',
		test: (elements) => {
			return !elements || !elements.length;
		},
		message:
			'Buttons that are next to each other should be wrapped in a Layout component, like Flex, HStack, or VStack.',
	},
];

export function Hint() {
	const [isAnalyzing, setIsAnalyzing] = useState(false);
	const [issues, setIssues] = useState([]);

	const analytize = async () => {
		return new Promise((resolve) => {
			const errs = rules
				.map((rule) => {
					const elements = Array.from(
						document.querySelectorAll(rule.selector),
					);
					const result = rule.test(elements);
					if (!result) {
						return {
							title: `${rule.type} / ${rule.title} (${elements.length})`,
							elements,
							message: rule.message,
						};
					} else {
						return false;
					}
				})
				.filter(Boolean);

			setIssues(errs);
			setTimeout(resolve, 500);
		});
	};

	const onClick = async () => {
		setIsAnalyzing(true);
		await analytize();
		setIsAnalyzing(false);
	};

	const hasIssues = issues && issues.length;

	// TODO: Use Popover instead of custom Card implementation.

	return (
		<>
			<Card
				css={[
					{ zIndex: 999999, position: 'fixed' },
					ui.padding(1),
					ui.position.bottomRight,
					ui.offset({ x: -16, y: -16 }),
				]}
			>
				<Button
					icon={<FiAperture />}
					isLoading={isAnalyzing}
					onClick={onClick}
					variant="primary"
				>
					Hint
				</Button>
			</Card>
			<Card
				css={[
					{
						pointerEvents: hasIssues ? null : 'none',
						maxHeight: '50vh',
						zIndex: 999999,
						position: 'fixed',
					},
					ui.frame.width(300),
					ui.position.bottomRight,
					ui.offset({ x: -16, y: hasIssues ? -60 : 0 }),
					ui.opacity(hasIssues ? 1 : 0),
					ui.animation.default,
				]}
			>
				<CardHeader size="small">
					<Heading size={5}>Issues</Heading>
				</CardHeader>
				<Spacer m={0} py={1}>
					{issues.map((issue, index) => (
						<Animated
							key={index}
							onHoverEnd={() => {
								issue.elements.forEach((el) => {
									el.style.outline = null;
								});
							}}
							onHoverStart={() => {
								issue.elements.forEach((el) => {
									el.style.outline =
										'1px solid rgba(255, 60, 60)';
								});
							}}
						>
							<Panel>
								<PanelHeader
									css={[ui.padding.y(1)]}
									title={issue.title}
								/>
								<PanelBody>
									<Text variant="muted">{issue.message}</Text>
								</PanelBody>
							</Panel>
						</Animated>
					))}
				</Spacer>
			</Card>
		</>
	);
}
