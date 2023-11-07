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
        router.replace('/'); // Redirect to login if token validation fails
      }
    };

    validateToken();
  }, [router]);

  return (
    <div>
      <h1>Big boy admin page for importing csv files.</h1>
    </div>
  );
}
