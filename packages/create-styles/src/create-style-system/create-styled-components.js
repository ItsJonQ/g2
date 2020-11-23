import { getDisplayName, hoistNonReactStatics, is } from '@wp-g2/utils';
import React from 'react';

import { tags } from './tags';
import { compileInterpolatedStyles } from './utils';

/**
 * @typedef {{
	(component: import('react').ReactElement | string): import('./create-core-element').CreatePolymorphicComponent<{}, 'div'>;
	a: import('./create-core-element').CreatePolymorphicComponent<{}, 'a'>;
	abbr: import('./create-core-element').CreatePolymorphicComponent<{}, 'abbr'>;
	address: import('./create-core-element').CreatePolymorphicComponent<{}, 'address'>;
	area: import('./create-core-element').CreatePolymorphicComponent<{}, 'area'>;
	article: import('./create-core-element').CreatePolymorphicComponent<{}, 'article'>;
	aside: import('./create-core-element').CreatePolymorphicComponent<{}, 'aside'>;
	audio: import('./create-core-element').CreatePolymorphicComponent<{}, 'audio'>;
	b: import('./create-core-element').CreatePolymorphicComponent<{}, 'b'>;
	base: import('./create-core-element').CreatePolymorphicComponent<{}, 'base'>;
	bdi: import('./create-core-element').CreatePolymorphicComponent<{}, 'bdi'>;
	bdo: import('./create-core-element').CreatePolymorphicComponent<{}, 'bdo'>;
	big: import('./create-core-element').CreatePolymorphicComponent<{}, 'big'>;
	blockquote: import('./create-core-element').CreatePolymorphicComponent<{}, 'blockquote'>;
	body: import('./create-core-element').CreatePolymorphicComponent<{}, 'body'>;
	br: import('./create-core-element').CreatePolymorphicComponent<{}, 'br'>;
	button: import('./create-core-element').CreatePolymorphicComponent<{}, 'button'>;
	canvas: import('./create-core-element').CreatePolymorphicComponent<{}, 'canvas'>;
	caption: import('./create-core-element').CreatePolymorphicComponent<{}, 'caption'>;
	cite: import('./create-core-element').CreatePolymorphicComponent<{}, 'cite'>;
	code: import('./create-core-element').CreatePolymorphicComponent<{}, 'code'>;
	col: import('./create-core-element').CreatePolymorphicComponent<{}, 'col'>;
	colgroup: import('./create-core-element').CreatePolymorphicComponent<{}, 'colgroup'>;
	data: import('./create-core-element').CreatePolymorphicComponent<{}, 'data'>;
	datalist: import('./create-core-element').CreatePolymorphicComponent<{}, 'datalist'>;
	dd: import('./create-core-element').CreatePolymorphicComponent<{}, 'dd'>;
	del: import('./create-core-element').CreatePolymorphicComponent<{}, 'del'>;
	details: import('./create-core-element').CreatePolymorphicComponent<{}, 'details'>;
	dfn: import('./create-core-element').CreatePolymorphicComponent<{}, 'dfn'>;
	dialog: import('./create-core-element').CreatePolymorphicComponent<{}, 'dialog'>;
	div: import('./create-core-element').CreatePolymorphicComponent<{}, 'div'>;
	dl: import('./create-core-element').CreatePolymorphicComponent<{}, 'dl'>;
	dt: import('./create-core-element').CreatePolymorphicComponent<{}, 'dt'>;
	em: import('./create-core-element').CreatePolymorphicComponent<{}, 'em'>;
	embed: import('./create-core-element').CreatePolymorphicComponent<{}, 'embed'>;
	fieldset: import('./create-core-element').CreatePolymorphicComponent<{}, 'fieldset'>;
	figcaption: import('./create-core-element').CreatePolymorphicComponent<{}, 'figcaption'>;
	figure: import('./create-core-element').CreatePolymorphicComponent<{}, 'figure'>;
	footer: import('./create-core-element').CreatePolymorphicComponent<{}, 'footer'>;
	form: import('./create-core-element').CreatePolymorphicComponent<{}, 'form'>;
	h1: import('./create-core-element').CreatePolymorphicComponent<{}, 'h1'>;
	h2: import('./create-core-element').CreatePolymorphicComponent<{}, 'h2'>;
	h3: import('./create-core-element').CreatePolymorphicComponent<{}, 'h3'>;
	h4: import('./create-core-element').CreatePolymorphicComponent<{}, 'h4'>;
	h5: import('./create-core-element').CreatePolymorphicComponent<{}, 'h5'>;
	h6: import('./create-core-element').CreatePolymorphicComponent<{}, 'h6'>;
	head: import('./create-core-element').CreatePolymorphicComponent<{}, 'head'>;
	header: import('./create-core-element').CreatePolymorphicComponent<{}, 'header'>;
	hgroup: import('./create-core-element').CreatePolymorphicComponent<{}, 'hgroup'>;
	hr: import('./create-core-element').CreatePolymorphicComponent<{}, 'hr'>;
	html: import('./create-core-element').CreatePolymorphicComponent<{}, 'html'>;
	i: import('./create-core-element').CreatePolymorphicComponent<{}, 'i'>;
	iframe: import('./create-core-element').CreatePolymorphicComponent<{}, 'iframe'>;
	img: import('./create-core-element').CreatePolymorphicComponent<{}, 'img'>;
	input: import('./create-core-element').CreatePolymorphicComponent<{}, 'input'>;
	ins: import('./create-core-element').CreatePolymorphicComponent<{}, 'ins'>;
	kbd: import('./create-core-element').CreatePolymorphicComponent<{}, 'kbd'>;
	keygen: import('./create-core-element').CreatePolymorphicComponent<{}, 'keygen'>;
	label: import('./create-core-element').CreatePolymorphicComponent<{}, 'label'>;
	legend: import('./create-core-element').CreatePolymorphicComponent<{}, 'legend'>;
	li: import('./create-core-element').CreatePolymorphicComponent<{}, 'li'>;
	link: import('./create-core-element').CreatePolymorphicComponent<{}, 'link'>;
	main: import('./create-core-element').CreatePolymorphicComponent<{}, 'main'>;
	map: import('./create-core-element').CreatePolymorphicComponent<{}, 'map'>;
	mark: import('./create-core-element').CreatePolymorphicComponent<{}, 'mark'>;
	menu: import('./create-core-element').CreatePolymorphicComponent<{}, 'menu'>;
	menuitem: import('./create-core-element').CreatePolymorphicComponent<{}, 'menuitem'>;
	meta: import('./create-core-element').CreatePolymorphicComponent<{}, 'meta'>;
	meter: import('./create-core-element').CreatePolymorphicComponent<{}, 'meter'>;
	nav: import('./create-core-element').CreatePolymorphicComponent<{}, 'nav'>;
	noscript: import('./create-core-element').CreatePolymorphicComponent<{}, 'noscript'>;
	object: import('./create-core-element').CreatePolymorphicComponent<{}, 'object'>;
	ol: import('./create-core-element').CreatePolymorphicComponent<{}, 'ol'>;
	optgroup: import('./create-core-element').CreatePolymorphicComponent<{}, 'optgroup'>;
	option: import('./create-core-element').CreatePolymorphicComponent<{}, 'option'>;
	output: import('./create-core-element').CreatePolymorphicComponent<{}, 'output'>;
	p: import('./create-core-element').CreatePolymorphicComponent<{}, 'p'>;
	param: import('./create-core-element').CreatePolymorphicComponent<{}, 'param'>;
	picture: import('./create-core-element').CreatePolymorphicComponent<{}, 'picture'>;
	pre: import('./create-core-element').CreatePolymorphicComponent<{}, 'pre'>;
	progress: import('./create-core-element').CreatePolymorphicComponent<{}, 'progress'>;
	q: import('./create-core-element').CreatePolymorphicComponent<{}, 'q'>;
	rp: import('./create-core-element').CreatePolymorphicComponent<{}, 'rp'>;
	rt: import('./create-core-element').CreatePolymorphicComponent<{}, 'rt'>;
	ruby: import('./create-core-element').CreatePolymorphicComponent<{}, 'ruby'>;
	s: import('./create-core-element').CreatePolymorphicComponent<{}, 's'>;
	samp: import('./create-core-element').CreatePolymorphicComponent<{}, 'samp'>;
	script: import('./create-core-element').CreatePolymorphicComponent<{}, 'script'>;
	section: import('./create-core-element').CreatePolymorphicComponent<{}, 'section'>;
	select: import('./create-core-element').CreatePolymorphicComponent<{}, 'select'>;
	small: import('./create-core-element').CreatePolymorphicComponent<{}, 'small'>;
	source: import('./create-core-element').CreatePolymorphicComponent<{}, 'source'>;
	span: import('./create-core-element').CreatePolymorphicComponent<{}, 'span'>;
	strong: import('./create-core-element').CreatePolymorphicComponent<{}, 'strong'>;
	style: import('./create-core-element').CreatePolymorphicComponent<{}, 'style'>;
	sub: import('./create-core-element').CreatePolymorphicComponent<{}, 'sub'>;
	summary: import('./create-core-element').CreatePolymorphicComponent<{}, 'summary'>;
	sup: import('./create-core-element').CreatePolymorphicComponent<{}, 'sup'>;
	table: import('./create-core-element').CreatePolymorphicComponent<{}, 'table'>;
	tbody: import('./create-core-element').CreatePolymorphicComponent<{}, 'tbody'>;
	td: import('./create-core-element').CreatePolymorphicComponent<{}, 'td'>;
	textarea: import('./create-core-element').CreatePolymorphicComponent<{}, 'textarea'>;
	tfoot: import('./create-core-element').CreatePolymorphicComponent<{}, 'tfoot'>;
	th: import('./create-core-element').CreatePolymorphicComponent<{}, 'th'>;
	thead: import('./create-core-element').CreatePolymorphicComponent<{}, 'thead'>;
	time: import('./create-core-element').CreatePolymorphicComponent<{}, 'time'>;
	title: import('./create-core-element').CreatePolymorphicComponent<{}, 'title'>;
	tr: import('./create-core-element').CreatePolymorphicComponent<{}, 'tr'>;
	track: import('./create-core-element').CreatePolymorphicComponent<{}, 'track'>;
	u: import('./create-core-element').CreatePolymorphicComponent<{}, 'u'>;
	ul: import('./create-core-element').CreatePolymorphicComponent<{}, 'ul'>;
	var: import('./create-core-element').CreatePolymorphicComponent<{}, 'var'>;
	video: import('./create-core-element').CreatePolymorphicComponent<{}, 'video'>;
	wbr: import('./create-core-element').CreatePolymorphicComponent<{}, 'wbr'>;

	// SVG
	circle: import('./create-core-element').CreatePolymorphicComponent<{}, 'circle'>;
	clipPath: import('./create-core-element').CreatePolymorphicComponent<{}, 'clipPath'>;
	defs: import('./create-core-element').CreatePolymorphicComponent<{}, 'defs'>;
	ellipse: import('./create-core-element').CreatePolymorphicComponent<{}, 'ellipse'>;
	foreignObject: import('./create-core-element').CreatePolymorphicComponent<{}, 'foreignObject'>;
	g: import('./create-core-element').CreatePolymorphicComponent<{}, 'g'>;
	image: import('./create-core-element').CreatePolymorphicComponent<{}, 'image'>;
	line: import('./create-core-element').CreatePolymorphicComponent<{}, 'line'>;
	linearGradient: import('./create-core-element').CreatePolymorphicComponent<{}, 'linearGradient'>;
	mask: import('./create-core-element').CreatePolymorphicComponent<{}, 'mask'>;
	path: import('./create-core-element').CreatePolymorphicComponent<{}, 'path'>;
	pattern: import('./create-core-element').CreatePolymorphicComponent<{}, 'pattern'>;
	polygon: import('./create-core-element').CreatePolymorphicComponent<{}, 'polygon'>;
	polyline: import('./create-core-element').CreatePolymorphicComponent<{}, 'polyline'>;
	radialGradient: import('./create-core-element').CreatePolymorphicComponent<{}, 'radialGradient'>;
	rect: import('./create-core-element').CreatePolymorphicComponent<{}, 'rect'>;
	stop: import('./create-core-element').CreatePolymorphicComponent<{}, 'stop'>;
	svg: import('./create-core-element').CreatePolymorphicComponent<{}, 'svg'>;
	text: import('./create-core-element').CreatePolymorphicComponent<{}, 'text'>;
	tspan: import('./create-core-element').CreatePolymorphicComponent<{}, 'tspan'>;
	}} CreateStyled
 */

