'use client';
import { useEffect, useState } from 'react';
import * as d3 from 'd3';
import Search from '../icons/Search';

export default function FilterList() {
  const [list, setList] = useState([
    {
      lad19nm: 'Select All',
      lad19cd: 'all'
    }
  ]);

  useEffect(() => {
    function loadData() {
      d3.json(`/api/data/energyCost/search`).then((data) => {
        data.unshift({
          lad19nm: 'Select All',
          lad19cd: 'all'
        });
        setList(data);
      });
    }

    loadData();
  }, []);

  return (
    <section className='rounded-md bg-white dark:bg-gray-800 shrink h-full p-2 overflow-auto'>
      <div className='relative w-full'>
        <div className='absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none'>
          <Search className={'w-4 h-4 text-gray-500 dark:text-gray-400'} />
        </div>
        <input
          type='text'
          className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-8 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
          placeholder='Search by Local Authority District...'
        />
      </div>

      <div className='space-y-1 p-2'>
        {list.map((v) => (
          <div
            className='flex'
            key={v.lad19cd}
          >
            <div className='flex items-center h-5'>
              <input
                id='helper-checkbox'
                aria-describedby='helper-checkbox-text'
                type='checkbox'
                value=''
                className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
              />
            </div>
            <div className='ms-2 text-sm'>
              <label
                htmlFor='helper-checkbox'
                className='font-medium text-gray-900 dark:text-gray-300'
              >
                {v.lad19nm}
              </label>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
