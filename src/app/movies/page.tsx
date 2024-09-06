import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { headers } from 'next/headers'

import { Button } from '@/components/ui/button'
import PostCard from '@/components/post/PostCard'

import { prisma } from '@/lib/prisma'
import { RenderList } from 'react-kuh'
import path from 'path'
import fs from 'fs'
import MovieCard from '../../components/movie/MovieCard'
import { groupBy } from 'ramda'
/**
 *   {
    title: 'R&A x Helsingin Kirjamessut: Leffa ja kirja',
    venue: 'Kino Regina',
    time: '2024-09-22 12:30:00',
    day: '2024-09-22',
    url: 'https://hiff.fi/ohjelma/ra-x-helsingin-kirjamessut-leffa-ja-kirja/',
    image: 'https://hiff.fi/wp-content/uploads/airtable/9d473c1882b30fcd067893df03c6ba92-large.png',
    duration: '60                                            min',
    start_time: '12.30',
    end_time: '13.30'
  },
 */

export type Movie = {
  title: string
  venue: string
  time: string
  day: string
  url: string
  image: string
  duration: string
  start_time: string
  end_time: string
}

export const revalidate = 0

export default async function Posts() {
  headers()
  // load schedule from /data/schedule.json
  const filePath = path.join(process.cwd(), 'public', 'events_data.json')
  const jsonData = fs.readFileSync(filePath, 'utf-8')
  const schedule: Movie[] = JSON.parse(jsonData)
  const moviesGroupedByTitle = groupBy((movie: Movie) => movie.title, schedule)
  const movieTitles = Object.keys(moviesGroupedByTitle)

  return (
    <>
      {movieTitles.map(title => (
        <MovieCard movie={moviesGroupedByTitle[title][0]} key={title} />
      ))}
    </>
  )
}
