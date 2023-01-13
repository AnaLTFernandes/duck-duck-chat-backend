import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
	const user = await prisma.users.create({
		data: {
			username: "Dazai",
			email: "dazai@mail.com",
			password: "senha",
			image:
				"https://i.pinimg.com/originals/07/4a/f7/074af7897a6ee02de6b90176e3f70f73.jpg",
		},
	});

	console.log({ user });
}

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
