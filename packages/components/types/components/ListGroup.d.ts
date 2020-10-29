import { PolymorphicComponent } from './_shared';
import { HStackProps } from './HStack';
import { VStackProps } from './VStack';

export declare type ListGroupsProps = Pick<HStackProps, 'spacing'> & {
	/**
	 * Renders an "inset" style for inner `ListGroup` components.
	 *
	 * @default false
	 */
	inset?: boolean;
};

/**
 * `ListGroups` is a layout component that contains a collection of `ListGroup` components, automatically spacing them apart.
 *
 * @example
 * ```jsx
 * <ListGroups>
 *  <ListGroup>...</ListGroup>
 *  <ListGroup>...</ListGroup>
 *  <ListGroup>...</ListGroup>
 * </ListGroups>
 * ```
 */
export declare const ListGroups: PolymorphicComponent<ListGroupsProps>;

export declare type ListGroupProps = {
	/**
	 * Renders a separator between each child item.
	 */
	separator?: boolean;
	/**
	 * The amount of space between each child element.
	 */
	spacing?: Pick<VStackProps, 'spacing'>;
};

/**
 * `ListGroup` is a layout component that renders a collection of grouped content, such as controls, actions, and links.
 *
 * @example
 * ```jsx
 * <ListGroup>
 *  <FormGroup label="First name"><TextInput /></FormGroup>
 *  <FormGroup label="Last name"><TextInput /></FormGroup>
 *  <Grid columns={2}>
 *    <View>...</View>
 *    <View>...</View>
 *  </Grid>
 * </ListGroup>
 * ```
 */
export declare const ListGroup: PolymorphicComponent<ListGroupProps>;

export declare type ListGroupHeaderProps = HStackProps & {};

/**
 * `ListGroupHeader` is a layout component that renders the header section of a `ListGroup`. Only one `ListGroupHeader` should be used within a `ListGroup`.
 *
 * @example
 * ```jsx
 * <ListGroup>
 *  <ListGroupHeader>Color</ListGroupHeader>
 *  <FormGroup>...</FormGroup>
 *  <FormGroup>...</FormGroup>
 *  <FormGroup>...</FormGroup>
 * </ListGroup>
 * ```
 *
 * `ListGroupHeader` can render actionable components on the right.
 * @example
 * ```jsx
 * <ListGroup>
 *  <ListGroupHeader>
 *    Color
 *    <Button size="small">Edit</Button>
 *  </ListGroupHeader>
 * </ListGroup>
 * ```
 */
export declare const ListGroupHeader: PolymorphicComponent<ListGroupHeaderProps>;

export declare type ListGroupFooterProps = HStackProps & {};

/**
 * `ListGroupFooter` is a layout component that renders the footer section of a `ListGroup`. Only one `ListGroupFooter` should be used within a `ListGroup`.
 *
 * @example
 * ```jsx
 * <ListGroup>
 *  <FormGroup>...</FormGroup>
 *  <FormGroup>...</FormGroup>
 *  <FormGroup>...</FormGroup>
 *  <ListGroupFooter>Color</ListGroupFooter>
 * </ListGroup>
 * ```
 */
export declare const ListGroupFooter: PolymorphicComponent<ListGroupFooterProps>;
