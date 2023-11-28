'use client';
import Cookies from 'js-cookie';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get('token');

    if (!token) {
      router.replace('/'); // If no token is found, redirect to login page
      return;
    }
  }, [router]);

  return (
    <div className='min-h-screen heropattern-topography-black bg-repeat dark:heropattern-topography-gray-400 dark:bg-black flex items-center justify-center'>
      <div className='rounded lg shadow-md p-8 max-w-xl w-full bg-white'>
        <h1 className='text-2xl text-black font-semibold mb-6'>
          Energy Efficiency Costs
        </h1>
        <form>
          <label class='block'>
            <input
              type='file'
              class='block w-full text-sm text-gray-500 file:me-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-gray-600 file:text-white  hover:file:bg-gray-700  file:disabled:opacity-50 file:disabled:pointer-events-none  dark:file:bg-gray-500  dark:hover:file:bg-gray-400  '
              accept='.csv'
            />
          </label>

          <br></br>

          <div className='flex justify-center gap-2'>
            {' '}
            {/* Flex container with gap */}
            <button
              type='submit'
              className='p-2 bg-gray-600 text-white rounded hover:bg-gray-900'
            >
              Upload
            </button>
            <button
              type='submit'
              className='p-2 bg-gray-400 text-white rounded hover:bg-gray-900'
            >
              Cancel
            </button>
            <label
              class='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
              for='multiple_files'
            ></label>
          </div>
        </form>
      </div>
    </div>
  );
}
