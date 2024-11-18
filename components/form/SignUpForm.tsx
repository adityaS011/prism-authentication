'use client';

import { useState } from 'react';
import * as z from 'zod';
import Link from 'next/link';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import GoogleSignInButton from '../GoogleSignInButton';

const FormSchema = z
  .object({
    username: z.string().min(1, 'Username is required').max(100),
    email: z.string().min(1, 'Email is required').email('Invalid email'),
    password: z
      .string()
      .min(1, 'Password is required')
      .min(8, 'Password must have at least 8 characters'),
    confirmPassword: z.string().min(1, 'Password confirmation is required'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords do not match',
  });

const SignUpForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState<{
    username?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
  }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' })); // Clear error for the current field
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form using Zod
    const validation = FormSchema.safeParse(formData);

    if (!validation.success) {
      const fieldErrors = validation.error.formErrors.fieldErrors;
      setErrors({
        username: fieldErrors.username?.[0],
        email: fieldErrors.email?.[0],
        password: fieldErrors.password?.[0],
        confirmPassword: fieldErrors.confirmPassword?.[0],
      });
      return;
    }

    console.log(formData);
    // Handle successful submission (e.g., API call)
  };

  return (
    <form onSubmit={handleSubmit} className='w-full '>
      <div className='space-y-2 min-w-72'>
        <div>
          <label
            htmlFor='username'
            className='block text-sm font-medium text-gray-700'
          >
            Username
          </label>
          <Input
            id='username'
            name='username'
            placeholder='johndoe'
            value={formData.username}
            className='bg-white'
            onChange={handleChange}
          />
          {errors.username && (
            <p className='text-sm text-red-600'>{errors.username}</p>
          )}
        </div>
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
            placeholder='mail@example.com'
            className='bg-white'
            value={formData.email}
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
            className='bg-white'
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && (
            <p className='text-sm text-red-600'>{errors.password}</p>
          )}
        </div>
        <div>
          <label
            htmlFor='confirmPassword'
            className='block text-sm font-medium text-gray-700'
          >
            Confirm Password
          </label>
          <Input
            id='confirmPassword'
            name='confirmPassword'
            type='password'
            placeholder='Re-enter your password'
            className='bg-white'
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          {errors.confirmPassword && (
            <p className='text-sm text-red-600'>{errors.confirmPassword}</p>
          )}
        </div>
      </div>
      <Button className='w-full mt-6' type='submit'>
        Sign up
      </Button>
      <div className='mx-auto my-4 flex w-full items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400'>
        or
      </div>
      <GoogleSignInButton>Sign up with Google</GoogleSignInButton>
      <p className='text-center text-sm text-gray-600 mt-2'>
        Already have an account?&nbsp;
        <Link className='text-blue-500 hover:underline' href='/sign-in'>
          Sign in
        </Link>
      </p>
    </form>
  );
};

export default SignUpForm;
