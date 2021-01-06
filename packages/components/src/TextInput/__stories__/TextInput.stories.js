import React from 'react';
import NumberFormat from 'react-number-format';

import { Container } from '../../Container';
import { Text, VStack } from '../../index';
import { TextInput } from '../index';

export default {
	component: TextInput,
	title: 'Components/TextInput',
};

export const _default = () => {
	return <TextInput placeholder="Into The Unknown" />;
};

export const number = () => {
	return (
		<Container
			css={`
				margin-top: 20vh;
			`}
			width={480}
		>
			<TextInput type="number" />
		</Container>
	);
};

export const numberWithExternalChange = () => {
	const [value, setValue] = React.useState();
	return (
		<div>
			<div>Value: {value}</div>
			<button onClick={() => setValue(10)}>Make ten</button>
			<TextInput onChange={setValue} type="number" value={value} />
		</div>
	);
};

export const numberStepper = () => {
	return (
		<Container
			css={`
				margin-top: 20vh;
			`}
			width={480}
		>
			<TextInput arrows="stepper" type="number" value="1" />
		</Container>
	);
};

export const multiline = () => {
	return <TextInput maxRows={6} minRows={3} multiline />;
};

export const custom = () => {
	return (
		<VStack>
			<Text>
				Rendered using <code>react-number-format</code>
			</Text>
			<TextInput
				as={NumberFormat}
				prefix={'$'}
				thousandSeparator={true}
			/>
		</VStack>
	);
};

export const inlineRendering = () => {
	return (
		<VStack
			css={`
				margin: auto;
				width: 320px;
			`}
		>
			<Text adjustLineHeightForInnerControls>
				My site name is <TextInput isInline />
			</Text>
		</VStack>
	);
};

const MadLib = ({ type }) => <TextInput isInline placeholder={type} />;
const Adjective = () => <MadLib type="Adjective" />;
const Noun = () => <MadLib type="Noun" />;
const PluralNoun = () => <MadLib isInline type="Plural noun" />;
const Gerund = () => <MadLib isInline type="Gerund" />;

/**
 * Adapted from https://www.madlibs.com/printables/
 */
export const madLibs = () => (
	<VStack
		css={`
			margin: auto;
			text-align: justify;
		`}
	>
		<Text adjustLineHeightForInnerControls>
			A vacation is when you take a trip to some <Adjective /> place with
			your <Adjective /> family. Usually you go to some place that is near
			a/an <Noun /> or up on a/an <Noun />. A good vacation place is one
			where you can ride <PluralNoun /> or play <MadLib type="Game" /> or
			go birding for <MadLib type="Bird species" />. I like to spend my
			time <Gerund /> or <Gerund />. When parents go on a vacation, they
			spend their time eating three <PluralNoun /> a day. Last summer, my
			little sibling fell in a/an <Noun /> and got poison{' '}
			<MadLib type="Plant" /> all over their{' '}
			<MadLib type="Part of the body" />. My family is going to go to
			(the) <MadLib type="Place" />, and I will practice <Gerund />.
			Parents need vacations more than kids because parents are always
			very <Adjective /> and because they have to work{' '}
			<MadLib type="Number" /> hours every day all year making enough{' '}
			<PluralNoun /> to pay for the vacation.
		</Text>
	</VStack>
);
