'use server'
import { revalidatePath } from 'next/cache'
import { actionData } from 'http-react'

import { prisma } from '@/lib/prisma'
import { userSchema } from '@/schemas'

export async function addUser(user: any) {
  try {
    const validation = userSchema.safeParse(user)

    if (validation.success) {
      const newUser = await prisma.user.create({
        data: user
      })
      console.log('newUser', newUser)
      // revalidatePath('/posts')

      return actionData(newUser)
    }

    return actionData(validation.error.format(), {
      status: 400
    })
  } catch {
    return {
      status: 500
    }
  }
}

export async function deletePost(id: string) {
  try {
    const deletedPost = await prisma.post.delete({
      where: {
        id: id
      }
    })

    revalidatePath('/posts')

    /**
     * actionResult formats a response so http-react can read data, status code and error
     * The code below will be formated as { data: deletedPost, status: 200 }.
     * You can ommit the status part like this `return actionResult(deletedPost)`
     */
    return actionData(deletedPost, {
      status: 200
    })
  } catch {
    return {
      status: 500
    }
  }
}
