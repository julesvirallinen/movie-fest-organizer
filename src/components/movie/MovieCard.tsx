'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { formatDate } from '@/lib/utils'
import { Movie } from '../../app/movies/page'
import useFetch, { useMutation, useGET, useAction } from 'http-react'
import { addMovieToList } from '../../actions/movieInterest'
import { useForm } from 'react-hook-form'

interface Props {
  movie: Movie
}

export default function MovieCard({ movie }: Props) {
  const [userId, setUserId] = useState<string | null>(null)

  // Get userId from localStorage on the client side
  useEffect(() => {
    const storedUserId = localStorage.getItem('selectedUser')
    setUserId(storedUserId)
  }, [])

  // Initialize form with default values
  const form = useForm({
    defaultValues: {
      movie: movie.url,
      userId: userId // Will update once localStorage is available
    }
  })

  // Mutation to handle movie addition
  const { refresh, loading, error, data, submit } = useMutation(
    addMovieToList,
    {
      params: form.getValues()
    }
  )

  // Handle form submission
  const onSubmit = async (data: any) => {
    // Update userId value from localStorage
    const currentUserId = localStorage.getItem('selectedUser')
    if (currentUserId) {
      data.userId = currentUserId
    }

    try {
      await submit(data)
    } catch (err) {
      console.error('Error submitting form:', err)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{movie.title}</CardTitle>
        <CardDescription>{formatDate(new Date(movie.day))}</CardDescription>
      </CardHeader>
      <CardContent>
        <article className='text-sm prose prose-stone dark:prose-invert'>
          <ReactMarkdown>{movie.title}</ReactMarkdown>
          {userId && (
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <button type='submit' disabled={loading}>
                {loading ? 'Adding...' : 'Add to my list'}
              </button>
            </form>
          )}
        </article>
      </CardContent>
      <CardFooter className='flex justify-end'></CardFooter>
    </Card>
  )
}
