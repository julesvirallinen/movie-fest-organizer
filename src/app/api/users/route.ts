import { prisma } from '../../../lib/prisma'
export const GET = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: { username: true } // only select the username field
    })
    console.log('users', users)
    res.status(200).json(users)
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch users' })
  }
}
