import DwellingBarGraph from '../components/Cost/DwellingBarGraph';
import FilterList from '../components/Cost/FilterList';
import Map from '../components/Cost/Map';

export default function EnergyCosts() {
  return (
    <div className='p-2 flex flex-col lg:flex-row h-full justify-start items-center space-x-2 w-full'>
      <div className='flex flex-col lg:w-1/2 h-full'>
        <Map />
      </div>
      <div className='flex flex-col lg:flex-row lg:w-1/2 h-full space-x-2'>
        <div className='flex flex-col lg:w-2/3 space-y-2'>
          <DwellingBarGraph graph={'dwelling'} />
          <DwellingBarGraph graph={'boiler'} />
        </div>
        <div className='lg:w-1/3'>
          <FilterList />
        </div>
      </div>
    </div>
  );
}

/*
1. Setup db tables + import
2. Draw pie charts
3. List authorities
*/
