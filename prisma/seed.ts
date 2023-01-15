import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
	const haveUser = await prisma.users.findFirst({
		where: { email: "dazai@mail.com" },
	});

	if (haveUser) {
		console.log({ message: "O banco já está populado!" });
		return;
	}

	const inserted = await prisma.users.create({
		data: {
			username: "Dazai",
			email: "dazai@mail.com",
			password: "senha",
			image:
				"https://i.pinimg.com/originals/07/4a/f7/074af7897a6ee02de6b90176e3f70f73.jpg",
			messages: {
				createMany: {
					data: [
						{
							text: "Oie, tudo bem com você?",
						},
						{
							text: "Eu sou um usuário criado para popular o banco, então não sou real :(",
						},
						{
							text: "Brincadeira, sou sim! E ai de você falar o contrário! >:(",
						},
						{
							text: "De qualquer forma, divirta-se!!! :) <3",
						},
					],
				},
			},
		},
		include: {
			messages: true,
		},
	});

	console.log({
		inserted: { user: inserted.username, messages: inserted.messages.length },
	});
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
