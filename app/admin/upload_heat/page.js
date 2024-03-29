'use client';
import Cookies from 'js-cookie';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Signout from '@/app/components/icons/Signout';

export default function Home() {
  const router = useRouter();
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!selectedFile) {
      console.log('No file selected');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);

    const response = await fetch('/api/upload/heat', {
      method: 'POST',
      body: formData
    });

    if (response.ok) {
      alert('File uploaded successfully');
      router.replace('/admin/');
    } else {
      alert('Please try again');
    }
  };

  useEffect(() => {
    const token = Cookies.get('token');

    if (!token) {
      router.replace('/admin/login'); // If no token is found, redirect to login page
      return;
    }
  }, [router]);

  const handleSignout = async () => {
    try {
      const res = await fetch('/api/admin/logout', { method: 'GET' });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || 'Signout failed');
      }

      // Handle the UI change or redirection after successful signout
      router.replace('/admin/login'); // Redirect to the login page
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='min-h-screen heropattern-topography-black bg-repeat dark:heropattern-topography-gray-400 dark:bg-black flex items-center justify-center'>
      <div className='rounded lg shadow-md p-8 max-w-xl w-full bg-white'>
        <button
          onClick={handleSignout}
          className='float-right text-gray-800 dark:text-black'
        >
          <Signout />
        </button>
        <h1 className='text-2xl text-black font-semibold mb-6'>
          Heat Demand Change
        </h1>
        <form onSubmit={handleSubmit}>
          <label className='block'>
            <input
              type='file'
              className='block w-full text-sm text-gray-800 file:me-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-gray-600 file:text-white  hover:file:bg-gray-700  file:disabled:opacity-50 file:disabled:pointer-events-none  dark:file:bg-gray-500  dark:hover:file:bg-gray-400  '
              onChange={handleFileChange}
              accept='.csv'
              multiple={true}
            />
          </label>

          <br></br>
          <h3 className='text-sm text-gray-500 font-normal mb-6'>
            CSV must be directly exported from HeatDemand Table.
          </h3>

          <div className='flex justify-center gap-2'>
            {' '}
            <button
              type='submit'
              className='p-2 bg-gray-800 text-white rounded hover:bg-gray-900'
            >
              Upload
            </button>
            <button
              type='submit'
              onClick={() => router.push('/admin')}
              className='p-2 bg-gray-500 text-white rounded hover:bg-gray-900'
            >
              Cancel
            </button>
            <label
              className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
              htmlFor='multiple_files'
            ></label>
          </div>
        </form>
      </div>
    </div>
  );
}
