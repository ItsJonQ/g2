import { Emotion } from 'create-emotion';

export const flush: Emotion['flush'];
export const hydrate: Emotion['hydrate'];
/**
 * Combines classNames as well as CSS style rules created with the `css` function.
 *
 * @example
 * ```jsx
 * import { css, cx } from `@wp-g2/styles`
 *
 * const Component = ({className, isWhite, ...props}) => {
 *  const bg = css`
 *    background: blue;
 *  `
 *  const text = css`
 *    color: white;
 *  `
 *  const classes = cx(
 *    bg, // Renders the bg CSS styles
 *    isWhite && text, // Conditionally renders the text CSS styles
 *    className // Renders an incoming className prop
 *  )
 *
 *  return <div className={classes} {...props} />
 * }
 * ```
 */
export const cx: Emotion['cx'];
export const merge: Emotion['merge'];
export const getRegisteredStyles: Emotion['getRegisteredStyles'];
/**
 * Creates a set of CSS style rules, resulting in unique className.
 * This className can then be added to a React component via the className prop.
 *
 * @example
 * ```jsx
 * import { css } from `@wp-g2/styles`
 *
 * const Component = (props) => {
 *  const classes = css`
 *    background: blue;
 *    color: white;
 *  `
 *  return <div className={classes} {...props} />
 * }
 * ```
 *
 * The css function accepts (interpolated) strings or functions. These strings and functions
 * can also be passed as an array if multiple CSS style rules are needed.
 *
 * @example
 * ```jsx
 * import { css } from `@wp-g2/styles`
 *
 * const Component = (props) => {
 *  const classes = css([
 *    `
 *      background: blue;
 *      color: white;
 *    `,
 *    {
 *      padding: 20
 *    }
 *  ]
 *  return <div className={classes} {...props} />
 * }
 * ```
 */
export const css: Emotion['css'];
export const injectGlobal: Emotion['injectGlobal'];
export const keyframes: Emotion['keyframes'];
export const sheet: Emotion['sheet'];
export const cache: Emotion['cache'];
