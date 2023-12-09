'use client';
import { useEffect, useState } from 'react';
import EnergyBarGraph from '../components/Cost/EnergyBarGraph';
import FilterList from '../components/Cost/FilterList';
import Map from '../components/Cost/Map';

export default function EnergyCosts() {
  const [filter, setFilter] = useState([]);

  useEffect(() => {}, [filter]);

  return (
    <div className='p-2 flex flex-col lg:flex-row h-full justify-start items-center space-x-2 w-full'>
      <div className='flex flex-col lg:w-1/2 h-full'>
        <Map />
      </div>
      <div className='flex flex-col lg:flex-row lg:w-1/2 h-full space-x-2'>
        <div className='flex flex-col lg:w-2/3 space-y-2'>
          <EnergyBarGraph
            graph={'dwelling'}
            filters={filter}
          />
          <EnergyBarGraph
            graph={'boiler'}
            filters={filter}
          />
        </div>
        <div className='lg:w-1/3'>
          <FilterList setFilter={setFilter} />
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
