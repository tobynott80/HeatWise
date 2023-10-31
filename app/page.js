import { Roboto_Flex } from 'next/font/google';

export default function Home() {
  return (
    <>
      <div className='h-screen flex flex-col items-center justify-center'>
        <div className='text-6xl mb-4'>HEATWISE</div>
        <div className='flex w-full'>
          <div class='grow w-1/2 h-48 mx-4 border-4 mb-4'></div>
          <div class='grow w-1/2 h-48 mx-4 border-4 mb-4'></div>
        </div>
      </div>
    </>
  );
}
