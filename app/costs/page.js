import DwellingBarGraph from '../components/Cost/DwellingBarGraph';
import Map from '../components/Cost/Map';

export default function EnergyCosts() {
  return (
    <div className='p-2 flex flex-row h-full justify-start items-center space-x-2'>
      <div className='flex flex-col w-1/2 h-full'>
        <DwellingBarGraph />
      </div>
      <div className='flex flex-col w-1/2 h-full'>
        <section className='flex flex-row mt-4 rounded-md bg-white dark:bg-gray-800 shrink'></section>
      </div>
    </div>
  );
}

/*
1. Setup db tables + import
2. Draw pie charts
3. List authorities
*/
