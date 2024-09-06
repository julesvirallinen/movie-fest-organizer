import { z } from 'zod'

export const postSchema = z.object({
  title: z.string().min(1, "Title can't be empty"),
  content: z.string().min(1, "Description can't be empty")
})

export const userSchema = z.object({
  username: z.string().min(1, "Username can't be empty")
})
