import { getDisplayName, hoistNonReactStatics, is } from '@wp-g2/utils';
import React from 'react';

import { tags } from './tags';
import { compileInterpolatedStyles } from './utils';

/**
 * @typedef {{
	(component: import('react').ReactElement | string): import('./createCoreElement').CreatePolymorphicComponent<{}, 'div'>;
	a: import('./createCoreElement').CreatePolymorphicComponent<{}, 'a'>;
	abbr: import('./createCoreElement').CreatePolymorphicComponent<{}, 'abbr'>;
	address: import('./createCoreElement').CreatePolymorphicComponent<{}, 'address'>;
	area: import('./createCoreElement').CreatePolymorphicComponent<{}, 'area'>;
	article: import('./createCoreElement').CreatePolymorphicComponent<{}, 'article'>;
	aside: import('./createCoreElement').CreatePolymorphicComponent<{}, 'aside'>;
	audio: import('./createCoreElement').CreatePolymorphicComponent<{}, 'audio'>;
	b: import('./createCoreElement').CreatePolymorphicComponent<{}, 'b'>;
	base: import('./createCoreElement').CreatePolymorphicComponent<{}, 'base'>;
	bdi: import('./createCoreElement').CreatePolymorphicComponent<{}, 'bdi'>;
	bdo: import('./createCoreElement').CreatePolymorphicComponent<{}, 'bdo'>;
	big: import('./createCoreElement').CreatePolymorphicComponent<{}, 'big'>;
	blockquote: import('./createCoreElement').CreatePolymorphicComponent<{}, 'blockquote'>;
	body: import('./createCoreElement').CreatePolymorphicComponent<{}, 'body'>;
	br: import('./createCoreElement').CreatePolymorphicComponent<{}, 'br'>;
	button: import('./createCoreElement').CreatePolymorphicComponent<{}, 'button'>;
	canvas: import('./createCoreElement').CreatePolymorphicComponent<{}, 'canvas'>;
	caption: import('./createCoreElement').CreatePolymorphicComponent<{}, 'caption'>;
	cite: import('./createCoreElement').CreatePolymorphicComponent<{}, 'cite'>;
	code: import('./createCoreElement').CreatePolymorphicComponent<{}, 'code'>;
	col: import('./createCoreElement').CreatePolymorphicComponent<{}, 'col'>;
	colgroup: import('./createCoreElement').CreatePolymorphicComponent<{}, 'colgroup'>;
	data: import('./createCoreElement').CreatePolymorphicComponent<{}, 'data'>;
	datalist: import('./createCoreElement').CreatePolymorphicComponent<{}, 'datalist'>;
	dd: import('./createCoreElement').CreatePolymorphicComponent<{}, 'dd'>;
	del: import('./createCoreElement').CreatePolymorphicComponent<{}, 'del'>;
	details: import('./createCoreElement').CreatePolymorphicComponent<{}, 'details'>;
	dfn: import('./createCoreElement').CreatePolymorphicComponent<{}, 'dfn'>;
	dialog: import('./createCoreElement').CreatePolymorphicComponent<{}, 'dialog'>;
	div: import('./createCoreElement').CreatePolymorphicComponent<{}, 'div'>;
	dl: import('./createCoreElement').CreatePolymorphicComponent<{}, 'dl'>;
	dt: import('./createCoreElement').CreatePolymorphicComponent<{}, 'dt'>;
	em: import('./createCoreElement').CreatePolymorphicComponent<{}, 'em'>;
	embed: import('./createCoreElement').CreatePolymorphicComponent<{}, 'embed'>;
	fieldset: import('./createCoreElement').CreatePolymorphicComponent<{}, 'fieldset'>;
	figcaption: import('./createCoreElement').CreatePolymorphicComponent<{}, 'figcaption'>;
	figure: import('./createCoreElement').CreatePolymorphicComponent<{}, 'figure'>;
	footer: import('./createCoreElement').CreatePolymorphicComponent<{}, 'footer'>;
	form: import('./createCoreElement').CreatePolymorphicComponent<{}, 'form'>;
	h1: import('./createCoreElement').CreatePolymorphicComponent<{}, 'h1'>;
	h2: import('./createCoreElement').CreatePolymorphicComponent<{}, 'h2'>;
	h3: import('./createCoreElement').CreatePolymorphicComponent<{}, 'h3'>;
	h4: import('./createCoreElement').CreatePolymorphicComponent<{}, 'h4'>;
	h5: import('./createCoreElement').CreatePolymorphicComponent<{}, 'h5'>;
	h6: import('./createCoreElement').CreatePolymorphicComponent<{}, 'h6'>;
	head: import('./createCoreElement').CreatePolymorphicComponent<{}, 'head'>;
	header: import('./createCoreElement').CreatePolymorphicComponent<{}, 'header'>;
	hgroup: import('./createCoreElement').CreatePolymorphicComponent<{}, 'hgroup'>;
	hr: import('./createCoreElement').CreatePolymorphicComponent<{}, 'hr'>;
	html: import('./createCoreElement').CreatePolymorphicComponent<{}, 'html'>;
	i: import('./createCoreElement').CreatePolymorphicComponent<{}, 'i'>;
	iframe: import('./createCoreElement').CreatePolymorphicComponent<{}, 'iframe'>;
	img: import('./createCoreElement').CreatePolymorphicComponent<{}, 'img'>;
	input: import('./createCoreElement').CreatePolymorphicComponent<{}, 'input'>;
	ins: import('./createCoreElement').CreatePolymorphicComponent<{}, 'ins'>;
	kbd: import('./createCoreElement').CreatePolymorphicComponent<{}, 'kbd'>;
	keygen: import('./createCoreElement').CreatePolymorphicComponent<{}, 'keygen'>;
	label: import('./createCoreElement').CreatePolymorphicComponent<{}, 'label'>;
	legend: import('./createCoreElement').CreatePolymorphicComponent<{}, 'legend'>;
	li: import('./createCoreElement').CreatePolymorphicComponent<{}, 'li'>;
	link: import('./createCoreElement').CreatePolymorphicComponent<{}, 'link'>;
	main: import('./createCoreElement').CreatePolymorphicComponent<{}, 'main'>;
	map: import('./createCoreElement').CreatePolymorphicComponent<{}, 'map'>;
	mark: import('./createCoreElement').CreatePolymorphicComponent<{}, 'mark'>;
	menu: import('./createCoreElement').CreatePolymorphicComponent<{}, 'menu'>;
	menuitem: import('./createCoreElement').CreatePolymorphicComponent<{}, 'menuitem'>;
	meta: import('./createCoreElement').CreatePolymorphicComponent<{}, 'meta'>;
	meter: import('./createCoreElement').CreatePolymorphicComponent<{}, 'meter'>;
	nav: import('./createCoreElement').CreatePolymorphicComponent<{}, 'nav'>;
	noscript: import('./createCoreElement').CreatePolymorphicComponent<{}, 'noscript'>;
	object: import('./createCoreElement').CreatePolymorphicComponent<{}, 'object'>;
	ol: import('./createCoreElement').CreatePolymorphicComponent<{}, 'ol'>;
	optgroup: import('./createCoreElement').CreatePolymorphicComponent<{}, 'optgroup'>;
	option: import('./createCoreElement').CreatePolymorphicComponent<{}, 'option'>;
	output: import('./createCoreElement').CreatePolymorphicComponent<{}, 'output'>;
	p: import('./createCoreElement').CreatePolymorphicComponent<{}, 'p'>;
	param: import('./createCoreElement').CreatePolymorphicComponent<{}, 'param'>;
	picture: import('./createCoreElement').CreatePolymorphicComponent<{}, 'picture'>;
	pre: import('./createCoreElement').CreatePolymorphicComponent<{}, 'pre'>;
	progress: import('./createCoreElement').CreatePolymorphicComponent<{}, 'progress'>;
	q: import('./createCoreElement').CreatePolymorphicComponent<{}, 'q'>;
	rp: import('./createCoreElement').CreatePolymorphicComponent<{}, 'rp'>;
	rt: import('./createCoreElement').CreatePolymorphicComponent<{}, 'rt'>;
	ruby: import('./createCoreElement').CreatePolymorphicComponent<{}, 'ruby'>;
	s: import('./createCoreElement').CreatePolymorphicComponent<{}, 's'>;
	samp: import('./createCoreElement').CreatePolymorphicComponent<{}, 'samp'>;
	script: import('./createCoreElement').CreatePolymorphicComponent<{}, 'script'>;
	section: import('./createCoreElement').CreatePolymorphicComponent<{}, 'section'>;
	select: import('./createCoreElement').CreatePolymorphicComponent<{}, 'select'>;
	small: import('./createCoreElement').CreatePolymorphicComponent<{}, 'small'>;
	source: import('./createCoreElement').CreatePolymorphicComponent<{}, 'source'>;
	span: import('./createCoreElement').CreatePolymorphicComponent<{}, 'span'>;
	strong: import('./createCoreElement').CreatePolymorphicComponent<{}, 'strong'>;
	style: import('./createCoreElement').CreatePolymorphicComponent<{}, 'style'>;
	sub: import('./createCoreElement').CreatePolymorphicComponent<{}, 'sub'>;
	summary: import('./createCoreElement').CreatePolymorphicComponent<{}, 'summary'>;
	sup: import('./createCoreElement').CreatePolymorphicComponent<{}, 'sup'>;
	table: import('./createCoreElement').CreatePolymorphicComponent<{}, 'table'>;
	tbody: import('./createCoreElement').CreatePolymorphicComponent<{}, 'tbody'>;
	td: import('./createCoreElement').CreatePolymorphicComponent<{}, 'td'>;
	textarea: import('./createCoreElement').CreatePolymorphicComponent<{}, 'textarea'>;
	tfoot: import('./createCoreElement').CreatePolymorphicComponent<{}, 'tfoot'>;
	th: import('./createCoreElement').CreatePolymorphicComponent<{}, 'th'>;
	thead: import('./createCoreElement').CreatePolymorphicComponent<{}, 'thead'>;
	time: import('./createCoreElement').CreatePolymorphicComponent<{}, 'time'>;
	title: import('./createCoreElement').CreatePolymorphicComponent<{}, 'title'>;
	tr: import('./createCoreElement').CreatePolymorphicComponent<{}, 'tr'>;
	track: import('./createCoreElement').CreatePolymorphicComponent<{}, 'track'>;
	u: import('./createCoreElement').CreatePolymorphicComponent<{}, 'u'>;
	ul: import('./createCoreElement').CreatePolymorphicComponent<{}, 'ul'>;
	var: import('./createCoreElement').CreatePolymorphicComponent<{}, 'var'>;
	video: import('./createCoreElement').CreatePolymorphicComponent<{}, 'video'>;
	wbr: import('./createCoreElement').CreatePolymorphicComponent<{}, 'wbr'>;

	// SVG
	circle: import('./createCoreElement').CreatePolymorphicComponent<{}, 'circle'>;
	clipPath: import('./createCoreElement').CreatePolymorphicComponent<{}, 'clipPath'>;
	defs: import('./createCoreElement').CreatePolymorphicComponent<{}, 'defs'>;
	ellipse: import('./createCoreElement').CreatePolymorphicComponent<{}, 'ellipse'>;
	foreignObject: import('./createCoreElement').CreatePolymorphicComponent<{}, 'foreignObject'>;
	g: import('./createCoreElement').CreatePolymorphicComponent<{}, 'g'>;
	image: import('./createCoreElement').CreatePolymorphicComponent<{}, 'image'>;
	line: import('./createCoreElement').CreatePolymorphicComponent<{}, 'line'>;
	linearGradient: import('./createCoreElement').CreatePolymorphicComponent<{}, 'linearGradient'>;
	mask: import('./createCoreElement').CreatePolymorphicComponent<{}, 'mask'>;
	path: import('./createCoreElement').CreatePolymorphicComponent<{}, 'path'>;
	pattern: import('./createCoreElement').CreatePolymorphicComponent<{}, 'pattern'>;
	polygon: import('./createCoreElement').CreatePolymorphicComponent<{}, 'polygon'>;
	polyline: import('./createCoreElement').CreatePolymorphicComponent<{}, 'polyline'>;
	radialGradient: import('./createCoreElement').CreatePolymorphicComponent<{}, 'radialGradient'>;
	rect: import('./createCoreElement').CreatePolymorphicComponent<{}, 'rect'>;
	stop: import('./createCoreElement').CreatePolymorphicComponent<{}, 'stop'>;
	svg: import('./createCoreElement').CreatePolymorphicComponent<{}, 'svg'>;
	text: import('./createCoreElement').CreatePolymorphicComponent<{}, 'text'>;
	tspan: import('./createCoreElement').CreatePolymorphicComponent<{}, 'tspan'>;
	}} CreateStyled
 */

/**
 * @typedef CreateStyledComponentsProps
 * @property {import('../createCompiler').Compiler} compiler The (custom) Emotion instance.
 * @property {import('./createCoreElements').CoreElements} core The collection of coreElements.
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
			const render = (
				{
					/**
					 * Supporting the ability to render a styled component as anything else.
					 */
					__css,
					as: asProp,
					className,
					cx: cxProp, // Deprecated. Use __css instead.
					...props
				},
				ref,
			) => {
				// Combine all of te props together.
				const mergedProps = { ...extraProps, ...props, ref };

				const baseTag = asProp || tagName;

				// Resolves prop interpolation.
				const interpolatedStyles = compileInterpolatedStyles(
					interpolatedProps,
					props,
				);

				const classes = cx(
					css(...interpolatedStyles),
					__css && css(__css),
					cxProp && css(cxProp),
					className,
				);

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

	// @ts-ignore
	return styled;
}
