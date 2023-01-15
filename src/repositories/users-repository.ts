import { prisma } from "../database/prisma";

function find() {
	return prisma.users.findMany({
		select: {
			id: true,
			username: true,
			image: true,
		},
	});
}

export { find };
