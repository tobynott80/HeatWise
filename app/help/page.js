'use client';
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
                A: This tool is specifically designed to address and enhance the
                analysis and understanding of heating trends and decarbonization
                efforts in England and Wales, focusing on data granularity at
                the Lower Layer Super Output Area (LSOA) level.
              </p>
            </li>
            <li className='mb-2 text-black'>
              <span className='text-blue-500 mr-2'>Q:</span> What is the
              methodology behind the data?
              <p className='ml-8 text-gray-600'>
                A: The data is based on the UK Government&apos;s National
                Statistics Postcode Lookup (NSPL) data, which is updated
                annually. The data is then processed and aggregated to the LSOA
                level.
              </p>
            </li>
            {/* Add more FAQs here */}
          </ul>
        </div>
      </div>
    </div>
  );
}