/**
 * @typedef CreateStyledComponentsProps
 * @property {import('../create-compiler').Compiler} compiler The (custom) Emotion instance.
 * @property {import('./create-core-elements').CoreElements} core The collection of coreElements.
 */

/**
 * Creates a set of styled components for the Style system.
 * These styled components are similarly to Emotion's or Styled-Components styled.div``.
 *
 * A big difference is that the Style system's styled components do NOT require
 * context connection at all. This is HUGE for performance as there are far less
 * React.Component nodes within the render tree.
 *
 * This is thanks to how the Style system compiles and coordinates style values.
 *
 * @param {CreateStyledComponentsProps} props Props to create styled components with.
 * @returns {CreateStyled} A set of styled components.
 */
export function createStyledComponents({ compiler, core }) {
	const { css, cx } = compiler;

	/**
	 * That's all a <Box /> is :). A core.div.
	 */
	const Box = core.div;

	function createStyled(tagName, options = {}) {
		const {
			/**
			 * A way to pass in extraProps when created a styled component.
			 */
			props: extraProps,
		} = options;

		return (...interpolatedProps) => {
			const render = ({ as: asProp, className, ...props }, ref) => {
				// Combine all of te props together.
				const mergedProps = { ...extraProps, ...props, ref };

				const baseTag = asProp || tagName;

				// Resolves prop interpolation.
				const interpolatedStyles = compileInterpolatedStyles(
					interpolatedProps,
					props,
				);

				const classes = cx(css(...interpolatedStyles), className);

				return (
					<Box as={baseTag} {...mergedProps} className={classes} />
				);
			};

			/** @type {React.ForwardRefExoticComponent<Pick<any, string | number | symbol> & React.RefAttributes<any>> & { withComponent?: ReturnType<createStyled> }} */
			const StyledComponent = React.forwardRef(render);

			/*
			 * Enhancing the displayName.
			 */
			StyledComponent.displayName = is.string(tagName)
				? `Styled(${getDisplayName(tagName)})`
				: is.defined(tagName?.displayName)
				? tagName.displayName
				: `Styled(${getDisplayName(tagName)})`;

			/*
			 * Enhancing .withComponent()
			 * https://github.com/emotion-js/emotion/blob/master/packages/styled-base/src/index.js#L210
			 *
			 * This step is essential as we want styled components generated with
			 * .withComponent to have the correct baseStyles.
			 */
			StyledComponent.withComponent = (nextTag, nextOptions) => {
				return createStyled(
					nextTag,
					nextOptions !== undefined
						? { ...(options || {}), ...nextOptions }
						: options,
				)(...interpolatedProps);
			};

			if (!is.string(tagName)) {
				/*
				 * Hoisting statics one last time, if the tagName is a Component,
				 * rather than an HTML tag, like `div`.
				 */
				return hoistNonReactStatics(StyledComponent, tagName);
			} else {
				return StyledComponent;
			}
		};
	}

	// Bind it to avoid mutating the original function. Just like @emotion/styled:
	// https://github.com/emotion-js/emotion/blob/master/packages/styled/src/index.js
	const styled = createStyled.bind(undefined);

	// Generating the core collection of styled[tagName], with our enhanced
	// version of styled.
	tags.forEach((tagName) => {
		styled[tagName] = createStyled(tagName);
	});

	// @ts-ignore We cannot convince TypeScript that we've taken care of everything here, we're doing too many JavaScript magics for this to work without an ignore
	return styled;
}
