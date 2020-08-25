import { is } from '@wp-g2/utils';

const defaultMockRequestOptions = {
	timeout: 500,
	status: 200,
};

export async function mockRequest(options = defaultMockRequestOptions) {
	const { data, message, status, timeout } = {
		...defaultMockRequestOptions,
		...options,
	};

	return new Promise((resolve, reject) => {
		setTimeout(() => {
			if (status === 200) {
				const response = is.function(data) ? data() : data;
				return resolve(response, { status: 200, message });
			} else {
				return reject({ status, message });
			}
		}, timeout);
	});
}
