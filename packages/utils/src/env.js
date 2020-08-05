export function getIsDevelopmentEnv() {
	return process && process?.env?.NODE_ENV === 'development';
}

export function getIsTestEnv() {
	return process && process?.env?.NODE_ENV === 'test';
}

export function getIsProductionEnv() {
	return process && process?.env?.NODE_ENV === 'production';
}

export const IS_DEV_ENV = getIsDevelopmentEnv();
export const IS_TEST_ENV = getIsTestEnv();
export const IS_PROD_ENV = getIsProductionEnv();
