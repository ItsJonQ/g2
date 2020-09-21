import { PolymorphicComponent } from './_shared';

export declare type ListType = 'unordered' | 'ordered';
export declare type ListProps = {
	/**
	 * Renders bulleted or numbered `ListItem` elements.
	 *
	 * @default 'unordered'
	 */
	type?: ListType;
};

/**
 * `List` is a layout component that renders a collection of listed items.
 *
 * @example
 * ```jsx
 * <List>
 *  <ListItem>Ana</ListItem>
 *  <ListItem>Elsa</ListItem>
 *  <ListItem>Olaf</ListItem>
 *  <ListItem>Sven</ListItem>
 * </List>
 * ```
 */
export declare const List: PolymorphicComponent<ListProps, 'ul'>;

export declare type ListItemProps = {};

/**
 * `ListItem` is a layout component that renders an item within a `List`.
 *
 * @example
 * ```jsx
 * <List>
 *  <ListItem>Ana</ListItem>
 *  <ListItem>Elsa</ListItem>
 *  <ListItem>Olaf</ListItem>
 *  <ListItem>Sven</ListItem>
 * </List>
 * ```
 */
export declare const ListItem: PolymorphicComponent<ListItemProps, 'li'>;
