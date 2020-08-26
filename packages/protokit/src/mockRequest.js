import { is } from '@wp-g2/utils';

const defaultMockRequestOptions = {
	timeout: 500,
	status: 200,
};

export async function mockRequest(options = defaultMockRequestOptions) {
	const { action, data, message, status, timeout } = {
		...defaultMockRequestOptions,
		...options,
	};

	return new Promise((resolve, reject) => {
		setTimeout(() => {
			if (status === 200) {
				try {
					if (is.function(action)) {
						action();
					}
				} catch (err) {
					reject({ status: 400, message: err });
				}

				const response = is.function(data) ? data() : data;
				return resolve(response, { status: 200, message });
			} else {
				return reject({ status, message });
			}
		}, timeout);
	});
}
