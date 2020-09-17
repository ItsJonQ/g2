import { config } from '../../src/theme/config';

type DesignTokens = keyof typeof config;
type CSSVariable = string;

/** Retrives a design token value from the style configuration. */
export declare interface GetInterface {
	/** Retrives a design token value from the style configuration. */
	(value: DesignTokens): CSSVariable;
}
