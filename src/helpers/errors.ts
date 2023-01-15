function notFoundError() {
	return {
		name: "NotFound",
	};
}

function badRequestError() {
	return {
		name: "BadRequest",
	};
}

function unauthorizedError() {
	return {
		name: "Unauthorized",
	};
}

function conflictError() {
	return {
		name: "Conflict",
	};
}

export { notFoundError, badRequestError, unauthorizedError, conflictError };
