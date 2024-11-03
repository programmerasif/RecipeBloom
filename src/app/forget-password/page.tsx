  'use client'

  import { useState } from 'react'
  import { useForm } from 'react-hook-form'
  import { Button } from "@/components/ui/button"
  import { Input } from "@/components/ui/input"
  import { Label } from "@/components/ui/label"
  import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
  import { AlertCircle, CheckCircle2 } from 'lucide-react'
  import { useForgetPasswordMutation } from '@/redux/api/features/auth/authApi'

  type FormData = {
    email: string
  }

  export default function Component() {
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>()
    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
    const [emailStatus, setEmailStatus] = useState(false)

    const [forgerPass] = useForgetPasswordMutation()

    const onSubmit = async (data: FormData) => {
      try {
        // Simulating an API call
        // console.log('Form submitted:', data)
        const res = await forgerPass(data?.email)
        
        console.log(res?.data?.success);
        
       if (res?.data?.success) {
        setEmailStatus(true);
        
       }
        
      
        setStatus('success')
      } catch (error) {
        console.error('Error submitting form:', error)
        setStatus('error')
      }
    }

    return (
      <div className='flex justify-center items-center h-[100vh]'>
        <Card className=" w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle>To forget your password</CardTitle>
          <CardDescription>Enter your email to forget your password.</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                {...register('email', { 
                  required: 'Email is required',
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: 'Invalid email address',
                  },
                })}
              />
              {errors.email && (
                <p className="text-sm text-red-500 flex items-center mt-1">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.email.message}
                </p>
              )}
            </div>
          </CardContent>
          <CardFooter className="flex flex-col items-stretch">
            <Button type="submit" className="w-full bg-[#b1cee0] text-black hover:text-white" >
             Forget Password
            </Button>
            
            {status === 'error' && (
              <p className="text-sm text-red-500 flex items-center justify-center mt-2">
                <AlertCircle className="w-4 h-4 mr-1" />
                An error occurred. Please try again.
              </p>
            )}
            {emailStatus && (
            <p className="text-sm text-green-500 flex items-center justify-center mt-2">
              <CheckCircle2 className="w-4 h-4 mr-1" />
              A link sent your email to forget password
            </p>
          )}
          </CardFooter>
        </form>
      </Card>
      
      </div>
    
    )
  }