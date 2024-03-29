'use client';
import Cookies from 'js-cookie';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Signout from '@/app/components/icons/Signout';

export default function Home() {
  const router = useRouter();

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission
    const dataset = event.target.Dataset.value; // Get the selected value

    switch (dataset) {
      case 'HE':
        router.push('/admin/upload_heat');
        break;
      case 'EN':
        router.push('/admin/upload_energy');
        break;
      default:
        alert('Please select a dataset');
        break;
    }
  };

  useEffect(() => {
    const token = Cookies.get('token');

    if (!token) {
      router.replace('/admin/login'); // If no token is found, redirect to login page
      return;
    }

    // Validate the token by making an API call
    const validateToken = async () => {
      try {
        const res = await fetch('api/admin', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (!res.ok) throw new Error('Token validation failed');
      } catch (error) {
        console.error(error);
        console.log('Token validation failed');
      }
    };

    validateToken();
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

        <form onSubmit={handleSubmit}>
          <h1 className='text-2xl text-black font-semibold mb-6'>
            Choose Dataset
            <label
              for='Dataset'
              class='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
            >
              Select an option
            </label>
            <select
              id='Dataset'
              class='font-sans bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
            >
              <option selected>Choose a Dataset</option>
              <option value='HE'>Annual Heat Demand</option>
              <option value='EN'>Energy Efficiency Improvement Costs</option>
            </select>
          </h1>
          <button
            type='submit'
            className='w-full p-2 bg-gray-600 text-white rounded hover:bg-gray-900'
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  );
}
