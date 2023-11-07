'use client';
import { useState } from 'react';

export default function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    //fetch api route with username and password
    //if successful, redirect to admin page
    //else, display error message
    const res = await fetch('/api/admin', {
      method: 'POST',
      body: JSON.stringify({ username, password })
    });
    const data = await res.json();
    if (data.message === 'Login successful') {
      window.location.href = '/admin';
    } else {
      alert('Login failed');
    }
  };

  return (
    <div className='min-h-screen heropattern-topography-black bg-repeat dark:heropattern-topography-gray-400 dark:bg-black flex items-center justify-center'>
      <div className='rounded lg shadow-md p-8 max-w-xl w-full bg-white'>
        <h1 className='text-2xl text-black font-semibold mb-6'>Admin Login</h1>
        <form>
          <div className='mb-4'>
            <label
              htmlFor='username'
              className='block font-medium mb-2 text-black'
            >
              Username
            </label>
            <input
              type='text'
              id='username'
              className='w-full p-2 border rounded text-black'
              placeholder='Enter your username'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className='mb-4 text-black'>
            <label
              htmlFor='password'
              className='block font-medium mb-2'
            >
              Password
            </label>
            <input
              type='password'
              id='password'
              className='w-full p-2 border rounded text-black'
              placeholder='Enter your password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className='mb-4'>
            <button
              type='button'
              onClick={handleLogin}
              className='w-full p-2 bg-gray-600 text-white rounded hover:bg-gray-900'
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
