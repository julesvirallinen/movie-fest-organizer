'use server'
import { revalidatePath } from 'next/cache'
import { actionData } from 'http-react'

import { prisma } from '@/lib/prisma'
import { postSchema } from '@/schemas'
import { intersection } from 'zod'

export async function addMovieToList(interest: any) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        username: interest.userId
      }
    })
    if (!user) {
      return actionData('User not found', {
        status: 404
      })
    }

    const existingInterest = await prisma.movieInterest.findFirst({
      where: {
        movie: interest.movie,
        userId: user.id
      }
    })

    if (existingInterest) {
      return actionData(existingInterest)
    }

    const newInterest = await prisma.movieInterest.create({
      data: {
        movie: interest.movie,
        possibleTimes: [],
        userId: user.id
      }
    })
    console.log('newPost', newInterest)

    return actionData(newInterest)
  } catch (e) {
    throw e
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
