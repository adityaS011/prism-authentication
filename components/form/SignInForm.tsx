'use client';

import { useState } from 'react';
import * as z from 'zod';
import Link from 'next/link';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import GoogleSignInButton from '../GoogleSignInButton';

const FormSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email'),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(8, 'Password must have at least 8 characters'),
});

const SignInForm = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' })); // Clear error for the current field
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const validation = FormSchema.safeParse(formData);

    if (!validation.success) {
      const fieldErrors = validation.error.formErrors.fieldErrors;
      setErrors({
        email: fieldErrors.email?.[0],
        password: fieldErrors.password?.[0],
      });
      return;
    }

    console.log(formData);
  };

  return (
    <form onSubmit={handleSubmit} className='w-full'>
      <div className='space-y-2'>
        <div>
          <label
            htmlFor='email'
            className='block text-sm font-medium text-gray-700'
          >
            Email
          </label>
          <Input
            id='email'
            name='email'
            type='email'
            placeholder='mail@example.com'
            value={formData.email}
            className='bg-white'
            onChange={handleChange}
          />
          {errors.email && (
            <p className='text-sm text-red-600'>{errors.email}</p>
          )}
        </div>
        <div>
          <label
            htmlFor='password'
            className='block text-sm font-medium text-gray-700'
          >
            Password
          </label>
          <Input
            id='password'
            name='password'
            type='password'
            placeholder='Enter your password'
            value={formData.password}
            className='bg-white'
            onChange={handleChange}
          />
          {errors.password && (
            <p className='text-sm text-red-600'>{errors.password}</p>
          )}
        </div>
      </div>
      <Button
        className='w-full mt-6 bg-blue-600 text-white hover:bg-blue-700'
        type='submit'
      >
        Sign in
      </Button>
      <div className='mx-auto my-4 flex w-full items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400'>
        or
      </div>
      <GoogleSignInButton>Sign in with Google</GoogleSignInButton>
      <p className='text-center text-sm text-gray-600 mt-2'>
        If you don&apos;t have an account, please&nbsp;
        <Link className='text-blue-500 hover:underline' href='/sign-up'>
          Sign up
        </Link>
      </p>
    </form>
  );
};

export default SignInForm;
