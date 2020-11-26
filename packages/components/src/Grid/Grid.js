import { createComponent } from '../utils';
import { useGrid } from './useGrid';

/**
 * `Grid` is a primitive layout component that can arrange content in a grid configuration.
 *
 * @example
 * ```jsx
 * import { Grid } from `@wp-g2/components`
 *
 * function Example() {
 *   return (
 *     <Grid columns={3}>
 *       <View css={[ui.background.blue]}>
 *         <Text>Ana</Text>
 *       </View>
 *       <View css={[ui.background.blue]}>
 *         <Text>Elsa</Text>
 *       </View>
 *       <View css={[ui.background.blue]}>
 *         <Text>Olaf</Text>
 *       </View>
 *     </Grid>
 *   );
 * }
 * ```
 */
const Grid = createComponent({
	as: 'div',
	useHook: useGrid,
	name: 'Grid',
});

export default Grid;
