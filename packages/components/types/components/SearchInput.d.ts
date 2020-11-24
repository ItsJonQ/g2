import { PolymorphicComponent } from './_shared';
import { TextInputProps } from './TextInput';

export declare type SearchInputProps = TextInputProps & {
	/**
	 * Renders loading, disabling `SearchInput` and renders a `Spinner`.
	 *
	 * @default false
	 */
	isLoading?: boolean;
	/**
	 * Callback when `SearchInput` is cleared.
	 */
	onClear?: (...args: any) => void;
	/**
	 * Placeholder text to display when `SearchInput` is empty.
	 *
	 * @default 'Search...'
	 */
	placeholder?: string;
};

/**
 * `SearchInput` is a form component that lets users search for content.
 *
 * @example
 * ```jsx
 * <SearchInput placeholder="Search for..." />
 * ```
 */
export declare const SearchInput: PolymorphicComponent<
	'input',
	SearchInputProps
>;
