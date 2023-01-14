function notFoundError() {
	return {
		name: "NotFoundError",
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
