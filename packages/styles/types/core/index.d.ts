import { config } from '../../src/theme/config';

type DesignTokens = keyof typeof config;

/** Retrives a design token value from the style configuration. */
export const get: (value: DesignTokens) => string;
