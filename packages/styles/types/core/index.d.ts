import { config } from '../../src/theme/config';

export type DesignTokens = keyof typeof config;

export declare interface GetInterface {
	/**
	 * Retrives a design token value from the style configuration.
	 * The value will be a generated CSS variable from the Style system, rather than actual value.
	 *
	 * @example
	 * ```
	 * get('colorAdmin');
	 * ```
	 */
	(value: DesignTokens): string;
}

export const get: GetInterface;
