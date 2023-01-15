import * as usersRepository from "../repositories/users-repository";

async function getAll() {
	const users = await usersRepository.find();
	return users;
}

export { getAll };
