const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient();

async function main() {
	const newLink = await prisma.link.create({
		data: {
			description: 'how to suck donkey',
			url: 'www.suckadonkey.com',
		},
	})

	const allLinks = await prisma.link.findMany()
	console.log(allLinks);
}

main()
	.catch(e => {
		throw e
	})
	.finally(async () => {
		await prisma.$disconnect()
	})