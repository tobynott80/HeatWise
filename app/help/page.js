"use client";
export default function Home() {
  return (
    <div className='min-h-screen heropattern-topography-black bg-repeat dark:heropattern-topography-gray-400 dark:bg-black flex items-center justify-center'>
      <div className='bg-white dark:bg-gray-200 rounded-lg shadow-md p-8 max-w-xl w-full'>
        <h1 className='text-2xl font-semibold mb-4 text-black'>Help Center</h1>
        <p className='text-gray-600 mb-6'>
          Welcome to our Help Center. If you have any questions or need
          assistance, please don&apos;t hesitate to contact us.
        </p>

        <div className='mb-4'>
          <h2 className='text-lg font-semibold mb-2 text-black'>
            Frequently Asked Questions
          </h2>
          <ul>
            <li className='mb-2 text-black'>
              <span className='text-blue-500 mr-2'>Q:</span> What is the purpose
              of this service?
              <p className='ml-8 text-gray-600'>
                A: Our service is designed to...
              </p>
            </li>
            <li className='mb-2 text-black'>
              <span className='text-blue-500 mr-2'>Q:</span> How can I get
              started?
              <p className='ml-8 text-gray-600'>A: To get started, simply...</p>
            </li>
            {/* Add more FAQs here */}
          </ul>
        </div>

        <div>
          <h2 className='text-lg font-semibold mb-2 text-black'>Contact Us</h2>
          <p className='text-gray-600'>
            If you couldn&apos;t find the answer to your question in our FAQ section,
            feel free to contact us via email at{' '}
            <a
              href='mailto:support@example.com'
              className='text-blue-500'
            >
              support@example.com
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}