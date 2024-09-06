import { prisma } from '../../lib/prisma' // adjust the path based on your project structure

export default async function handler(req, res) {
  try {
    const users = await prisma.user.findMany({
      select: { username: true } // only select the username field
    })
    res.status(200).json(users)
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch users' })
  }
}
