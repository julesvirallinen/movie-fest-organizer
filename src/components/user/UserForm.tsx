'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from 'http-react'
import { AlertCircle, Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Alert, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

import { addUser } from '@/actions/user'
import { postSchema, userSchema } from '@/schemas'

type FormSchema = z.infer<typeof userSchema>

export default function UserForm() {
  const router = useRouter()

  const form = useForm<FormSchema>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      username: ''
    }
  })

  // To learn how to use the `useMutation` hook with server actions
  // visit https://httpr.vercel.app/docs/server_actions#server-mutations

  const { refresh, loading, error } = useMutation(addUser, {
    params: form.getValues(),
    onResolve() {
      router.replace('/movies')
    }
  })
  console.log('error', JSON.stringify(error, null, 2))
  const onSubmit = form.handleSubmit(refresh)

  return (
    <Form {...form}>
      {error && (
        <Alert className='mb-4' variant='destructive'>
          <AlertCircle className='h-4 w-4' />
          <AlertTitle>An error ocurred {error.message}</AlertTitle>
        </Alert>
      )}

      <form onSubmit={onSubmit} className='w-full space-y-6'>
        <FormField
          control={form.control}
          name='username'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder='Username' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className='flex justify-end'>
          <Button disabled={loading} type='submit'>
            {loading && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
            Create User
          </Button>
        </div>
      </form>
    </Form>
  )
}
